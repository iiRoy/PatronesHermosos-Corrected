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

const update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updated = await prisma.collaborators.update({
      where: { id_collaborator: parseInt(id) },
      data,
    });

    res.json({ message: 'Colaborador actualizado', data: updated });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: `El colaborador con ID ${id} no existe` });
    }
    console.error('Error al actualizar colaborador:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const remove = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.collaborators.delete({
      where: { id_collaborator: parseInt(id) },
    });

    res.json({ message: 'Colaboradora eliminada correctamente' });
  } catch (error) {
    console.error('Error deleting collaborator:', error);
    res.status(500).json({ message: 'Error al eliminar colaboradora' });
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
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: `El colaborador con ID ${id} no existe` });
    }
    console.error('Error al eliminar colaborador:', error);
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