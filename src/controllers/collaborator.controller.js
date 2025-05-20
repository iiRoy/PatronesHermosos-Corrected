const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const getAll = async (req, res) => {
  const collaborators = await prisma.collaborators.findMany();
  res.json(collaborators);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const collaborator = await prisma.collaborators.findUnique({
    where: { id_collaborator: parseInt(id) },
  });

  if (!collaborator) {
    return res.status(404).json({ message: 'Colaborador no encontrado' });
  }

  res.json(collaborator);
};

const create = async (req, res) => {
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
    gender,
    preferred_group,
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
    await prisma.collaborators.delete({ where: { id_collaborator: id } });
    res.json({
      message: `Colaborador con ID ${id} eliminado correctamente`,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: `El colaborador con ID ${id} no existe` });
    }
    console.error('Error al eliminar colaborador:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};