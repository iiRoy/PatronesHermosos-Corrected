const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

// Utility function to transform flat keys into nested objects
const parseNestedBody = (body) => {
  const result = {};

  for (const key in body) {
    const parts = key.split('[');
    if (parts.length === 1) {
      // Simple key (e.g., 'name', 'location')
      result[key] = body[key];
    } else {
      // Nested key (e.g., 'generalCoordinator[name]')
      let current = result;
      for (let i = 0; i < parts.length; i++) {
        let part = parts[i];
        if (part.endsWith(']')) {
          part = part.slice(0, -1); // Remove ']'
        }
        if (i === parts.length - 1) {
          // Last part, set the value
          current[part] = body[key];
        } else {
          // Create nested object if it doesn't exist
          current[part] = current[part] || {};
          current = current[part];
        }
      }
    }
  }

  return result;
};

const getAll = async (req, res) => {
  const venues = await prisma.venues.findMany();
  res.json(venues);
};

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

const create = async (req, res) => {
  // Transform flat req.body into nested structure
  const parsedBody = parseNestedBody(req.body);

  // Extract text fields from parsedBody
  const {
    name,
    location,
    address,
    generalCoordinator,
    associatedCoordinator,
    staffCoordinator,
    participantsCoordinator,
  } = parsedBody;

  // Extract files from req.files (uploaded via multer)
  const files = req.files || {};
  const participation_file = files['participation_file'] ? files['participation_file'][0].buffer : null;
  const logo = files['logo'] ? files['logo'][0].buffer : null;
  const profileImage = files['generalCoordinator.profileImage'] ? files['generalCoordinator.profileImage'][0].buffer : null;

  // Validate required file
  if (!participation_file) {
    return res.status(400).json({ message: 'El archivo de participación es obligatorio' });
  }

  try {
    // Call the stored procedure
    await prisma.$queryRaw`
      CALL registrar_sede(
        ${name}, 
        ${location}, 
        ${address}, 
        ${logo}, 
        ${participation_file},
        ${generalCoordinator.name},
        ${generalCoordinator.lastNameP},
        ${generalCoordinator.lastNameM || null},
        ${generalCoordinator.email},
        ${generalCoordinator.phone},
        ${generalCoordinator.gender},
        ${generalCoordinator.username},
        ${generalCoordinator.password},
        ${profileImage},
        ${associatedCoordinator?.name || null},
        ${associatedCoordinator?.lastNameP || null},
        ${associatedCoordinator?.lastNameM || null},
        ${associatedCoordinator?.email || null},
        ${associatedCoordinator?.phone || null},
        ${staffCoordinator?.name || null},
        ${staffCoordinator?.lastNameP || null},
        ${staffCoordinator?.lastNameM || null},
        ${staffCoordinator?.email || null},
        ${staffCoordinator?.phone || null},
        ${participantsCoordinator?.name || null},
        ${participantsCoordinator?.lastNameP || null},
        ${participantsCoordinator?.lastNameM || null},
        ${participantsCoordinator?.email || null},
        ${participantsCoordinator?.phone || null}
      )
    `;

    res.status(201).json({ message: 'Venue creado exitosamente' });
  } catch (error) {
    console.error('Error al crear venue:', error);
    res.status(500).json({ message: 'Error al crear venue', error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, location, address, status } = req.body;

  // Extract files from req.files (uploaded via multer)
  const files = req.files || {};
  const participation_file = files['participation_file'] ? files['participation_file'][0].buffer : undefined;
  const logo = files['logo'] ? files['logo'][0].buffer : undefined;

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
        logo,
        participation_file,
        status,
      },
    });

    res.json({ message: 'Venue actualizado', data: updatedVenue });
  } catch (error) {
    console.error('Error al actualizar venue:', error);
    res.status(500).json({ message: 'Error al actualizar venue', error: error.message });
  }
};

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
  getById,
  create,
  update,
  remove,
};