const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs').promises;
const path = require('path');
const { sendEmail } = require('../lib/emails/emailSender');

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
    venueCoordinator,
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
  if (files['venueCoordinator.profileImage']) {
    const filePath = files['venueCoordinator.profileImage'][0].path;
    profileImage = await fs.readFile(filePath);
    profile_image_path = files['venueCoordinator.profileImage'][0].filename;
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
        ${venueCoordinator.name},
        ${venueCoordinator.lastNameP},
        ${venueCoordinator.lastNameM || null},
        ${venueCoordinator.email},
        ${venueCoordinator.phone},
        ${venueCoordinator.gender},
        ${venueCoordinator.username},
        ${venueCoordinator.password},
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

    try {
      await sendEmail({
        to: venueCoordinator.email,
        subject: '¡Gracias por tu postulación como Sede!',
        template: 'templates/sede/solicitud',
        data: {
          representativeName: venueCoordinator.name,
          venueName: name,
          email: venueCoordinator.email,
          location: `${country || ''}, ${state || ''}, ${address || ''}`.trim(),
        },
      });
      console.log(`Solicitud email sent to ${venueCoordinator.email}`);
    } catch (emailError) {
      console.error(
        `Error sending solicitud email to ${venueCoordinator.email}:`,
        emailError.message,
      );
    }

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
  const username = req.user?.username || 'unknown'; // Asumiendo que el username viene del token JWT

  try {
    // Verificar si la sede existe y obtener datos del coordinador general y asistentes
    const venue = await prisma.venues.findUnique({
      where: { id_venue: parseInt(id) },
      include: {
        venue_coordinators: true, // Incluir datos del coordinador general
        assistant_coordinators: true, // Incluir datos de los coordinadores asistentes
      },
    });

    if (!venue) {
      return res.status(404).json({ message: 'La sede no existe.' });
    }

    // Validar que el estado actual sea Pendiente
    if (venue.status !== 'Pendiente') {
      return res
        .status(400)
        .json({ message: 'Solo se pueden aprobar sedes con estado Pendiente.' });
    }

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
        username,
        id_venue: parseInt(id),
      },
    });

    // Enviar correo al coordinador general (non-critical)
    const venueCoordinator = venue.venue_coordinators[0]; // Asumir que hay un solo coordinador general
    if (venueCoordinator) {
      try {
        // Construct full name
        const coordinatorFullName = [
          venueCoordinator.name,
          venueCoordinator.paternal_name,
          venueCoordinator.maternal_name,
        ]
          .filter(Boolean)
          .join(' ');

        await sendEmail({
          to: venueCoordinator.email,
          subject: '¡Tu solicitud de sede ha sido aprobada!',
          template: 'templates/sede/aceptado',
          data: {
            name: coordinatorFullName,
            role: 'Coordinador de Sede',
            venue: venue.name,
            username: venueCoordinator.username,
            email: venueCoordinator.email,
            password: venueCoordinator.password, // Considerar seguridad
          },
        });
        console.log(`Approval email sent to ${venueCoordinator.email}`);
      } catch (emailError) {
        console.error(
          `Error sending approval email to ${venueCoordinator.email}:`,
          emailError.message,
        );
      }
    }

    // Enviar correos a los coordinadores asistentes (non-critical)
    for (const assistant of venue.assistant_coordinators) {
      try {
        // Construct full name
        const assistantFullName = [assistant.name, assistant.paternal_name, assistant.maternal_name]
          .filter(Boolean)
          .join(' ');
        await sendEmail({
          to: assistant.email,
          subject: '¡Asignación de Puesto en Patrones Hermosos!',
          template: 'templates/lideres/coordinadoras/aceptado',
          data: {
            pName: assistantFullName,
            venue: venue.name,
            role:
              assistant.role === 'Coordinadora_de_informes'
                ? 'Coordinadora de Informes'
                : 'Coordinadora Asociada',
            address: venue.address || 'No especificada',
            cEmail: venueCoordinator?.email || 'contacto@patroneshermosos.org',
          },
        });
        console.log(`Assistant approval email sent to ${assistant.email}`);
      } catch (emailError) {
        console.error(
          `Error sending assistant approval email to ${assistant.email}:`,
          emailError.message,
        );
      }
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
  const username = req.user?.username || 'unknown'; // Usar username del token JWT

  try {
    // Verificar si la sede existe y obtener datos del coordinador general y asistentes
    const venue = await prisma.venues.findUnique({
      where: { id_venue: parseInt(id) },
      include: {
        venue_coordinators: true,
        assistant_coordinators: true,
      },
    });

    if (!venue) {
      return res.status(404).json({ message: 'Sede no encontrada' });
    }

    // Llamar al procedimiento almacenado
    await prisma.$queryRaw`
      CALL cancelar_sede(${parseInt(id)}, ${username})
    `;

    // Enviar correo al coordinador general (non-critical)
    const venueCoordinator = venue.venue_coordinators[0];
    if (venueCoordinator) {
      try {
        // Construct full name
        const coordinatorFullName = [
          venueCoordinator.name,
          venueCoordinator.paternal_name,
          venueCoordinator.maternal_name,
        ]
          .filter(Boolean)
          .join(' ');
        await sendEmail({
          to: venueCoordinator.email,
          subject: 'Actualización sobre tu solicitud de sede',
          template: 'templates/sede/rechazado',
          data: {
            name: coordinatorFullName,
            venue: venue.name,
            reason: 'Cancelación solicitada por el usuario o administrador.',
            code: `REG-${id}-${new Date().getFullYear()}`,
          },
        });
        console.log(`Cancellation email sent to ${venueCoordinator.email}`);
      } catch (emailError) {
        console.error(
          `Error sending cancellation email to ${venueCoordinator.email}:`,
          emailError.message,
        );
      }
    }

    // Enviar correos a los coordinadores asistentes (non-critical)
    for (const assistant of venue.assistant_coordinators) {
      try {
        // Construct full name
        const assistantFullName = [assistant.name, assistant.paternal_name, assistant.maternal_name]
          .filter(Boolean)
          .join(' ');
        await sendEmail({
          to: assistant.email,
          subject: 'Actualización de tu asignación en Patrones Hermosos',
          template: 'templates/lideres/eliminado',
          data: {
            pName: assistantFullName,
            venue: venue.name,
            role:
              assistant.role === 'Coordinadora_de_informes'
                ? 'Coordinadora de Informes'
                : 'Coordinadora Asociada',
            iEmail: venueCoordinator?.email || 'contacto@patroneshermosos.org',
          },
        });
        console.log(`Assistant cancellation email sent to ${assistant.email}`);
      } catch (emailError) {
        console.error(
          `Error sending assistant cancellation email to ${assistant.email}:`,
          emailError.message,
        );
      }
    }

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

const rejectVenue = async (req, res) => {
  const { id } = req.params;
  const { action, reasons } = req.body; // Incluir reasons desde el cuerpo de la solicitud
  const username = req.user?.username || 'unknown';

  // Validar acción
  if (action !== 'desactivar') {
    return res.status(400).json({ message: 'La acción debe ser "desactivar"' });
  }

  try {
    // Fetch venue data
    const venue = await prisma.venues.findUnique({
      where: { id_venue: parseInt(id) },
      include: {
        venue_coordinators: true,
        assistant_coordinators: true,
      },
    });

    if (!venue) {
      return res.status(404).json({ message: 'Sede no encontrada' });
    }

    // Verificar estado Pendiente
    if (venue.status !== 'Pendiente') {
      return res
        .status(400)
        .json({ message: 'Solo se pueden rechazar sedes con estatus Pendiente' });
    }

    // Actualizar estado a Rechazada
    await prisma.venues.update({
      where: { id_venue: parseInt(id) },
      data: { status: 'Rechazada' },
    });

    // Crear registro en audit_log
    await prisma.audit_log.create({
      data: {
        action: 'UPDATE',
        table_name: 'venues',
        message: `Se rechazó la sede con ID ${id}`,
        username,
        id_venue: parseInt(id),
      },
    });

    // Enviar correo al coordinador general (non-critical)
    const venueCoordinator = venue.venue_coordinators[0];
    if (venueCoordinator) {
      try {
        // Construct full name
        const coordinatorFullName = [
          venueCoordinator.name,
          venueCoordinator.paternal_name,
          venueCoordinator.maternal_name,
        ]
          .filter(Boolean)
          .join(' ');
        await sendEmail({
          to: venueCoordinator.email,
          subject: 'Actualización sobre tu solicitud de sede',
          template: 'templates/sede/rechazado',
          data: {
            name: coordinatorFullName,
            venue: venue.name,
            reason: 'La sede no cumple con los criterios de aceptación.',
            code: `REG-${id}-${new Date().getFullYear()}`,
          },
        });
        console.log(`Cancellation email sent to ${venueCoordinator.email}`);
      } catch (emailError) {
        console.error(
          `Error sending cancellation email to ${venueCoordinator.email}:`,
          emailError.message,
        );
      }
    }

    // Enviar correos a los coordinadores asistentes (non-critical)
    for (const assistant of venue.assistant_coordinators) {
      try {
        // Construct full name
        const assistantFullName = [assistant.name, assistant.paternal_name, assistant.maternal_name]
          .filter(Boolean)
          .join(' ');
        await sendEmail({
          to: assistant.email,
          subject: 'Actualización de tu asignación en Patrones Hermosos',
          template: 'templates/lideres/eliminado',
          data: {
            pName: assistantFullName,
            venue: venue.name,
            role:
              assistant.role === 'Coordinadora_de_informes'
                ? 'Coordinadora de Informes'
                : 'Coordinadora Asociada',
            iEmail: venueCoordinator?.email || 'contacto@patroneshermosos.org',
          },
        });
        console.log(`Assistant cancellation email sent to ${assistant.email}`);
      } catch (emailError) {
        console.error(
          `Error sending assistant cancellation email to ${assistant.email}:`,
          emailError.message,
        );
      }
    }

    res.status(200).json({
      message: `Sede con ID ${id} rechazada exitosamente`,
    });
  } catch (error) {
    console.error('Error al rechazar sede:', error);
    res.status(500).json({ message: 'Error interno al rechazar sede', error: error.message });
  }
};

// venue.controller.js
const getVenuePDF = async (req, res) => {
  const { id } = req.params;
  const { download } = req.query; // Check for download query parameter

  try {
    const venue = await prisma.venues.findUnique({
      where: { id_venue: parseInt(id) },
      select: { participation_file: true },
    });

    if (!venue) {
      return res.status(404).json({ message: 'Venue no encontrado' });
    }

    if (!venue.participation_file) {
      return res.status(404).json({ message: 'No se encontró el archivo de participación' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      download === 'true'
        ? `attachment; filename=venue_${id}_participation.pdf`
        : `inline; filename=venue_${id}_participation.pdf`,
    );
    res.send(venue.participation_file);
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
  rejectVenue,
  getVenuePDF,
};
