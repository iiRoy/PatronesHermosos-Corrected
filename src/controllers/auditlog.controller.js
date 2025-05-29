const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los registros de audit_log
const getAll = async (req, res) => {
  try {
    const auditLogs = await prisma.audit_log.findMany({
      include: {
        venues: true, // Incluir la relación con venues para obtener el nombre
      },
      orderBy: {
        created_at: 'desc', // Ordenar por fecha de creación, más reciente primero
      },
    });

    // Formatear los datos para incluir el nombre de la sede
    const formattedLogs = auditLogs.map((log) => ({
      id: log.id,
      action: log.action,
      table_name: log.table_name,
      venue_name: log.venues?.name || 'No especificada',
      username: log.username,
      message: log.message,
      created_at: log.created_at.toISOString(), // Convertir a formato ISO para el frontend
    }));

    res.json({ success: true, data: formattedLogs });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ success: false, message: 'Error al obtener los registros de auditoría' });
  }
};

module.exports = {
  getAll,
};