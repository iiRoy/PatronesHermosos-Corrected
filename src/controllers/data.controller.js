const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const data = async (req, res) => {
  const { email, role } = req.user;
  const page = req.query.page;

  try {
    if (!page) {
      return res.status(400).json({ message: 'Falta el parámetro ?page=' });
    }

    console.log('🔎 ROLE:', role);
    console.log('🔎 EMAIL:', email);
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
        const rolCoord = rolMap[req.query.coord] || null;

        const [raw] = await prisma.$queryRawUnsafe(
          `CALL resumen_evento(?, ?, ?, ?, ?)`,
          role,
          email,
          idSede,
          rolColab,
          rolCoord,
        );

        const outer = JSON.parse(raw.f0);

        const resumenParsed = {
          total_participantes: JSON.parse(outer.total_participantes),
          total_colaboradores: JSON.parse(outer.total_colaboradores),
          total_mentoras: Number(outer.total_mentoras),
          total_coordinadoras: Number(outer.total_coordinadoras),
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

      default:
        return res.status(400).json({ message: 'Parámetro ?page= desconocido' });
    }
  } catch (error) {
    console.error('❌ Error en /api/data:', error);
    return res.status(500).json({ message: 'Error al recuperar datos.' });
  }
}

module.exports = {
  data
};