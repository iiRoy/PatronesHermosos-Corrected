const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear una nueva coordinadora
const createCoordinator = async (req, res) => {
  const { name, paternal_name, maternal_name, email, phone_number, username, id_venue } = req.body;

  if (!name || !email || !phone_number || !username || !id_venue) {
    return res.status(400).json({
      message:
        'Faltan datos necesarios: nombre, apellido, correo, teléfono, nombre de usuario y sede.',
    });
  }

  try {
    const newCoordinator = await prisma.venue_coordinators.create({
      data: {
        name,
        paternal_name,
        maternal_name,
        email,
        phone_number,
        username,
        id_venue,
      },
    });

    res.json({ message: 'Coordinador creado correctamente', data: newCoordinator });
  } catch (error) {
    console.error('Error creating coordinator:', error);
    res.status(500).json({ message: 'Error al crear el coordinador' });
  }
};

// Obtener todos las coordinadoras
const getAllCoordinators = async (req, res) => {
  try {
    const coordinators = await prisma.venue_coordinators.findMany();
    res.json({ data: coordinators });
  } catch (error) {
    console.error('Error fetching coordinators:', error);
    res.status(500).json({ message: 'Error al obtener los coordinadores' });
  }
};

// Obtener los datos para la tabla de front
const getSpecific = async (req, res) => {
  try {
    const coordinators = await prisma.venue_coordinators.findMany({
      select: {
        id_venue_coord: true,
        name: true,
        paternal_name: true,
        maternal_name: true,
        email: true,
        phone_number: true,
        id_venue: true,
      },
    });

    res.json({ data: coordinators });
  } catch (error) {
    console.error('Error fetching specific coordinator data:', error);
    res
      .status(500)
      .json({ message: 'Error al obtener los datos específicos de los coordinadores' });
  }
};

// Obtener una coordinadora por ID
const getCoordinatorById = async (req, res) => {
  const { id } = req.params;

  try {
    const coordinator = await prisma.venue_coordinators.findUnique({
      where: { id_venue_coord: parseInt(id) },
    });

    if (!coordinator) {
      return res.status(404).json({ message: 'Coordinadora no encontrada' });
    }

    res.json(coordinator);
  } catch (error) {
    console.error('Error fetching coordinator by ID:', error);
    res.status(500).json({ message: 'Error al obtener la coordinadora' });
  }
};

// Actualizar todos los datos de coordinador
const updateCoordinator = async (req, res) => {
  const { id } = req.params;
  const { name, paternal_name, maternal_name, email, phone_number, username, profile_image } =
    req.body;

  if (!name || !email || !phone_number || !username || !profile_image) {
    return res.status(400).json({
      message:
        'Faltan datos necesarios: nombre, apellido, correo, teléfono, nombre de usuario y imagen de perfil.',
    });
  }

  try {
    const updatedCoordinator = await prisma.venue_coordinators.update({
      where: { id_venue_coord: parseInt(id) },
      data: {
        name,
        paternal_name,
        maternal_name,
        email,
        phone_number,
        username,
        profile_image,
      },
    });

    res.json({ message: 'Coordinador actualizado correctamente', data: updatedCoordinator });
  } catch (error) {
    console.error('Error updating coordinator:', error);
    res.status(500).json({ message: 'Error al actualizar el coordinador' });
  }
};

// Superusuario actualiza datos de coordinadora desde tabla
const updateCoordinatorFields = async (req, res) => {
  const { id } = req.params;
  const { name, paternal_name, maternal_name, email, phone_number, username } = req.body;

  // Validación de los campos
  if (!name || !email || !phone_number || !username) {
    return res.status(400).json({
      message:
        'Solo se pueden actualizar los campos: nombre, apellido, correo, teléfono y nombre de usuario.',
    });
  }

  try {
    const updatedCoordinator = await prisma.venue_coordinators.update({
      where: { id_venue_coord: parseInt(id) },
      data: {
        name,
        paternal_name,
        maternal_name,
        email,
        phone_number,
        username,
      },
    });

    res.json({ message: 'Coordinador actualizado correctamente', data: updatedCoordinator });
  } catch (error) {
    console.error('Error updating coordinator fields:', error);
    res.status(500).json({ message: 'Error al actualizar el coordinador' });
  }
};

// Eliminar un coordinador
const deleteCoordinator = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.venue_coordinators.delete({
      where: { id_venue_coord: parseInt(id) },
    });

    res.json({ message: 'Coordinador eliminado correctamente' });
  } catch (error) {
    console.error('Error deleting coordinator:', error);
    res.status(500).json({ message: 'Error al eliminar el coordinador' });
  }
};

module.exports = {
  createCoordinator,
  getAllCoordinators,
  getSpecific,
  getCoordinatorById,
  updateCoordinator,
  updateCoordinatorFields,
  deleteCoordinator,
};