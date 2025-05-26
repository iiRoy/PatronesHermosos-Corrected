const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear participante
const createParticipant = async (req, res) => {
  try {
    const newParticipant = await prisma.participants.create({ data: req.body });
    res.status(201).json(newParticipant);
  } catch (error) {
    console.error('Error creating participant:', error);
    res.status(500).json({ message: 'Error al crear participante' });
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
            id_venue: true,
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
                id_venue: true, // Añadido para permitir el filtrado por sede
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

    // Formateo para el frontend (compatible con la interfaz Participant)
    const formattedParticipants = participants.map(participant => ({
      id: participant.id_participant,
      nombre: `${participant.name || ''} ${participant.paternal_name || ''} ${participant.maternal_name || ''}`.trim(),
      sede: participant.groups?.venues?.name || 'No asignado',
      id_venue: participant.groups?.id_venue || null,
      grupo: participant.groups?.name || 'No asignado',
      correo: participant.email,
      status: participant.status || 'Pendiente',
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
      data: formattedParticipants, // Para uso general (formato para frontend)
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
                id_venue: true, // Añadido para consistencia
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
    const updatedParticipant = await prisma.participants.update({
      where: { id_participant: parseInt(id) },
      data: req.body,
    });
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
  const username = req.user.username; // Usar username del token JWT

  // Validar acción
  if (!action || !['activar', 'desactivar'].includes(action)) {
    return res.status(400).json({ message: 'La acción debe ser "activar" o "desactivar"' });
  }

  try {
    // Llamar al procedimiento almacenado
    await prisma.$queryRaw`
      CALL cambiar_estado_participant(${parseInt(id)}, ${username}, ${action})
    `;
    res.status(200).json({ message: `Participante con ID ${id} ${action === 'activar' ? 'activado' : 'desactivado'} exitosamente` });
  } catch (error) {
    console.error('Error al cambiar estado del participante:', error);
    if (error.code === '45000') {
      return res.status(400).json({ message: error.message });
    }
    console.error('Full error details:', JSON.stringify(error, null, 2));
    res.status(500).json({ message: 'Error interno al cambiar estado del participante', error: error.message });
  }
};

// Get available groups for a participant's venue
const getAvailableGroups = async (req, res) => {
  try {
    const { participantId } = req.params;

    // Get participant’s venue via preferred_group
    const participant = await prisma.participants.findUnique({
      where: { id_participant: parseInt(participantId) },
      include: {
        preferredGroup: {
          select: {
            id_venue: true,
            venues: { select: { name: true } },
          },
        },
      },
    });

    if (!participant) {
      return res.status(404).json({ message: 'Participante no encontrado' });
    }

    const venueId = participant.preferredGroup?.id_venue;
    if (!venueId) {
      return res.status(400).json({ message: 'El participante no tiene una sede asignada' });
    }

    // Get all groups in the venue with capacity info
    const groups = await prisma.groups.findMany({
      where: {
        id_venue: venueId,
        status: 'Aprobada', // Only active groups
      },
      select: {
        id_group: true,
        name: true,
        max_places: true,
        occupied_places: true,
      },
    });

    // Calculate available capacity for each group
    const availableGroups = [];
    for (const group of groups) {
      // Use fun_part_aceptadas equivalent
      const approvedCount = await prisma.participants.count({
        where: {
          id_group: group.id_group,
          status: 'Aprobada',
        },
      });

      const availablePlaces = (group.max_places || 0) - approvedCount;
      if (availablePlaces > 0) {
        availableGroups.push({
          id_group: group.id_group,
          name: group.name || 'Sin nombre',
          available_places: availablePlaces,
        });
      }
    }

    res.json({
      success: true,
      venue: participant.preferredGroup?.venues?.name || 'Sin sede',
      groups: availableGroups,
    });
  } catch (error) {
    console.error('Error fetching available groups:', JSON.stringify(error, null, 2));
    res.status(500).json({ message: 'Error al obtener grupos disponibles', error: error.message });
  }
};

const approveParticipant = async (req, res) => {
  const { participantId } = req.params;
  const { groupId } = req.body;

  try {
    // Validate input
    if (!groupId || isNaN(parseInt(groupId))) {
      return res.status(400).json({ message: 'groupId es requerido y debe ser un número válido' });
    }

    // Validate participant
    const participant = await prisma.participants.findUnique({
      where: { id_participant: parseInt(participantId) },
      include: {
        preferredGroup: { select: { id_venue: true } },
        groups: { select: { id_venue: true } },
      },
    });

    if (!participant) {
      return res.status(404).json({ message: 'Participante no encontrado' });
    }

    if (participant.status !== 'Pendiente') {
      return res.status(400).json({ message: 'El participante no está en estado Pendiente' });
    }

    // Validate group
    const group = await prisma.groups.findUnique({
      where: { id_group: parseInt(groupId) },
      select: {
        id_group: true, // Explicitly select id_group
        id_venue: true,
        max_places: true,
        status: true,
      },
    });

    if (!group) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }

    if (group.status !== 'Aprobada') {
      return res.status(400).json({ message: 'El grupo no está activo' });
    }

    // Verify group is in the same venue
    const participantVenueId = participant.preferredGroup?.id_venue || participant.groups?.id_venue;
    if (group.id_venue !== participantVenueId) {
      return res.status(400).json({ message: 'El grupo no pertenece a la sede del participante' });
    }

    // Check group capacity
    const approvedCount = await prisma.participants.count({
      where: {
        id_group: group.id_group,
        status: 'Aprobada',
      },
    });

    const availablePlaces = (group.max_places || 0) - approvedCount;
    if (availablePlaces <= 0) {
      return res.status(400).json({ message: 'El grupo seleccionado está lleno' });
    }

    // Log groupId for debugging
    console.log(`Assigning participant ${participantId} to group ${group.id_group}`);

    // Approve participant
    const updatedParticipant = await prisma.participants.update({
      where: { id_participant: parseInt(participantId) },
      data: {
        id_group: parseInt(group.id_group), // Ensure integer
        status: 'Aprobada',
      },
      select: {
        id_participant: true,
        name: true,
        paternal_name: true,
        maternal_name: true,
        email: true,
        year: true,
        education: true,
        participation_file: true,
        preferred_group: true,
        status: true,
        id_group: true,
        id_tutor: true,
      },
    });

    res.json({
      success: true,
      message: 'Participante aprobado exitosamente',
      participant: updatedParticipant,
      assignedGroupId: group.id_group, // Include for confirmation
    });
  } catch (error) {
    console.error('Error approving participant:', JSON.stringify(error, null, 2));
    res.status(500).json({ message: 'Error al aprobar participante', error: error.message });
  }
};


module.exports = {
  createParticipant,
  getAllParticipants,
  getParticipantById,
  updateParticipant,
  deleteParticipant,
  getAvailableGroups,
  approveParticipant,
  getParticipantsTable,
  updateParticipantBasicInfo,
  changeParticipantStatus,
};