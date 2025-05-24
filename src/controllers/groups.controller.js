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

module.exports = {
  getAll,
};