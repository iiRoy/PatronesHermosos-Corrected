const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

//obtener todos los datos
const getAll = async (req, res) => {
  const venues = await prisma.venues.findMany();
  res.json(venues);
};

//obtener los datos para presentarlos en una tabla 
const getSpecificData = async (req, res) => {
  try {
    const venues = await prisma.venues.findMany({
      select: {
        id_venue: true,
        universidad: true,
        campus: true,
        coordinador: true,
        no_grupos: true,
        no_estudiantes: true
      }
    });
    res.status(200).json(venues);
  } catch (error) {
    console.error('Error al obtener los datos específicos de las sedes:', error);
    res.status(500).json({ message: 'Error interno al obtener los datos específicos de las sedes' });
  }
};

//obtener una sede por id
const getById = async (req, res) => {
  const { id } = req.params;
  const venue = await prisma.venues.findUnique({
    where: { id_venue: parseInt(id) },
  });

  if (!venue) {
    return res.status(404).json({ message: 'Venue no encontrado' });
  }

  res.json(venue);
};

//crear nueva sede
const create = async (req, res) => {
  const { name, location, address, logo, participation_file, status } = req.body;

  try {
    const newVenue = await prisma.venues.create({
      data: {
        name,
        location,
        address,
        logo,
        participation_file: participation_file
          ? Buffer.from(Object.values(participation_file))
          : null,
        status,
      },
    });

    res.status(201).json({ message: 'Venue creado', data: newVenue });
  } catch (error) {
    console.error('Error al crear venue:', error);
    res.status(500).json({ message: 'Error al crear venue', error });
  }
};

//actualizar una sede
const update = async (req, res) => {
  const { id } = req.params;
  const { name, location, address, logo, participation_file, status } = req.body;

  try {
    const updatedVenue = await prisma.venues.update({
      where: { id_venue: parseInt(id) },
      data: {
        name,
        location,
        address,
        logo,
        participation_file: participation_file
          ? Buffer.from(Object.values(participation_file))
          : null,
        status,
      },
    });

    res.json({ message: 'Venue actualizado', data: updatedVenue });
  } catch (error) {
    console.error('Error al actualizar venue:', error);
    res.status(500).json({ message: 'Error al actualizar venue', error });
  }
};

//eliminar una sede por id
const remove = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.venues.delete({ where: { id_venue: id } });
    res.json({ message: `Venue con ID ${id} eliminado correctamente` });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: `El venue con ID ${id} no existe` });
    }

    console.error('Error al eliminar venue:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  getAll,
  getSpecificData,
  getById,
  create,
  update,
  remove,
};
