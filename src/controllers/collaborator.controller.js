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
        preferredGroup: {
          select: {
            id_venue: true,
            name: true,
          },
        },
      },
    });

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
            name: collab.preferredGroup.name || 'No asignado',
            venues: collab.preferredGroup.venues || { name: 'No asignado' },
          }
        : null,
    }));

    res.json({
      success: true,
      data: formattedCollaborators,
      dataForRequests: formattedCollaboratorsForRequests,
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
            name: collaborator.preferredGroup.name || 'No asignado',
            venues: collaborator.preferredGroup.venues || { name: 'No asignado' },
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

// Get available groups for a collaborator's venue
const getAvailableGroups = async (req, res) => {
  try {
    const { collaboratorId } = req.params;

    // Validate collaboratorId
    if (!collaboratorId || isNaN(parseInt(collaboratorId))) {
      return res.status(400).json({ message: 'ID de colaborador inválido' });
    }

    // Get collaborator’s details, including venue via preferred_group
    const collaborator = await prisma.collaborators.findUnique({
      where: { id_collaborator: parseInt(collaboratorId) },
      include: {
        preferredGroup: {
          select: {
            id_venue: true,
            venues: { select: { name: true } },
          },
        },
      },
    });

    if (!collaborator) {
      return res.status(404).json({ message: 'Colaborador no encontrado' });
    }

    const venueId = collaborator.preferredGroup?.id_venue;
    if (!venueId) {
      return res.status(400).json({ message: 'El colaborador no tiene una sede asignada' });
    }

    // Get all active groups in the venue
    const groups = await prisma.groups.findMany({
      where: {
        id_venue: venueId,
        status: 'Aprobada',
      },
      select: {
        id_group: true,
        name: true,
        level: true,
        mode: true,
        language: true,
      },
    });

    // Define maximum capacities per role
    const maxCapacities = {
      Instructora: 1,
      Facilitadora: 2,
      Staff: 1,
    };

    // Calculate role counts and format groups
    const availableGroups = [];
    for (const group of groups) {
      // Count approved collaborators per role in the group
      const roleCounts = await prisma.collaborators.groupBy({
        by: ['role'],
        where: {
          id_group: group.id_group,
          status: 'Aprobada',
          role: { in: ['Instructora', 'Facilitadora', 'Staff'] },
        },
        _count: {
          id_collaborator: true,
        },
      });

      // Convert to a map for easier lookup
      const roleCountMap = {
        Instructora: 0,
        Facilitadora: 0,
        Staff: 0,
      };
      roleCounts.forEach(({ role, _count }) => {
        if (role) {
          roleCountMap[role] = _count.id_collaborator;
        }
      });

      // Calculate available slots per role
      const roleAvailability = {
        Instructora: maxCapacities.Instructora - roleCountMap.Instructora,
        Facilitadora: maxCapacities.Facilitadora - roleCountMap.Facilitadora,
        Staff: maxCapacities.Staff - roleCountMap.Staff,
      };

      // Calculate total available places
      const availablePlaces = Object.values(roleAvailability).reduce((sum, count) => sum + Math.max(0, count), 0);

      // Include group if it has capacity
      if (availablePlaces > 0) {
        availableGroups.push({
          id_group: group.id_group,
          name: group.name || 'Sin nombre',
          level: group.level || 'No especificado',
          mode: group.mode || 'No especificado',
          language: group.language || 'No especificado',
          available_places: availablePlaces,
          role_availability: roleAvailability,
        });
      }
    }

    res.json({
      success: true,
      collaborator: {
        name: `${collaborator.name || ''} ${collaborator.paternal_name || ''} ${collaborator.maternal_name || ''}`.trim(),
        preferred_role: collaborator.preferred_role || 'No especificado',
        preferred_level: collaborator.preferred_level || 'No especificado',
        preferred_language: collaborator.preferred_language || 'No especificado',
        venue: collaborator.preferredGroup?.venues?.name || 'Sin sede',
      },
      groups: availableGroups,
      roles: ['Instructora', 'Facilitadora', 'Staff'],
    });
  } catch (error) {
    console.error('Error fetching available groups:', JSON.stringify(error, null, 2));
    res.status(500).json({ message: 'Error al obtener grupos disponibles', error: error.message });
  }
};


// Approve collaborator
const approveCollaborator = async (req, res) => {
  const { collaboratorId } = req.params;
  const { role, groupId } = req.body;

  console.log(`Approving collaborator ${collaboratorId} with role ${role} for group ${groupId}`);

  try {
    // Validate collaborator
    const collaborator = await prisma.collaborators.findUnique({
      where: { id_collaborator: parseInt(collaboratorId) },
      include: {
        preferredGroup: { select: { id_venue: true } },
        groups: { select: { id_venue: true } },
      },
    });

    if (!collaborator) {
      return res.status(404).json({ message: 'Colaborador no encontrado' });
    }

    if (collaborator.status !== 'Pendiente') {
      return res.status(400).json({ message: 'El colaborador no está en estado Pendiente' });
    }

    // Validate role
    const validRoles = ['Instructora', 'Facilitadora', 'Staff'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Rol no válido' });
    }

    // Validate group
    const group = await prisma.groups.findUnique({
      where: { id_group: parseInt(groupId) },
      select: {
        id_group: true,
        id_venue: true,
        status: true,
        level: true,
        language: true,
      },
    });

    if (!group) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }

    if (group.status !== 'Aprobada') {
      return res.status(400).json({ message: 'El grupo no está activo' });
    }

    // Verify group is in the same venue
    const collaboratorVenueId = collaborator.preferredGroup?.id_venue || collaborator.groups?.id_venue;
    if (group.id_venue !== collaboratorVenueId) {
      return res.status(400).json({ message: 'El grupo no pertenece a la sede del colaborador' });
    }

    // Check role capacity in the group
    const maxCapacities = {
      Instructora: 1,
      Facilitadora: 2,
      Staff: 1,
    };

    const collaboratorsInGroup = await prisma.collaborators.findMany({
      where: {
        id_group: group.id_group,
        role: role,
        status: 'Aprobada',
      },
      select: {
        id_collaborator: true,
        role: true,
        status: true,
        id_group: true,
      },
    });

    console.log(`Collaborators in group ${groupId} with role ${role} and status Aprobada:`, JSON.stringify(collaboratorsInGroup, null, 2));

    const approvedCount = collaboratorsInGroup.length;

    console.log(`Role ${role} count for group ${groupId}: ${approvedCount} (max: ${maxCapacities[role]})`);

    if (approvedCount >= maxCapacities[role]) {
      return res.status(400).json({ message: `El rol ${role} en el grupo seleccionado está lleno` });
    }

    // Determine level and language
    const validLevels = ['Básico', 'Avanzado'];
    const validLanguages = ['Inglés', 'Español'];
    const selectedLevel = collaborator.preferred_level !== 'Pendiente' && validLevels.includes(collaborator.preferred_level)
      ? collaborator.preferred_level
      : (group.level && validLevels.includes(group.level) ? group.level : 'Básico');
    const selectedLanguage = collaborator.preferred_language !== 'Pendiente' && validLanguages.includes(collaborator.preferred_language)
      ? collaborator.preferred_language
      : (group.language && validLanguages.includes(group.language) ? group.language : 'Español');

    console.log(`Setting level: ${selectedLevel}, language: ${selectedLanguage}`);

    // Approve collaborator
    const updatedCollaborator = await prisma.collaborators.update({
      where: { id_collaborator: parseInt(collaboratorId) },
      data: {
        role: role,
        status: 'Aprobada',
        level: selectedLevel,
        language: selectedLanguage,
        groups: {
          connect: { id_group: group.id_group }, // Use relation to set group
        },
      },
    });

    res.json({
      success: true,
      message: 'Colaborador aprobado exitosamente',
      collaborator: {
        id_collaborator: updatedCollaborator.id_collaborator,
        name: `${updatedCollaborator.name || ''} ${updatedCollaborator.paternal_name || ''} ${updatedCollaborator.maternal_name || ''}`.trim(),
        role: updatedCollaborator.role,
        group_id: updatedCollaborator.id_group,
        level: updatedCollaborator.level,
        language: updatedCollaborator.language,
        status: updatedCollaborator.status,
      },
    });
  } catch (error) {
    console.error('Error approving collaborator:', JSON.stringify(error, null, 2));
    res.status(500).json({ message: 'Error al aprobar colaborador', error: error.message });
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
  getAvailableGroups,
  approveCollaborator,
  changeCollaboratorStatus,
  scheduleCollaboratorInterview,
};