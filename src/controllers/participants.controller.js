const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs').promises;

// Utility function to transform flat keys into nested objects
const parseNestedBody = (body) => {
  const result = {};

  for (const key in body) {
    const parts = key.split('[');
    if (parts.length === 1) {
      result[key] = body[key];
    } else {
      let current = result;
      for (let i = 0; i < parts.length; i++) {
        let part = parts[i];
        if (part.endsWith(']')) {
          part = part.slice(0, -1);
        }
        if (i === parts.length - 1) {
          current[part] = body[key];
        } else {
          current[part] = current[part] || {};
          current = current[part];
        }
      }
    }
  }

  return result;
};

// Crear participante
const createParticipant = async (req, res) => {
  console.log('Received files:', req.files);
  console.log('Parsed body:', req.body); // Add this to debug
  const parsedBody = parseNestedBody(req.body);

  const {
    name,
    paternal_name,
    maternal_name,
    email,
    year,
    education,
    preferred_group: id_group,
    tutor = {},
  } = parsedBody;

  const files = req.files || {};
  let participation_file = null;
  let participation_file_path = null;

  if (files['participation_file']) {
    const filePath = files['participation_file'][0].path;
    participation_file = await fs.readFile(filePath);
    participation_file_path = files['participation_file'][0].filename;
  }

  try {
    // Fetch group and venue details for the email
    let groupName = 'No asignado';
    let venueName = 'No asignado';
    if (id_group) {
      const group = await prisma.groups.findUnique({
        where: { id_group: parseInt(id_group) },
        include: { venues: { select: { name: true } } },
      });
      if (group) {
        groupName = group.name || 'No asignado';
        venueName = group.venues?.name || 'No asignado';
      }
    }

    await prisma.$queryRaw`
      CALL registrar_part(
        ${name},
        ${paternal_name},
        ${maternal_name},
        ${email},
        ${year},
        ${education},
        ${participation_file},
        ${participation_file_path},
        ${parseInt(id_group) || null},
        ${tutor.name || null},
        ${tutor.paternal_name || null},
        ${tutor.maternal_name || null},
        ${tutor.email || null},
        ${tutor.phone_number || null}
      )
    `;

    // Send confirmation email
    await sendEmail({
      to: email,
      subject: 'Confirmación de Solicitud - Patrones Hermosos',
      template: 'participantes/solicitud',
      data: {
        pName: `${name} ${paternal_name || ''} ${maternal_name || ''}`.trim(),
        pEmail: email,
        tName: tutor.name ? `${tutor.name} ${tutor.paternal_name || ''} ${tutor.maternal_name || ''}`.trim() : 'No asignado',
        tEmail: tutor.email || 'No asignado',
        tPhone: tutor.phone_number || 'No asignado',
        venue: venueName,
        group: groupName,
        iEmail: process.env.EMAIL_USER || 'contacto@patroneshermosos.org',
      },
    });

    res.status(201).json({
      message: 'Participante creado exitosamente',
      files: {
        participation_file: participation_file_path,
      },
    });
  } catch (error) {
    console.error('Error al crear participante:', error);
    res.status(500).json({ message: 'Error al crear participante', error: error.message });
  }
};

// Obtener todos los participantes (incluye ambos formateos)
const getAllParticipants = async (req, res) => {
  try {
    const participants = await prisma.participants.findMany({
      include: {
        groups: { // Grupo asignado (basado en id_group)
          select: {
            id_group: true,
            name: true,
            venues: {
              select: {
                name: true,
              },
            },
          },
        },
        preferredGroup: { // Grupo preferido (basado en preferred_group)
          select: {
            id_group: true,
            name: true,
            venues: {
              select: {
                name: true,
              },
            },
          },
        },
        tutors: {
          select: {
            phone_number: true,
          },
        },
      },
    });

    // Formateo original (usando grupo asignado, basado en id_group)
    const formattedParticipants = participants.map(participant => ({
      ...participant,
      groups: participant.groups
        ? {
          name: participant.groups.name || 'No asignado',
          venues: participant.groups.venues || { name: 'No asignado' },
        }
        : null,
    }));

    // Formateo para Solicitudes (usando grupo preferido, basado en preferred_group)
    const formattedParticipantsForRequests = participants.map(participant => ({
      ...participant,
      groups: participant.preferredGroup
        ? {
          name: participant.preferredGroup.name || 'No asignado',
          venues: participant.preferredGroup.venues || { name: 'No asignado' },
        }
        : null,
    }));

    res.json({
      success: true,
      data: formattedParticipants, // Para uso general (grupo asignado)
      dataForRequests: formattedParticipantsForRequests, // Para Solicitudes de Registro (grupo preferido)
    });
  } catch (error) {
    console.error('Error fetching participants:', error);
    res.status(500).json({ message: 'Error al obtener participantes' });
  }
};

