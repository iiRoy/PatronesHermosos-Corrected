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
        status: true, // Añadir el campo status
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
      start_hour: startDateTime,
      end_hour: endDateTime,
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

const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const groupId = parseInt(id);
    console.log('Headers recibidos:', req.headers);
    console.log('Cuerpo recibido (req.body):', req.body);
    console.log('ID del grupo:', groupId);

    // Verificar si el grupo existe
    const existingGroup = await prisma.groups.findUnique({
      where: { id_group: groupId },
    });

    if (!existingGroup) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }

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

    // Construir el objeto de datos a actualizar (solo los campos que se proporcionen)
    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (location !== undefined) updateData.location = location;
    if (language !== undefined) updateData.language = language;
    if (level !== undefined) updateData.level = level;
    if (mode !== undefined) updateData.mode = mode;
    if (max_places !== undefined) updateData.max_places = parseInt(max_places);
    if (occupied_places !== undefined) updateData.occupied_places = parseInt(occupied_places);
    if (id_mentor !== undefined) updateData.id_mentor = parseInt(id_mentor);
    if (id_venue !== undefined) updateData.id_venue = parseInt(id_venue);

    // Manejar fechas y horas si se proporcionan
    if (start_date || start_hour || end_date || end_hour) {
      // Si alguna fecha u hora se proporciona, necesitamos calcular start_date y end_date completos
      const currentGroup = existingGroup;

      // Usar valores actuales si no se proporcionan nuevos
      const startDateStr = start_date || currentGroup.start_date.toISOString().split('T')[0];
      const endDateStr = end_date || currentGroup.end_date.toISOString().split('T')[0];
      const startHourStr = start_hour || currentGroup.start_hour.toISOString().split('T')[1].slice(0, 5);
      const endHourStr = end_hour || currentGroup.end_hour.toISOString().split('T')[1].slice(0, 5);

      const startDateBase = new Date(`${startDateStr}T00:00:00.000Z`);
      const endDateBase = new Date(`${endDateStr}T00:00:00.000Z`);

      if (isNaN(startDateBase.getTime()) || isNaN(endDateBase.getTime())) {
        return res.status(400).json({
          message: 'Las fechas start_date y end_date deben estar en formato YYYY-MM-DD válido',
        });
      }

      const [startHourNum, startMinute] = startHourStr.split(':').map(Number);
      const [endHourNum, endMinute] = endHourStr.split(':').map(Number);

      const startDateTime = new Date(startDateBase);
      startDateTime.setHours(startHourNum, startMinute, 0, 0);

      const endDateTime = new Date(endDateBase);
      endDateTime.setHours(endHourNum, endMinute, 0, 0);

      if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
        return res.status(400).json({
          message: 'Las horas start_hour y end_hour deben estar en formato HH:MM válido',
        });
      }

      updateData.start_date = startDateTime;
      updateData.end_date = endDateTime;
      updateData.start_hour = startDateTime;
      updateData.end_hour = endDateTime;
    }

    // Validaciones adicionales
    if (updateData.max_places !== undefined && updateData.occupied_places !== undefined) {
      if (updateData.occupied_places > updateData.max_places) {
        return res.status(400).json({
          message: 'Los lugares ocupados no pueden ser mayores que los lugares máximos',
        });
      }
    }

    console.log('Datos a actualizar en Prisma:', updateData);

    const updatedGroup = await prisma.groups.update({
      where: { id_group: groupId },
      data: updateData,
    });

    res.status(200).json({
      message: 'Grupo actualizado exitosamente',
      group: updatedGroup,
    });
  } catch (error) {
    console.error('Error actualizando grupo:', error);
    res.status(500).json({ message: 'Error interno del servidor al actualizar el grupo', error: error.message });
  }
};

// Cambiar estado del grupo (activar/desactivar)
const changeGroupStatus = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;
  const username = req.user.username; // Usar username del token JWT

  // Validar acción
  if (!action || !['activar', 'desactivar'].includes(action)) {
    return res.status(400).json({ message: 'La acción debe ser "activar" o "desactivar"' });
  }

  try {
    // Obtener id_venue del grupo
    const group = await prisma.groups.findUnique({
      where: { id_group: parseInt(id) },
      select: { id_venue: true },
    });

    if (!group) {
      return res.status(404).json({ message: 'El grupo no existe' });
    }

    const id_venue = group.id_venue;

    // Llamar al procedimiento almacenado
    await prisma.$queryRaw`
      CALL cambiar_estado_grupo(${parseInt(id)}, ${username}, ${id_venue}, ${action})
    `;

    res.status(200).json({
      message: `Grupo con ID ${id} ${action === 'activar' ? 'activado' : 'desactivado'} exitosamente`,
    });
  } catch (error) {
    console.error('Error al cambiar estado del grupo:', error);
    if (error.code === '45000') {
      return res.status(400).json({ message: error.message });
    }
    console.error('Full error details:', JSON.stringify(error, null, 2));
    res.status(500).json({ message: 'Error interno al cambiar estado del grupo', error: error.message });
  }
};

/*
commit
*/

module.exports = {
  getAll,
  createGroup,
  updateGroup,
  changeGroupStatus,
};