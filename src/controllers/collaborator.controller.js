const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear una nueva colaboradora
const createCollaborator = async (req, res) => {
  const {
    name,
    paternal_name,
    maternal_name,
    email,
    phone_number,
    college,
    degree,
    semester,
    preferred_role,
    preferred_language,
    preferred_level,
    preferred_venue,
    gender,
  } = req.body;

  try {
    let venueName = 'No asignado';
    if (preferred_venue) {
      const venue = await prisma.venues.findUnique({
        where: { id_venue: parseInt(preferred_venue) },
        select: { name: true },
      });
      if (venue) {
        venueName = venue.name || 'No asignado';
      }
    }
    
    await prisma.$queryRaw`
      CALL registrar_colab(
        ${name}, 
        ${paternal_name}, 
        ${maternal_name}, 
        ${email}, 
        ${phone_number},
        ${college}, 
        ${degree}, 
        ${semester},
        ${preferred_role}, 
        ${preferred_language}, 
        ${preferred_level},
        ${preferred_venue}, 
        ${gender}
      );
    `;

    // Send registration confirmation email
    await sendEmail({
      to: email,
      subject: 'Confirmación de Solicitud - Patrones Hermosos',
      template: 'colaboradores/solicitud',
      data: {
        cName: `${name} ${paternal_name || ''} ${maternal_name || ''}`.trim(),
        cEmail:email,
        role: preferred_role || 'No especificado',
        language: preferred_language || 'No especificado',
        level: preferred_level || 'No especificado',
        mode: 'No especificado', // Assuming modality is not provided in req.body
        venueName: venueName || 'No especificada',
        iEmail: process.env.EMAIL_USER || 'contacto@patroneshermosos.org',
      },
    });

    res.status(201).json({
      success: true,
      message: 'Colaborador creado',
    });
  } catch (error) {
    if (error.code === 'P0001' && error.message.includes('Ya existe un colaborador')) {
      return res.status(422).json({ success: false, message: 'Ya existe un colaborador registrado con estos datos.' });
    }
    console.error('Error al crear colaborador:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

// Obtener todos los colaboradores (incluye ambos formateos)
const getAllCollaborators = async (req, res) => {
  try {
    const collaborators = await prisma.collaborators.findMany({
      include: {
        groups: {
          select: {
            id_group: true,
            name: true,
            venues: {
              select: {
                id_venue: true,
                name: true,
              },
            },
          },
        },
        preferredVenue: { // Changed from preferredGroup
          select: {
            id_venue: true,
            name: true,
          },
        },
      },
    });

    // Formateo original (usando grupo asignado, para Gestión de Apoyo)
    const formattedCollaborators = collaborators.map(collab => ({
      id_collaborator: collab.id_collaborator,
      name: collab.name || 'Sin nombre',
      paternal_name: collab.paternal_name || 'Sin apellido',
      maternal_name: collab.maternal_name || 'Sin apellido',
      email: collab.email || 'Sin correo',
      phone_number: collab.phone_number || 'Sin teléfono',
      role: collab.role || 'Sin rol',
      level: collab.level || 'Sin nivel',
      language: collab.language || 'Sin idioma',
      group: collab.groups?.name || 'Sin grupo',
      venue: collab.groups?.venues?.name || 'Sin sede',
      venue_id: collab.groups?.venues?.id_venue || null,
      college: collab.college || 'Sin universidad',
      degree: collab.degree || 'Sin carrera',
      semester: collab.semester || 'Sin semestre',
      gender: collab.gender || 'Sin género',
      status: collab.status || 'Sin estado',
      preferred_role: collab.preferred_role || 'Sin rol preferido',
      preferred_language: collab.preferred_language || 'Sin idioma preferido',
      preferred_level: collab.preferred_level || 'Sin nivel preferido',
      preferred_venue: collab.preferred_venue || null,
    }));

    // Formateo para Solicitudes (usando sede preferida)
    const formattedCollaboratorsForRequests = collaborators.map(collab => ({
      id_collaborator: collab.id_collaborator,
      name: collab.name || 'Sin nombre',
      paternal_name: collab.paternal_name || 'Sin apellido',
      maternal_name: collab.maternal_name || 'Sin apellido',
      email: collab.email || 'Sin correo',
      phone_number: collab.phone_number || 'Sin teléfono',
      role: collab.role || 'Sin rol',
      level: collab.level || 'Sin nivel',
      language: collab.language || 'Sin idioma',
      college: collab.college || 'Sin universidad',
      degree: collab.degree || 'Sin carrera',
      semester: collab.semester || 'Sin semestre',
      gender: collab.gender || 'Sin género',
      status: collab.status || 'Sin estado',
      preferred_role: collab.preferred_role || 'Sin rol preferido',
      preferred_language: collab.preferred_language || 'Sin idioma preferido',
      preferred_level: collab.preferred_level || 'Sin nivel preferido',
      preferred_venue: collab.preferred_venue || null,
      venue: collab.preferredVenue
        ? {
            id_venue: collab.preferredVenue.id_venue || null,
            name: collab.preferredVenue.name || 'No asignado',
          }
        : null,
    }));

    res.json({
      success: true,
      data: formattedCollaborators, // Para Gestión de Apoyo
      dataForRequests: formattedCollaboratorsForRequests, // Para Solicitudes de Registro
    });
  } catch (error) {
    console.error('Error al obtener colaboradores:', error);
    res.status(500).json({ success: false, message: `Error interno del servidor: ${error.message}` });
  }
};

// Obtener un colaborador por ID
const getCollaboratorById = async (req, res) => {
  const { id } = req.params;

  try {
    const collaborator = await prisma.collaborators.findUnique({
      where: { id_collaborator: parseInt(id) },
      include: {
        groups: {
          select: {
            id_group: true,
            name: true,
            venues: {
              select: {
                id_venue: true,
                name: true,
              },
            },
          },
        },
        preferredVenue: {
          select: {
            id_venue: true,
            name: true,
          },
        },
      },
    });

    if (!collaborator) {
      return res.status(404).json({ success: false, message: `El colaborador con ID ${id} no existe` });
    }

    const formattedCollaborator = {
      ...collaborator,
      venue: collaborator.preferredVenue
        ? {
            id_venue: collaborator.preferredVenue.id_venue || null,
            name: collaborator.preferredVenue.name || 'No asignado',
          }
        : null,
    };

    res.json({ success: true, data: formattedCollaborator });
  } catch (error) {
    console.error('Error al obtener colaborador:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

// Actualizar un colaborador (versión completa)
const updateCollaborator = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    paternal_name,
    maternal_name,
    email,
    phone_number,
    college,
    degree,
    semester,
    preferred_role,
    preferred_language,
    preferred_level,
    preferred_venue,
    gender,
    role,
    status,
    level,
    language,
    id_group,
  } = req.body;

  try {
    // Fetch current collaborator data to check for changes
    const currentCollaborator = await prisma.collaborators.findUnique({
      where: { id_collaborator: parseInt(id) },
      include: {
        groups: {
          select: {
            id_group: true,
            name: true,
            venues: {
              select: {
                name: true,
                address: true,
              },
            },
            language: true,
            level: true,
            mode: true,
            start_date: true,
            end_date: true,
            start_hour: true,
            end_hour: true,
          },
        },
      },
    });

    if (!currentCollaborator) {
      return res.status(404).json({ success: false, message: `El colaborador con ID ${id} no existe` });
    }

    // Update collaborator
    const updatedCollaborator = await prisma.collaborators.update({
      where: { id_collaborator: parseInt(id) },
      data: {
        name,
        paternal_name,
        maternal_name,
        email,
        phone_number,
        college,
        degree,
        semester,
        preferred_role,
        preferred_language,
        preferred_level,
        gender,
        role,
        status,
        level,
        language,
        preferred_venue: preferred_venue ? parseInt(preferred_venue) : null,
        id_group: id_group ? parseInt(id_group) : null,
      },
    });

    // Check if id_group or role has changed
    const groupChanged = id_group && parseInt(id_group) !== currentCollaborator.groups?.id_group;
    const roleChanged = role && role !== currentCollaborator.role;

    if (groupChanged || roleChanged) {
      const newGroup = id_group
        ? await prisma.groups.findUnique({
            where: { id_group: parseInt(id_group) },
            include: {
              venues: {
                select: {
                  name: true,
                  address: true,
                },
              },
            },
          })
        : null;

      // Calculate confirmation deadline (7 days from now)
      const deadlineDate = new Date();
      deadlineDate.setDate(deadlineDate.getDate() + 7);

      await sendEmail({
        to: updatedCollaborator.email,
        subject: 'Solicitud de Cambio de Preferencias - Patrones Hermosos',
        template: 'colaboradores/sol_cambio',
        data: {
          cName: `${updatedCollaborator.name} ${updatedCollaborator.paternal_name || ''} ${updatedCollaborator.maternal_name || ''}`.trim(),
          venue: newGroup?.venues?.name || 'No asignado',
          group: newGroup?.name || 'No asignado',
          location: newGroup?.venues?.address || 'No asignado',
          role: role || updatedCollaborator.role || 'No asignado',
          language: newGroup?.language || updatedCollaborator.language || 'No especificado',
          level: newGroup?.level || updatedCollaborator.level || 'No especificado',
          mode: newGroup?.mode || 'No especificado',
          sDate: newGroup?.start_date ? newGroup.start_date.toLocaleDateString() : 'No especificado',
          eDate: newGroup?.end_date ? newGroup.end_date.toLocaleDateString() : 'No especificado',
          sHour: newGroup?.start_hour ? newGroup.start_hour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'No especificado',
          eHour: newGroup?.end_hour ? newGroup.end_hour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'No especificado',
          lDate: deadlineDate.toLocaleDateString(),
          platformLink: `https://patroneshermosos.org/confirmar-colaborador/${updatedCollaborator.id_collaborator}/${uuidv4().slice(0, 8)}`,
          iEmail: process.env.EMAIL_USER || 'contacto@patroneshermosos.org',
        },
      });
    }

    res.json({ success: true, message: 'Colaborador actualizado', data: updatedCollaborator });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ success: false, message: `El colaborador con ID ${id} no existe` });
    }
    console.error('Error al actualizar colaborador:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

// Eliminar un colaborador
const deleteCollaborator = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.collaborators.delete({
      where: { id_collaborator: parseInt(id) },
    });

    res.json({ success: true, message: 'Colaborador eliminado correctamente' });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ success: false, message: `El colaborador con ID ${id} no existe` });
    }
    console.error('Error al eliminar colaborador:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

// Actualizar información básica de un colaborador
const updateCollaboratorBasicInfo = async (req, res) => {
  const { id } = req.params;
  const { name, paternal_name, maternal_name, email, phone_number } = req.body;

  try {
    const updatedCollaborator = await prisma.collaborators.update({
      where: { id_collaborator: parseInt(id) },
      data: {
        name,
        paternal_name,
        maternal_name,
        email,
        phone_number,
      },
    });

    res.json({ success: true, message: 'Información básica del colaborador actualizada', data: updatedCollaborator });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ success: false, message: `El colaborador con ID ${id} no existe` });
    }
    console.error('Error al actualizar información básica del colaborador:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

// Obtener datos específicos para tabla
const getCollaboratorsTable = async (req, res) => {
  try {
    const collaborators = await prisma.collaborators.findMany({
      select: {
        id_collaborator: true,
        name: true,
        email: true,
        phone_number: true,
        groups: {
          select: {
            id_group: true,
            name: true,
            venues: {
              select: {
                id_venue: true,
                name: true,
              },
            },
          },
        },
        preferredVenue: {
          select: {
            id_venue: true,
            name: true,
          },
        },
      },
    });

    const formatted = collaborators.map((collab) => ({
      id_collaborator: collab.id_collaborator,
      name: collab.name,
      venue: collab.preferredVenue?.name || collab.groups?.venues?.name || 'Sin sede',
      venue_id: collab.preferredVenue?.id_venue || collab.groups?.venues?.id_venue || null,
      group: collab.groups?.name || 'Sin grupo',
      email: collab.email || 'Sin correo',
      phone_number: collab.phone_number || 'Sin teléfono',
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error('Error al obtener datos para tabla de colaboradores:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

// Cambiar estado del colaborador (Aprobada/Rechazada)
const changeCollaboratorStatus = async (req, res) => {
  const { id } = req.params;
  const { status, reason } = req.body;
  const username = req.user?.username || 'system';

  if (!status || !['Aprobada', 'Rechazada'].includes(status)) {
    return res.status(400).json({ success: false, message: 'El estado debe ser "Aprobada" o "Rechazada"' });
  }

  try {
    const collaborator = await prisma.collaborators.findUnique({
      where: { id_collaborator: parseInt(id) },
      include: {
        groups: {
          select: {
            name: true,
            venues: {
              select: {
                name: true,
                address: true,
              },
            },
            mentors: {
              select: {
                name: true,
                paternal_name: true,
                maternal_name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!collaborator) {
      return res.status(404).json({ success: false, message: `El colaborador con ID ${id} no existe` });
    }

    await prisma.collaborators.update({
      where: { id_collaborator: parseInt(id) },
      data: { status },
    });

    // Send email based on status
    if (status === 'Aprobada') {
      await sendEmail({
        to: collaborator.email,
        subject: '¡Felicidades! Has sido aceptada como colaboradora en Patrones Hermosos',
        template: 'colaboradores/aceptado',
        data: {
          pName: `${collaborator.name} ${collaborator.paternal_name || ''} ${collaborator.maternal_name || ''}`.trim(),
          role: collaborator.role || 'No asignado',
          sede: collaborator.groups?.venues?.name || 'No asignado',
          grupo: collaborator.groups?.name || 'No asignado',
          direccion: collaborator.groups?.venues?.address || 'No asignado',
          mName: collaborator.groups?.mentors
            ? `${collaborator.groups.mentors.name || ''} ${collaborator.groups.mentors.paternal_name || ''} ${collaborator.groups.mentors.maternal_name || ''}`.trim()
            : 'No asignado',
          mEmail: collaborator.groups?.mentors?.email || 'No asignado',
          iEmail: process.env.EMAIL_USER || 'contacto@patroneshermosos.org',
        },
      });
    } else if (status === 'Rechazada') {
      await sendEmail({
        to: collaborator.email,
        subject: 'Resultados de tu Postulación - Patrones Hermosos',
        template: 'colaboradores/rechazado',
        data: {
          pName: `${collaborator.name} ${collaborator.paternal_name || ''} ${collaborator.maternal_name || ''}`.trim(),
          venue: collaborator.preferredVenue?.name || 'No asignado',
          role: collaborator.preferred_role || 'No asignado',
          reason: reason || 'No cumplió con los criterios de sceptación',
          code: uuidv4().slice(0, 8),
          iEmail: process.env.EMAIL_USER || 'contacto@patroneshermosos.org',
        },
      });
    }

    res.status(200).json({
      success: true,
      message: `Colaborador con ID ${id} ${status === 'Aprobada' ? 'aprobado' : 'rechazado'} exitosamente`,
    });
  } catch (error) {
    console.error('Error al cambiar estado del colaborador:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

// Agendar entrevista para un colaborador
const scheduleCollaboratorInterview = async (req, res) => {
  const { id } = req.params;
  const { deadline } = req.body; // Optional deadline in ISO format (e.g., '2025-06-01T23:59:59Z')

  try {
    const collaborator = await prisma.collaborators.findUnique({
      where: { id_collaborator: parseInt(id) },
    });

    if (!collaborator) {
      return res.status(404).json({ success: false, message: `El colaborador con ID ${id} no existe` });
    }

    // Calculate default deadline (7 days from now) if not provided
    const deadlineDate = deadline ? new Date(deadline) : new Date();
    if (!deadline) {
      deadlineDate.setDate(deadlineDate.getDate() + 7);
    }

    // Create interview record
    await prisma.collaborator_interviews.create({
      data: {
        id_collaborator: parseInt(id),
        deadline: deadlineDate,
        status: 'Pendiente',
      },
    });

    // Send interview scheduling email
    await sendEmail({
      to: collaborator.email,
      subject: 'Agenda tu Entrevista - Patrones Hermosos',
      template: 'colaboradores/interview',
      data: {
        cName: `${collaborator.name} ${collaborator.paternal_name || ''} ${collaborator.maternal_name || ''}`.trim(),
        lDate: deadlineDate.toLocaleDateString(),
        platformLinkLink: `https://patroneshermosos.org/agendar-entrevista/${collaborator.id_collaborator}/${uuidv4().slice(0, 8)}`,
        iEmail: process.env.EMAIL_USER || 'contacto@patroneshermosos.org',
      },
    });

    res.json({
      success: true,
      message: 'Entrevista agendada exitosamente',
    });
  } catch (error) {
    console.error('Error al agendar entrevista:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

module.exports = {
  createCollaborator,
  getAllCollaborators,
  getCollaboratorById,
  updateCollaborator,
  deleteCollaborator,
  getCollaboratorsTable,
  updateCollaboratorBasicInfo,
  changeCollaboratorStatus,
  scheduleCollaboratorInterview,
};