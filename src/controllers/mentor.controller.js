const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todas las mentoras con los datos necesarios para la tabla
const getAll = async (req, res) => {
  try {
    const mentors = await prisma.mentors.findMany({
      include: {
        venues: true,
        groups: true,
      },
    });

    // Formatear los datos para la tabla
    const formattedMentors = mentors.map(mentor => ({
      id_mentor: mentor.id_mentor,
      name: `${mentor.name} ${mentor.paternal_name || ''} ${mentor.maternal_name || ''}`.trim(),
      email: mentor.email || 'Sin correo',
      phone_number: mentor.phone_number || 'Sin teléfono',
      venue: mentor.venues?.name || 'Sede desconocida',
      id_venue: mentor.id_venue,
      number_of_groups: mentor.groups.length,
      status: mentor.status,
      paternal_name: mentor.paternal_name || null,
      maternal_name: mentor.maternal_name || null,
    }));

    res.json({ success: true, data: formattedMentors });
  } catch (error) {
    console.error('Error fetching mentors:', error);
    res.status(500).json({ success: false, message: 'Error al obtener mentoras' });
  }
};

// Obtener una mentora por ID
const getMentorById = async (req, res) => {
  const { id } = req.params;

  try {
    const mentor = await prisma.mentors.findUnique({
      where: { id_mentor: parseInt(id) },
      include: {
        venues: true,
      },
    });

    if (!mentor) {
      return res.status(404).json({ success: false, message: 'Mentora no encontrada' });
    }

    res.json({
      success: true,
      data: {
        id_mentor: mentor.id_mentor,
        name: mentor.name,
        paternal_name: mentor.paternal_name,
        maternal_name: mentor.maternal_name,
        email: mentor.email,
        phone_number: mentor.phone_number,
        id_venue: mentor.id_venue,
        venue: mentor.venues?.name || 'Sede desconocida',
      },
    });
  } catch (error) {
    console.error('Error fetching mentor by ID:', error);
    res.status(500).json({ success: false, message: 'Error al obtener la mentora' });
  }
};

// Obtener los datos para mostrar en la tabla de gestión de mentoras de superusuario
const getSpecific = async (req, res) => {
  const { id } = req.params;
  try {
    const mentor = await prisma.mentors.findUnique({
      where: { id_mentor: parseInt(id) },
      include: {
        venues: true,
        groups: true,
      },
    });

    if (!mentor) {
      return res.status(404).json({ success: false, message: 'Mentora no encontrada' });
    }

    res.json({
      success: true,
      data: {
        id: mentor.id_mentor,
        name: mentor.name,
        venue: mentor.venues.name,
        number_of_groups: mentor.groups.length,
        email: mentor.email,
        phone_number: mentor.phone_number,
      },
    });
  } catch (error) {
    console.error('Error fetching mentor:', error);
    res.status(500).json({ success: false, message: 'Error al obtener la mentora' });
  }
};

// Crear una nueva mentora
const create = async (req, res) => {
  const { name, paternal_name, maternal_name, email, phone_number, id_venue } = req.body;
  try {
    const newMentor = await prisma.mentors.create({
      data: {
        name,
        paternal_name,
        maternal_name,
        email,
        phone_number,
        id_venue,
      },
    });
    res.json({ success: true, message: 'Mentora creada', data: newMentor });
  } catch (error) {
    console.error('Error creating mentor:', error);
    res.status(500).json({ success: false, message: 'Error al crear la mentora' });
  }
};

// Actualizar todos los datos de mentora
const update = async (req, res) => {
  const { id } = req.params;
  const { name, paternal_name, maternal_name, email, phone_number, id_venue } = req.body;

  try {
    const updateData = {};
    if (name !== undefined) updateData.name = name?.trim() || null;
    if (paternal_name !== undefined) updateData.paternal_name = paternal_name?.trim() || null;
    if (maternal_name !== undefined) updateData.maternal_name = maternal_name?.trim() || null;
    if (email !== undefined) updateData.email = email?.trim() || null;
    if (phone_number !== undefined) updateData.phone_number = phone_number?.trim() || null;
    if (id_venue !== undefined) updateData.id_venue = id_venue;

    console.log('Datos enviados al controlador (update):', updateData); // Log para depurar

    const updatedMentor = await prisma.mentors.update({
      where: { id_mentor: parseInt(id) },
      data: updateData,
    });

    res.json({ success: true, message: 'Mentora actualizada', data: updatedMentor });
  } catch (error) {
    console.error('Error updating mentor:', error);
    res.status(500).json({ success: false, message: 'Error al intentar actualizar la mentora' });
  }
};

