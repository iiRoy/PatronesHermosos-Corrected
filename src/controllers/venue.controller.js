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
  const {
    name,
    location,
    address,
    logo,
    participation_file,
    generalCoordinator,
    associatedCoordinator,
    staffCoordinator,
    participantsCoordinator,
  } = req.body;

  try {
    // Call the stored procedure
    await prisma.$queryRaw`
      CALL registrar_sede(
        ${name}, 
        ${location}, 
        ${address}, 
        ${logo ? Buffer.from(logo, 'base64') : null}, 
        ${Buffer.from(participation_file, 'base64')},
        ${generalCoordinator.name},
        ${generalCoordinator.lastNameP},
        ${generalCoordinator.lastNameM || null},
        ${generalCoordinator.email},
        ${generalCoordinator.phone},
        ${generalCoordinator.gender},
        ${generalCoordinator.username},
        ${generalCoordinator.password},
        ${generalCoordinator.profileImage ? Buffer.from(generalCoordinator.profileImage, 'base64') : null},
        ${associatedCoordinator.name || null},
        ${associatedCoordinator.lastNameP || null},
        ${associatedCoordinator.lastNameM || null},
        ${associatedCoordinator.email || null},
        ${associatedCoordinator.phone || null},
        ${staffCoordinator.name || null},
        ${staffCoordinator.lastNameP || null},
        ${staffCoordinator.lastNameM || null},
        ${staffCoordinator.email || null},
        ${staffCoordinator.phone || null},
        ${participantsCoordinator.name || null},
        ${participantsCoordinator.lastNameP || null},
        ${participantsCoordinator.lastNameM || null},
        ${participantsCoordinator.email || null},
        ${participantsCoordinator.phone || null}
      )
    `;

    res.status(201).json({ message: 'Venue creado exitosamente' });
  } catch (error) {
    console.error('Error al crear venue:', error);
    res.status(500).json({ message: 'Error al crear venue', error: error.message });
  }
};

//actualizar una sede
const update = async (req, res) => {
  const { id } = req.params;
  const { name, location, address, logo, participation_file, status } = req.body;

  try {
    const venueExists = await prisma.venues.findUnique({
      where: { id_venue: parseInt(id) },
    });

    if (!venueExists) {
      return res.status(404).json({ message: 'Venue no encontrado' });
    }

    const updatedVenue = await prisma.venues.update({
      where: { id_venue: parseInt(id) },
      data: {
        name,
        location,
        address,
        logo: logo ? Buffer.from(logo, 'base64') : undefined,
        participation_file: participation_file
          ? Buffer.from(participation_file, 'base64')
          : undefined,
        status,
      },
    });

    res.json({ message: 'Venue actualizado', data: updatedVenue });
  } catch (error) {
    console.error('Error al actualizar venue:', error);
    res.status(500).json({ message: 'Error al actualizar venue', error: error.message });
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