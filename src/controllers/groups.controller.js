const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAll = async (req, res) => {
  try {
    const groups = await prisma.groups.findMany({
      include: {
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

module.exports = {
  getAll,
  changeGroupStatus,
};