// Tabla de actualizar mentora (por superuser)
const updateBasicData = async (req, res) => {
  const { id } = req.params;
  const { name, paternal_name, maternal_name, email, phone_number, id_venue } = req.body;

  try {
    // Crear objeto de datos dinámicamente, incluyendo solo campos proporcionados
    const updateData = {};
    if (name !== undefined) updateData.name = name?.trim() || null;
    if (paternal_name !== undefined) updateData.paternal_name = paternal_name?.trim() || null;
    if (maternal_name !== undefined) updateData.maternal_name = maternal_name?.trim() || null;
    if (email !== undefined) updateData.email = email?.trim() || null;
    if (phone_number !== undefined) updateData.phone_number = phone_number?.trim() || null;
    if (id_venue !== undefined) updateData.id_venue = id_venue;

    console.log('Datos enviados al controlador (updateBasicData):', updateData); // Log para depurar

    const updatedMentor = await prisma.mentors.update({
      where: { id_mentor: parseInt(id) },
      data: updateData,
    });

    res.json({ success: true, message: 'Mentora actualizada (datos básicos)', data: updatedMentor });
  } catch (error) {
    console.error('Error updating mentor basic data:', error);
    res.status(500).json({ success: false, message: 'Error al actualizar datos básicos de la mentora' });
  }
};

// Eliminar una mentora por ID
const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.mentors.delete({
      where: { id_mentor: parseInt(id) },
    });
    res.json({ success: true, message: 'Mentora eliminada' });
  } catch (error) {
    console.error('Error deleting mentor:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar la mentora' });
  }
};

// Obtener los grupos de una mentora
const getGroupMentor = async (req, res) => {
  const { id_mentor } = req.params;

  if (isNaN(parseInt(id_mentor))) {
    return res.status(400).json({ success: false, message: 'ID de mentora inválido' });
  }

  try {
    const groups = await prisma.groups.findMany({
      where: {
        id_mentor: parseInt(id_mentor),
      },
    });
    res.json({ success: true, data: groups });
  } catch (error) {
    console.error('Error fetching mentors:', error);
    res.status(500).json({ success: false, message: 'Error al obtener grupos de la mentora' });
  }
};

// Remover mentora de un grupo
const removeMentorFromGroup = async (req, res) => {
  const { id_group } = req.params;

  if (isNaN(parseInt(id_group))) {
    return res.status(400).json({ success: false, message: 'ID de grupo inválido' });
  }

  try {
    const updatedGroup = await prisma.groups.update({
      where: {
        id_group: parseInt(id_group),
      },
      data: {
        id_mentor: null,
      },
    });

    res.json({ success: true, message: 'Mentora removida del grupo correctamente', data: updatedGroup });
  } catch (error) {
    console.error('Error removing mentor from group:', error);
    res.status(500).json({ success: false, message: 'Error al remover mentora del grupo' });
  }
};


// Cancelar una mentora (cambiar status de Aprobada a Cancelada)
const cancelMentor = async (req, res) => {
  const { id } = req.params;
  const username = req.user.username; // Usar username del token JWT

  try {
    // Verificar si la mentora existe y está Aprobada
    const mentor = await prisma.mentors.findUnique({
      where: { id_mentor: parseInt(id) },
      select: { id_mentor: true, status: true, name: true, paternal_name: true, maternal_name: true, id_venue: true },
    });

    if (!mentor) {
      return res.status(404).json({ message: 'La mentora no existe.' });
    }

    if (mentor.status !== 'Aprobada') {
      return res.status(400).json({ message: 'Solo se pueden cancelar mentoras con status Aprobada.' });
    }

    // Actualizar el status a Cancelada
    await prisma.mentors.update({
      where: { id_mentor: parseInt(id) },
      data: { status: 'Cancelada' },
    });

    // Registrar en audit_log
    await prisma.audit_log.create({
      data: {
        action: 'UPDATE',
        table_name: 'mentors',
        message: `Se canceló la mentora con ID ${id} (${mentor.name || ''} ${mentor.paternal_name || ''} ${mentor.maternal_name || ''})`,
        username,
        id_venue: mentor.id_venue,
      },
    });

    res.status(200).json({
      message: `Mentora con ID ${id} cancelada exitosamente`,
    });
  } catch (error) {
    console.error('Error al cancelar la mentora:', error);
    res.status(500).json({ message: 'Error interno al cancelar la mentora', error: error.message });
  }
};


module.exports = {
  getAll,
  getMentorById,
  getSpecific,
  create,
  update,
  updateBasicData,
  remove,
  getGroupMentor,
  removeMentorFromGroup,
  cancelMentor,
};