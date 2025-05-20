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
      message: 'Colaborador creado',
      data: newCollaborator,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(422).json({ message: 'Datos inválidos', error: error.message });
    }
    console.error('Error al crear colaborador:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener todos los colaboradores
const getAllCollaborators = async (req, res) => {
  try {
    const collaborators = await prisma.collaborators.findMany({
      include: {
        groups: {
          select: {
            id_group: true,
            venues: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    res.json(collaborators);
  } catch (error) {
    console.error('Error al obtener colaboradores:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
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
            venues: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!collaborator) {
      return res.status(404).json({ message: `El colaborador con ID ${id} no existe` });
    }

    res.json(collaborator);
  } catch (error) {
    console.error('Error al obtener colaborador:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
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

    res.json({ message: 'Colaborador actualizado', data: updatedCollaborator });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: `El colaborador con ID ${id} no existe` });
    }
    console.error('Error al actualizar colaborador:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Eliminar un colaborador
const deleteCollaborator = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.collaborators.delete({
      where: { id_collaborator: parseInt(id) },
    });

    res.json({ message: 'Colaborador eliminado correctamente' });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: `El colaborador con ID ${id} no existe` });
    }
    console.error('Error al eliminar colaborador:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
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

    res.json({ message: 'Información básica del colaborador actualizada', data: updatedCollaborator });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: `El colaborador con ID ${id} no existe` });
    }
    console.error('Error al actualizar información básica del colaborador:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
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
      venue: collab.groups?.venues?.name || null,
      group: collab.groups?.id_group || null,
      email: collab.email,
      phone_number: collab.phone_number,
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Error al obtener datos para tabla de colaboradores:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
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