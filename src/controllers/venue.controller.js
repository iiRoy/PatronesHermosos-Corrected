const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs').promises;
const path = require('path');

// Utility function to transform flat keys into nested objects
const parseNestedBody = (body) => {
  const result = {};

  for (const key in body) {
    const parts = key.split('[');
    if (parts.length === 1) {
      result[key] = body[key];
    } else {
      let current = result;
      for (let i = 0; i < parts.length; i++) {
        let part = parts[i];
        if (part.endsWith(']')) {
          part = part.slice(0, -1);
        }
        if (i === parts.length - 1) {
          current[part] = body[key];
        } else {
          current[part] = current[part] || {};
          current = current[part];
        }
      }
    }
  }

  return result;
};

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
        pais: true,
        estado: true,
        campus: true,
        coordinador: true,
        no_grupos: true,
        no_estudiantes: true,
      },
    });
    res.status(200).json(venues);
  } catch (error) {
    console.error('Error al obtener los datos específicos de las sedes:', error);
    res
      .status(500)
      .json({ message: 'Error interno al obtener los datos específicos de las sedes' });
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
  // Transform flat req.body into nested structure
  const parsedBody = parseNestedBody(req.body);

  // Extract text fields from parsedBody
  const {
    name,
    country,
    state,
    address,
    generalCoordinator,
    associatedCoordinator,
    staffCoordinator,
    participantsCoordinator,
  } = parsedBody;

  // Extract files from req.files (uploaded via multer)
  const files = req.files || {};
  let participation_file = null;
  let logo = null;
  let profileImage = null;
  let participation_file_path = null;
  let logo_path = null;
  let profile_image_path = null;

  // Read file contents and get filenames
  if (files['participation_file']) {
    const filePath = files['participation_file'][0].path;
    participation_file = await fs.readFile(filePath);
    participation_file_path = files['participation_file'][0].filename;
  }
  if (files['logo']) {
    const filePath = files['logo'][0].path;
    logo = await fs.readFile(filePath);
    logo_path = files['logo'][0].filename;
  }
  if (files['generalCoordinator.profileImage']) {
    const filePath = files['generalCoordinator.profileImage'][0].path;
    profileImage = await fs.readFile(filePath);
    profile_image_path = files['generalCoordinator.profileImage'][0].filename;
  }

  // Validate required file
  if (!participation_file) {
    return res.status(400).json({ message: 'El archivo de participación es obligatorio' });
  }

  try {
    // Call the stored procedure with country and state
    await prisma.$queryRaw`
      CALL registrar_sede(
        ${name}, 
        ${country}, 
        ${state}, 
        ${address}, 
        ${logo}, 
        ${participation_file},
        ${logo_path},
        ${participation_file_path},
        ${generalCoordinator.name},
        ${generalCoordinator.lastNameP},
        ${generalCoordinator.lastNameM || null},
        ${generalCoordinator.email},
        ${generalCoordinator.phone},
        ${generalCoordinator.gender},
        ${generalCoordinator.username},
        ${generalCoordinator.password},
        ${profileImage},
        ${profile_image_path},
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

    // Send registration confirmation email to venue coordinator
    await sendEmail({
      to: generalCoordinator.email,
      subject: 'Confirmación de Solicitud de Sede - Patrones Hermosos',
      template: 'sede/solicitud',
      data: {
        representativeName: `${generalCoordinator.name} ${generalCoordinator.lastNameP || ''} ${generalCoordinator.lastNameM || ''}`.trim(),
        venueName: name,
        representativeName: `${generalCoordinator.name} ${generalCoordinator.lastNameP || ''} ${generalCoordinator.lastNameM || ''}`.trim(),
        email: generalCoordinator.email,
        location: address || 'No especificado',
        iEmail: 'rgparedes@tec.mx',
      },
    });

    res.status(201).json({
      message: 'Venue creado exitosamente',
      files: {
        participation_file: participation_file_path,
        logo: logo_path,
        profile_image: profile_image_path,
      },
    });
  } catch (error) {
    console.error('Error al crear venue:', error);
    res.status(500).json({ message: 'Error al crear venue', error: error.message });
  }
};

//actualizar una sede
const update = async (req, res) => {
  const { id } = req.params;
  const { name, country, state, address, status } = req.body;

  // Extract files from req.files (uploaded via multer)
  const files = req.files || {};
  let participation_file = undefined;
  let logo = undefined;

  // Read file contents for database storage
  if (files['participation_file']) {
    const filePath = files['participation_file'][0].path;
    participation_file = await fs.readFile(filePath);
  }
  if (files['logo']) {
    const filePath = files['logo'][0].path;
    logo = await fs.readFile(filePath);
  }

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
        country,
        state,
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

//nuevo controlador para actualizar campos básicos
const updateBasic = async (req, res) => {
  const { id } = req.params;
  const { name, country, state, address, status } = req.body;

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
        country,
        state,
        address,
        status,
      },
    });

    res.json({ message: 'Venue actualizado con éxito', data: updatedVenue });
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

// Cancelar una sede
const cancelVenue = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  // Validar que se proporcionó el username
  if (!username) {
    return res.status(400).json({ message: 'El campo username es obligatorio' });
  }

  try {
    // Llamar al procedimiento almacenado cancelar_sede
    await prisma.$queryRaw`
      CALL cancelar_sede(${parseInt(id)}, ${username})
    `;

    // Send rejection email to venue coordinator
      await sendEmail({
        to: generalCoordinator.email,
        subject: 'Resultados de tu Postulación de Sede - Patrones Hermosos',
        template: 'sedes/rechazado',
        data: {
          name: `${coordinator.name} ${coordinator.paternal_name || ''} ${coordinator.maternal_name || ''}`.trim(),
          venue: venue.name,
          reason: reason || 'No cumplió con los criterios de selección',
          code: uuidv4().slice(0, 8),
          iEmail: 'rgparedes@tec.mx',
        },
      });

    res.status(200).json({ message: `Sede con ID ${id} cancelada exitosamente` });
  } catch (error) {
    console.error('Error al cancelar la sede:', error);
    if (error.code === '45000') {
      // Manejo de errores personalizados del procedimiento almacenado
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error interno al cancelar la sede', error: error.message });
  }
};

const approveVenue = async (req, res) => {
  const { id } = req.params;
  const username = req.user?.username; // Asumiendo que el username viene del token JWT

  try {
    try {
    // Fetch venue, coordinator, and assistant coordinators
    const venue = await prisma.venues.findUnique({
      where: { id_venue: parseInt(id) },
      include: {
        venue_coordinators: {
          select: {
            name: true,
            paternal_name: true,
            maternal_name: true,
            email: true,
            username: true,
            password: true,
          },
        },
        assistant_coordinators: {
          select: {
            name: true,
            paternal_name: true,
            maternal_name: true,
            email: true,
            role: true,
          },
        },
        groups: {
          include: {
            participants: {
              select: {
                id_participant: true,
              },
            },
          },
        },
      },
    });

    if (!venue) {
      return res.status(404).json({ message: 'La sede no existe.' });
    }

    // Validar que el estado actual sea Pendiente
    if (venue.status !== 'Pendiente') {
      return res.status(400).json({ message: 'Solo se pueden aprobar sedes con estado Pendiente.' });
    }

    const generalCoordinator = venue.venue_coordinators[0];

    // Actualizar el estado a Registrada sin participantes
    const updatedVenue = await prisma.venues.update({
      where: { id_venue: parseInt(id) },
      data: {
        status: 'Registrada_sin_participantes',
        updated_at: new Date(),
      },
    });

    // Registrar el log
    await prisma.audit_log.create({
      data: {
        action: 'UPDATE',
        table_name: 'venues',
        message: `Se aprobó la sede con ID ${id}`,
        username: username || 'unknown',
        id_venue: parseInt(id),
      },
    });

    // Send acceptance email to general coordinator
    await sendEmail({
      to: generalCoordinator.email,
      subject: '¡Felicidades! Tu Sede ha sido Aceptada - Patrones Hermosos',
      template: 'sedes/aceptado',
      data: {
        name: `${generalCoordinator.name} ${generalCoordinator.paternal_name || ''} ${generalCoordinator.maternal_name || ''}`.trim(),
        role: 'Coordinadora General',
        venue: venue.name,
        username: generalCoordinator.username,
        email: generalCoordinator.email,
        password: generalCoordinator.password, // Note: Sending passwords in email is insecure; consider a secure alternative
        platformLink: `https://patroneshermosos.org/login/${uuidv4().slice(0, 8)}`,
      },
    });

    // Send assignment emails to all assistant coordinators
    for (const assistant of venue.assistant_coordinators) {
      // Map role based on stored role
      let teamRole = assistant.role;
      if (!teamRole || teamRole === 'Pendiente') {
        // Fallback: Infer role based on context (e.g., email matching from registrar_sede)
        teamRole = assistant.role === 'Coordinadora_Asociada' ? 'Coordinadora_Asociada' : 'Coordinadora_de_informes';
      }

      await sendEmail({
        to: assistant.email,
        subject: 'Asignación de Puesto en Sede - Patrones Hermosos',
        template: 'lideres/aceptado',
        data: {
          pName: `${assistant.name} ${assistant.paternal_name || ''} ${assistant.maternal_name || ''}`.trim(),
          venue: venue.name,
          role: teamRole,
          address: venue.address || 'No especificado',
          cName: `${generalCoordinator.name} ${generalCoordinator.paternal_name || ''} ${generalCoordinator.maternal_name || ''}`.trim(),
          cEmail: generalCoordinator.email || 'rgparedes@tec.mx',
        },
      });
    }

    return res.status(200).json({
      message: 'Sede aprobada exitosamente.',
      data: updatedVenue,
    });
  } catch (error) {
    console.error('Error al aprobar la sede:', error);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Cancelar una sede
const cancelarVenue = async (req, res) => {
  const { id } = req.params;
  const username = req.user.username; // Usar username del token JWT

  try {
    // Llamar al procedimiento almacenado
    await prisma.$queryRaw`
      CALL cancelar_sede(${parseInt(id)}, ${username})
    `;

    res.status(200).json({
      message: `Sede con ID ${id} cancelada exitosamente`,
    });
  } catch (error) {
    console.error('Error al cancelar la sede:', error);
    if (error.code === '45000') {
      return res.status(400).json({ message: error.message });
    }
    console.error('Full error details:', JSON.stringify(error, null, 2));
    res.status(500).json({ message: 'Error interno al cancelar la sede', error: error.message });
  }
};

// Get PDF for a venue
const getVenuePDF = async (req, res) => {
  const { id } = req.params;

  try {
    const venue = await prisma.venues.findUnique({
      where: { id_venue: parseInt(id) },
      select: { participation_file_path: true }, // For file system approach
      // select: { participation_file: true }, // Uncomment for BLOB approach
    });

    if (!venue) {
      return res.status(404).json({ message: 'Venue no encontrado' });
    }

    // File System Approach
    if (!venue.participation_file_path) {
      return res.status(404).json({ message: 'No se encontró el archivo de participación' });
    }

    // Return the filename to be used with the /files/:filename route
    res.json({ filename: venue.participation_file_path });

    /*
    // BLOB Approach (uncomment if preferred)
    if (!venue.participation_file) {
      return res.status(404).json({ message: 'No se encontró el archivo de participación' });
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=venue_${id}_participation.pdf`);
    res.send(venue.participation_file);
    */
  } catch (error) {
    console.error('Error al obtener el PDF de la sede:', error);
    res.status(500).json({ message: 'Error interno al obtener el PDF', error: error.message });
  }
};


module.exports = {
  getAll,
  getSpecificData,
  getById,
  create,
  update,
  updateBasic,
  remove,
  cancelVenue,
  approveVenue,
  cancelarVenue,
  getVenuePDF,
};
