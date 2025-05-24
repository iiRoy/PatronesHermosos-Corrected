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
        preferred_venue: preferred_venue ? parseInt(preferred_venue) : null,
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

module.exports = {
  createCollaborator,
  getAllCollaborators,
  getCollaboratorById,
  updateCollaborator,
  deleteCollaborator,
  getCollaboratorsTable,
  updateCollaboratorBasicInfo,
};