// Obtener participante por ID
const getParticipantById = async (req, res) => {
  const { id } = req.params;
  try {
    const participant = await prisma.participants.findUnique({
      where: { id_participant: parseInt(id) },
      include: {
        preferredGroup: {
          select: {
            id_group: true,
            name: true,
            venues: {
              select: {
                name: true,
              },
            },
          },
        },
        tutors: {
          select: {
            phone_number: true,
          },
        },
      },
    });
    if (!participant) return res.status(404).json({ message: 'Participante no encontrado' });

    // Formatear el participante
    const formattedParticipant = {
      ...participant,
      groups: participant.preferredGroup
        ? {
          name: participant.preferredGroup.name || 'No asignado',
          venues: participant.preferredGroup.venues || { name: 'No asignado' },
        }
        : null,
    };

    res.json(formattedParticipant);
  } catch (error) {
    console.error('Error fetching participant by ID:', error);
    res.status(500).json({ message: 'Error al obtener participante' });
  }
};

// Actualizar participante (general)
const updateParticipant = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch current participant data to check for group change
    const currentParticipant = await prisma.participants.findUnique({
      where: { id_participant: parseInt(id) },
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

    if (!currentParticipant) {
      return res.status(404).json({ message: 'Participante no encontrado' });
    }

    // Update participant
    const updatedParticipant = await prisma.participants.update({
      where: { id_participant: parseInt(id) },
      data: req.body,
    });

    // Check if id_group has changed
    const newGroupId = req.body.id_group ? parseInt(req.body.id_group) : null;
    if (newGroupId && newGroupId !== currentParticipant.groups?.id_group) {
      const newGroup = await prisma.groups.findUnique({
        where: { id_group: newGroupId },
        include: {
          venues: {
            select: {
              name: true,
              address: true,
            },
          },
        },
      });

      if (newGroup) {
        // Calculate confirmation deadline (7 days from now)
        const deadlineDate = new Date();
        deadlineDate.setDate(deadlineDate.getDate() + 7);

        await sendEmail({
          to: updatedParticipant.email,
          subject: 'Solicitud de Cambio de Grupo - Patrones Hermosos',
          template: 'participantes/sol_cambio',
          data: {
            pname: `${updatedParticipant.name} ${updatedParticipant.paternal_name || ''} ${updatedParticipant.maternal_name || ''}`.trim(),
            venue: newGroup.venues?.name || 'No asignado',
            group: newGroup.name || 'No asignado',
            location: newGroup.venues?.address || 'No asignado',
            language: newGroup.language || 'No especificado',
            level: newGroup.level || 'No especificado',
            mode: newGroup.mode || 'No especificado',
            sDate: newGroup.start_date ? newGroup.start_date.toLocaleDateString() : 'No especificado',
            eDate: newGroup.end_date ? newGroup.end_date.toLocaleDateString() : 'No especificado',
            sHour: newGroup.start_hour ? newGroup.start_hour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'No especificado',
            eHour: newGroup.end_hour ? newGroup.end_hour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'No especificado',
            lDate: deadlineDate.toLocaleDateString(),
            platformLink: `https://patroneshermosos.org/confirmar-participacion/${updatedParticipant.id_participant}/${uuidv4().slice(0, 8)}`,
            iEmail: process.env.EMAIL_USER || 'contacto@patroneshermosos.org',
          },
        });
      }
    }

    res.json(updatedParticipant);
  } catch (error) {
    console.error('Error updating participant:', error);
    res.status(500).json({ message: 'Error al actualizar participante' });
  }
};

// Eliminar participante
const deleteParticipant = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.participants.delete({ where: { id_participant: parseInt(id) } });
    res.json({ message: 'Participante eliminado' });
  } catch (error) {
    console.error('Error deleting participant:', error);
    res.status(500).json({ message: 'Error al eliminar participante' });
  }
};

