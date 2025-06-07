const { Request, Response } = require ('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const data = async (req, res) => {
  const { email, role, username } = req.user;
  const page = req.query.page;

  try {
    if (!page) {
      return res.status(400).json({ message: 'Falta el parámetro ?page=' });
    }

    console.log('🔎 ROLE:', role);
    console.log('🔎 EMAIL:', email);
    console.log('🔎 USERNAME:', username);
    console.log('🔎 PAGE:', page);

    switch (page) {
      case 'evento': {
        const rolMap = {
          cg: 'Coordinadora General',
          ca: 'Coordinadora Asociada',
          ci: 'Coordinadora de informes',
          st: 'Staff',
          in: 'Instructora',
          fa: 'Facilitadora',
        };

        const idSede = req.query.id ? Number(req.query.id) : null;
        const rolColab = rolMap[req.query.colab] || null;

        const [raw] = await prisma.$queryRawUnsafe(
          `CALL resumen_evento(?, ?, ?, ?)`,
          role,
          email,
          idSede,
          rolColab,
        );

        const outer = JSON.parse(raw.f0);

        const resumenParsed = {
          total_participantes: JSON.parse(outer.total_participantes),
          total_colaboradores: JSON.parse(outer.total_colaboradores),
          total_mentoras: Number(outer.total_mentoras),
          total_coordinadoras: JSON.parse(outer.total_coordinadoras),
          total_sedes: outer.total_sedes ? JSON.parse(outer.total_sedes) : null,
        };

        return res.json({ resumenEvento: resumenParsed });
      }

      case 'sedes': {
        const [raw] = await prisma.$queryRawUnsafe(`CALL resumen_sede(?, ?)`, role, email);
        const resumenRaw = raw.f0;

        const resumenParsed = JSON.parse(resumenRaw);
        return res.json({ resumenSedes: resumenParsed });
      }

      case 'colaboradoras': {
        const sedeId = req.query.id ? Number(req.query.id) : null;

        const [raw] = await prisma.$queryRawUnsafe(
          `CALL resumen_colaboradoras(?, ?, ?)`,
          role,
          email,
          sedeId,
        );
        const resumenRaw = raw.f0;
        const resumenParsed = JSON.parse(resumenRaw);
        return res.json({ resumenColaboradoras: resumenParsed });
      }

      case 'coordinadoras': {
        const sedeId = req.query.id ? Number(req.query.id) : null;

        const [raw] = await prisma.$queryRawUnsafe(
          `CALL resumen_coordinadoras(?, ?, ?)`,
          role,
          email,
          sedeId,
        );
        const resumenRaw = raw.f0;
        const resumenParsed = JSON.parse(resumenRaw);
        return res.json({ resumenColaboradoras: resumenParsed });
      }

      case 'times': {
        const sedeId = req.query.id ? Number(req.query.id) : null;

        const frecuenciaMap = { 1: 'semanal', 2: 'mensual' };
        const detalleMap = { 1: 'general', 2: 'detallado' };
        const estadoMap = { 1: 'Aprobada', 2: 'Pendiente', 3: 'Rechazada' };

        const frecuencyStr = frecuenciaMap[req.query.frec] || null;
        const levelStr = detalleMap[req.query.lev] || null;
        const stateStr = estadoMap[req.query.state] || null;

        const [raw] = await prisma.$queryRawUnsafe(
          `CALL resumen_tiempo_roles_detallado(?, ?, ?, ?, ?, ?)`,
          role,
          email,
          frecuencyStr,
          levelStr,
          sedeId,
          stateStr,
        );
        const resumenRaw = raw.f0;
        const resumenParsed = JSON.parse(resumenRaw);
        return res.json({ resumenTiempos: resumenParsed });
      }

      case 'venues': {
        const sedeId = req.query.id ? Number(req.query.id) : null;

        const query = `SELECT id_venue, name, status FROM venues ${
          sedeId !== null ? 'WHERE id_venue = ?' : ''
        };`;

        const venues = await prisma.$queryRawUnsafe(query, ...(sedeId !== null ? [sedeId] : []));

        const formatted = venues.map((sede) => ({
          id: Number(sede.id_venue.toString()),
          name: sede.name,
          status: sede.status,
        }));

        return res.json({ venues: formatted });
      }

      case 'roles': {
        const dbName = process.env.DATABASE_NAME;

        try {
          const columns = await prisma.$queryRawUnsafe(`
      SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, COLUMN_TYPE
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = '${dbName}'
    `);

          const grouped = columns.reduce((acc, col) => {
            if (!acc[col.TABLE_NAME]) acc[col.TABLE_NAME] = {};
            acc[col.TABLE_NAME][col.COLUMN_NAME] = col;
            return acc;
          }, {});

          const roles = [];
          let idCounter = 1;
          const coordinadoraVariants = new Set();

          // Traducciones
          const translateTable = (tableName) => {
            const base = tableName.replace(/_/g, ' ').replace(/s$/, '').toLowerCase();
            const mapping = {
              collaborator: 'Colaboradora',
              participant: 'Participante',
              mentor: 'Mentora',
              coordinadora: 'Coordinadora',
            };
            return mapping[base] || base.charAt(0).toUpperCase() + base.slice(1);
          };

          for (const table in grouped) {
            if (table === 'superusers') continue;
            if (table === 'tutors') continue;

            const cols = grouped[table];
            const hasName = !!cols['name'];
            const hasPaternal = !!cols['paternal_name'];
            const hasRoleEnum = cols['role'] && cols['role'].DATA_TYPE === 'enum';

            if (table.includes('coordinator')) {
              if (hasRoleEnum) {
                const values = cols['role'].COLUMN_TYPE.replace(/^enum\(/, '')
                  .replace(/\)$/, '')
                  .split(',')
                  .map((v) => v.trim().replace(/^'(.*)'$/, '$1'))
                  .filter((v) => v.toLowerCase() !== 'pendiente');

                values.forEach((v) => coordinadoraVariants.add(v));
              } else {
                coordinadoraVariants.add('Coordinadora General');
              }
              continue;
            }

            if (hasName && hasPaternal) {
              let variantes = null;

              if (hasRoleEnum) {
                const values = cols['role'].COLUMN_TYPE.replace(/^enum\(/, '')
                  .replace(/\)$/, '')
                  .split(',')
                  .map((v) => v.trim().replace(/^'(.*)'$/, '$1'))
                  .filter((v) => v.toLowerCase() !== 'pendiente');

                if (values.length > 0) variantes = values;
              }

              const rawValue = table.replace(/_/g, ' ').replace(/s$/, '').toLowerCase().trim();
              roles.push({
                id: idCounter++,
                value: translateTable(rawValue),
                variante: variantes,
              });
            }
          }

          if (coordinadoraVariants.size > 0) {
            roles.push({
              id: idCounter++,
              value: 'Coordinadora',
              variante: Array.from(coordinadoraVariants),
            });
          }

          return res.json({ roles });
        } catch (error) {
          console.error('Error al obtener roles:', error);
          return res.status(500).json({ error: 'Error interno al obtener roles' });
        }
      }

      default:
        return res.status(400).json({ message: 'Parámetro ?page= desconocido' });
    }
  } catch (error) {
    console.error('❌ Error en /api/data:', error);
    return res.status(500).json({ message: 'Error al recuperar datos.' });
  }
};

const getProfile = async (req, res) => {
  // authMiddleware ya inyectó aquí: req.user = { id, email, username, role }
  const { id: userId, role } = req.user;

  try {
    let userRecord;
    if (role === 'superuser') {
      userRecord = await prisma.superusers.findUnique({
        where: { id_superuser: userId },
        select: {
          name: true,
          paternal_name: true,
          maternal_name: true,
          email: true,
        },
      });
    } else if (role === 'venue_coordinator') {
      userRecord = await prisma.venue_coordinators.findUnique({
        where: { id_venue_coord: userId },
        select: {
          name: true,
          paternal_name: true,
          maternal_name: true,
          email: true,
        },
      });
    } else {
      return res.status(403).json({ message: 'Rol no soportado' });
    }

    if (!userRecord) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.json(userRecord);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};


module.exports = {
  data,
  getProfile
};
