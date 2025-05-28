const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAll = async (req, res) => {
  try {
    const groups = await prisma.groups.findMany({
      select: {
        id_group: true,
        name: true,
        mode: true,
        language: true,
        level: true,
        start_date: true,
        end_date: true,
        max_places: true,
        occupied_places: true,
        start_hour: true,
        end_hour: true,
        location: true,
        id_venue: true,
        venues: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const createGroup = async (req, res) => {
  try {
    console.log('Headers recibidos:', req.headers);
    console.log('Cuerpo recibido (req.body):', req.body);

    const {
      name,
      max_places,
      occupied_places,
      location,
      start_date,
      end_date,
      start_hour,
      end_hour,
      id_mentor,
      language,
      level,
      mode,
      id_venue,
    } = req.body;

    // Validar que todos los campos estén presentes
    const missingFields = [];
    if (!name) missingFields.push('name');
    if (max_places === undefined || max_places === null) missingFields.push('max_places');
    if (occupied_places === undefined || occupied_places === null) missingFields.push('occupied_places');
    if (!location) missingFields.push('location');
    if (!start_date) missingFields.push('start_date');
    if (!end_date) missingFields.push('end_date');
    if (!start_hour) missingFields.push('start_hour');
    if (!end_hour) missingFields.push('end_hour');
    if (id_mentor === undefined || id_mentor === null) missingFields.push('id_mentor');
    if (!language) missingFields.push('language');
    if (!level) missingFields.push('level');
    if (!mode) missingFields.push('mode');
    if (!id_venue) missingFields.push('id_venue');

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Faltan los siguientes campos: ${missingFields.join(', ')}`,
      });
    }

    // Convertir start_date y end_date a objetos Date en UTC
    const startDateBase = new Date(`${start_date}T00:00:00.000Z`);
    const endDateBase = new Date(`${end_date}T00:00:00.000Z`);

    // Validar que las fechas base sean válidas
    if (isNaN(startDateBase.getTime()) || isNaN(endDateBase.getTime())) {
      return res.status(400).json({
        message: 'Las fechas start_date y end_date deben estar en formato YYYY-MM-DD válido',
      });
    }

    // Combinar start_date con start_hour y end_date con end_hour
    const [startHourNum, startMinute] = start_hour.split(':').map(Number);
    const [endHourNum, endMinute] = end_hour.split(':').map(Number);

    const startDateTime = new Date(startDateBase);
    startDateTime.setHours(startHourNum, startMinute, 0, 0);

    const endDateTime = new Date(endDateBase);
    endDateTime.setHours(endHourNum, endMinute, 0, 0);

    // Validar que las horas sean válidas
    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      return res.status(400).json({
        message: 'Las horas start_hour y end_hour deben estar en formato HH:MM válido',
      });
    }

    // Crear el grupo con los datos proporcionados
    console.log('Datos a crear en Prisma:', {
      name,
      max_places,
      occupied_places,
      location,
      start_date: startDateTime,
      end_date: endDateTime,
      start_hour: startDateTime, // Usamos el DateTime completo
      end_hour: endDateTime,     // Usamos el DateTime completo
      id_mentor,
      language,
      level,
      mode,
      status: 'Aprobada',
      id_venue,
    });

    const newGroup = await prisma.groups.create({
      data: {
        name,
        max_places: parseInt(max_places),
        occupied_places: parseInt(occupied_places),
        location,
        start_date: startDateTime,
        end_date: endDateTime,
        start_hour: startDateTime,
        end_hour: endDateTime,
        id_mentor: parseInt(id_mentor),
        language,
        level,
        mode,
        status: 'Aprobada',
        id_venue: parseInt(id_venue),
      },
    });

    res.status(201).json({
      message: 'Grupo creado exitosamente',
      group: newGroup,
    });
  } catch (error) {
    console.error('Error creando grupo:', error);
    res.status(500).json({ message: 'Error interno del servidor al crear el grupo', error: error.message });
  }
};

module.exports = {
  getAll,
  createGroup,
};