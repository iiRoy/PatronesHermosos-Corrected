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
    preferred_group,
    gender,
  } = req.body;

  try {
    const newCollaborator = await prisma.collaborators.create({
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
        role: 'Pendiente',
        status: 'Pendiente',
        level: 'Pendiente',
        language: 'Pendiente',
        preferred_group: preferred_group ? parseInt(preferred_group) : null,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Colaborador creado',
      data: newCollaborator,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(422).json({ success: false, message: 'Datos inválidos', error: error.message });
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
                id_venue: true, // Cambiado de id a id_venue
                name: true,
              },
            },
          },
        },
        preferredGroup: {
          select: {
            id_group: true,
            name: true,
            venues: {
              select: {
                id_venue: true, // Cambiado de id a id_venue
                name: true,
              },
            },
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
      id_venue: collab.groups?.venues?.id_venue || null,
      venue: collab.groups?.venues?.name || 'Sin sede',
      college: collab.college || 'Sin universidad',
      degree: collab.degree || 'Sin carrera',
      semester: collab.semester || 'Sin semestre',
      gender: collab.gender || 'Sin género',
      status: collab.status || 'Sin estado',
      preferred_role: collab.preferred_role || 'Sin rol preferido',
      preferred_language: collab.preferred_language || 'Sin idioma preferido',
      preferred_level: collab.preferred_level || 'Sin nivel preferido',
      preferred_group: collab.preferred_group || null,
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
      preferred_group: collab.preferred_group || null,
      groups: collab.preferredGroup
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
                id_venue: true, // Cambiado de id a id_venue
                name: true,
              },
            },
          },
        },
        preferredGroup: {
          select: {
            id_group: true,
            name: true,
            venues: {
              select: {
                id_venue: true, // Cambiado de id a id_venue
                name: true,
              },
            },
          },
        },
      },
    });

    if (!collaborator) {
      return res.status(404).json({ success: false, message: `El colaborador con ID ${id} no existe` });
    }

    const formattedCollaborator = {
      ...collaborator,
      groups: collaborator.preferredGroup
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
    preferred_group,
    gender,
    role,
    status,
    level,
    language,
  } = req.body;

  try {
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
        preferred_group: preferred_group ? parseInt(preferred_group) : null,
      },
    });

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
                name: true,
              },
            },
          },
        },
      },
    });

    const formatted = collaborators.map((collab) => ({
      id_collaborator: collab.id_collaborator,
      name: collab.name,
      venue: collab.groups?.venues?.name || 'Sin sede',
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
};