// Tabla personalizada de participantes
const getParticipantsTable = async (req, res) => {
  try {
    const participants = await prisma.participants.findMany({
      select: {
        id_participant: true,
        name: true,
        paternal_name: true,
        maternal_name: true,
        email: true,
        groups: {
          select: {
            name: true,
            venues: {
              select: { name: true },
            },
          },
        },
        tutors: {
          select: { phone_number: true },
        },
      },
    });

    const formatted = participants.map((p) => ({
      id: p.id_participant,
      nombre: `${p.name || ''} ${p.paternal_name || ''} ${p.maternal_name || ''}`.trim(),
      sede: p.groups?.venues?.name || 'No asignado',
      grupo: p.groups?.name || 'No asignado',
      correo: p.email,
      telefono: p.tutors?.phone_number || 'No asignado',
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Error getting participants table:', error);
    res.status(500).json({ message: 'Error al obtener tabla de participantes' });
  }
};

// Actualizar datos básicos
const updateParticipantBasicInfo = async (req, res) => {
  const { id } = req.params;
  const { name, paternal_name, maternal_name, email, id_group } = req.body;
  try {
    const tutor = await prisma.tutors.findFirst({
      where: { participants: { some: { id_participant: parseInt(id) } } },
    });

    const updatedParticipant = await prisma.participants.update({
      where: { id_participant: parseInt(id) },
      data: { name, paternal_name, maternal_name, email, id_group },
    });

    if (tutor && req.body.phone_number) {
      await prisma.tutors.update({
        where: { id_tutor: tutor.id_tutor },
        data: { phone_number: req.body.phone_number },
      });
    }

    res.json(updatedParticipant);
  } catch (error) {
    console.error('Error updating basic participant info:', error);
    res.status(500).json({ message: 'Error al actualizar datos básicos del participante' });
  }
};

// Cambiar estado del participante (activar/desactivar)
const changeParticipantStatus = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;
  const username = req.user.username;

  // Validar acción
  if (!action || !['activar', 'desactivar'].includes(action)) {
    return res.status(400).json({ message: 'La acción debe ser "activar" o "desactivar"' });
  }

  try {
    // Fetch participant data for email
    const participant = await prisma.participants.findUnique({
      where: { id_participant: parseInt(id) },
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

    if (!participant) {
      return res.status(404).json({ message: 'Participante no encontrado' });
    }

    // Execute the stored procedure to change participant status
    await prisma.$queryRaw`
      CALL cambiar_estado_participant(${parseInt(id)}, ${username}, ${action})
    `;

    // Send email if participant is activated
    if (action === 'activar') {
      await sendEmail({
        to: participant.email,
        subject: '¡Felicidades! Has sido aceptada en Patrones Hermosos',
        template: 'participantes/aceptado',
        data: {
          pname: `${participant.name} ${participant.paternal_name || ''} ${participant.maternal_name || ''}`.trim(),
          sede: participant.groups?.venues?.name || 'No asignado',
          grupo: participant.groups?.name || 'No asignado',
          direccion: participant.groups?.venues?.address || 'No asignado',
          mName: participant.groups?.mentors
            ? `${participant.groups.mentors.name || ''} ${participant.groups.mentors.paternal_name || ''} ${participant.groups.mentors.maternal_name || ''}`.trim()
            : 'No asignado',
          mEmail: participant.groups?.mentors?.email || 'No asignado',
          iEmail: process.env.EMAIL_USER || 'contacto@patroneshermosos.org',
        },
      });
    }else if (action === 'desactivar') {
      await sendEmail({
        to: participant.email,
        subject: 'Resultados de tu Postulación - Patrones Hermosos',
        template: 'participantes/rechazado',
        data: {
          pName: `${participant.name} ${participant.paternal_name || ''} ${participant.maternal_name || ''}`.trim(),
          reason: reason || 'No cumplió con los criterios de registro',
          code: uuidv4().slice(0, 8),
          iEmail: process.env.EMAIL_USER || 'contacto@patroneshermosos.org',
        },
      });
    }

    res.status(200).json({
      message: `Participante con ID ${id} ${action === 'activar' ? 'activado' : 'desactivado'} exitosamente`,
    });
  } catch (error) {
    console.error('Error al cambiar estado del participante:', error);
    if (error.code === '45000') {
      return res.status(400).json({ message: error.message });
    }
    console.error('Full error details:', JSON.stringify(error, null, 2));
    res.status(500).json({ message: 'Error interno al cambiar estado del participante', error: error.message });
  }
};

module.exports = {
  createParticipant,
  getAllParticipants,
  getParticipantById,
  updateParticipant,
  deleteParticipant,
  getParticipantsTable,
  updateParticipantBasicInfo,
  changeParticipantStatus,
};