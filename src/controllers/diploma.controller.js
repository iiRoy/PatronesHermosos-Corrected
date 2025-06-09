// diploma.controller.js

const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const { PrismaClient } = require('@prisma/client');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');
const { sendEmail } = require('../lib/emails/emailSender'); // :contentReference[oaicite:0]{index=0}

const prisma = new PrismaClient();
const dia = 24 * 60 * 60 * 1000; // Un día en ms

/**
 * Convierte "2025-05-05" → "5 de mayo del 2025"
 */
function formatSpanishDate(isoString) {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.toLocaleString('es-MX', { month: 'long' });
  const year = date.getFullYear();
  return `${day} de ${month} del ${year}`;
}

/**
 * "2025-05-05", "2025-05-07" → "5 de mayo del 2025 al 7 de mayo del 2025"
 */
function buildDateRange(startIso, endIso) {
  if (!startIso || !endIso) return '';
  return `${formatSpanishDate(startIso)} al ${formatSpanishDate(endIso)}`;
}

/**
 * Genera y dibuja el PDF para un usuario.
 * - Ajusta el tamaño y saltos de línea si el nombre es muy largo.
 * - Dibuja nombre, sede y rango de fechas.
 */
async function dataFill(user) {
  const { name, paternal_name, maternal_name, campus, role, start_date, end_date } = user;
  const templatePath = path.join(__dirname, `../../public/diplomas/${role}.pdf`);

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Plantilla no encontrada para el rol "${role}"`);
  }

  const existingPdfBytes = await fs.promises.readFile(templatePath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const page = pdfDoc.getPages()[0];
  const { width } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const grayColor = rgb(0.345, 0.345, 0.345);
  const purpleColor = rgb(0.635, 0.416, 0.678);

  // ----- 1) Nombre completo (adaptable) -----
  const fullName = `${name} ${paternal_name} ${maternal_name}`;
  const marginX = 100;
  const maxTextWidth = width - marginX * 2;
  const baseFontSize = 60;
  let fontSize = baseFontSize;
  let lines = [];

  const textWidthAtBase = font.widthOfTextAtSize(fullName, baseFontSize);
  if (textWidthAtBase <= maxTextWidth) {
    lines = [fullName];
  } else {
    const ratio = maxTextWidth / textWidthAtBase;
    const newSize = Math.floor(baseFontSize * ratio);
    const minSize = 30;

    if (newSize >= minSize) {
      fontSize = newSize;
      lines = [fullName];
    } else {
      fontSize = minSize;
      const words = fullName.split(' ');
      let line1 = '';
      let line2 = '';

      for (let i = 0; i < words.length; i++) {
        const test = line1 ? `${line1} ${words[i]}` : words[i];
        const w = font.widthOfTextAtSize(test, fontSize);
        if (w <= maxTextWidth) {
          line1 = test;
        } else {
          line2 = words.slice(i).join(' ');
          break;
        }
      }
      if (!line2) {
        const half = Math.ceil(words.length / 2);
        line1 = words.slice(0, half).join(' ');
        line2 = words.slice(half).join(' ');
      }
      lines = [line1, line2];
    }
  }

  const baseY = ['coordinadora de informes', 'coordinadora asociada'].includes(role)
    ? 308
    : 298;

  if (lines.length === 1) {
    const tw = font.widthOfTextAtSize(lines[0], fontSize);
    page.drawText(lines[0], {
      x: (width - tw) / 2 - 30,
      y: baseY,
      size: fontSize,
      font,
      color: purpleColor,
    });
  } else {
    const lineHeight = fontSize + 5;
    const tw1 = font.widthOfTextAtSize(lines[0], fontSize);
    page.drawText(lines[0], {
      x: (width - tw1) / 2 - 30,
      y: baseY + 2 + lineHeight / 2,
      size: fontSize,
      font,
      color: purpleColor,
    });
    const tw2 = font.widthOfTextAtSize(lines[1], fontSize);
    page.drawText(lines[1], {
      x: (width - tw2) / 2 - 30,
      y: baseY + 2 - lineHeight / 2,
      size: fontSize,
      font,
      color: purpleColor,
    });
  }

  // ----- 2) Dibujar SEDE -----
  if (campus) {
    page.drawText(campus, {
      x: (['coordinadora de informes', 'coordinadora asociada'].includes(role) ? 185 : 195),
      y: (['coordinadora de informes', 'coordinadora asociada'].includes(role) ? 232 : 222),
      size: 14,
      font,
      color: grayColor,
    });
  }

  // ----- 3) Dibujar rango de fechas (si no es superusuario) -----
  if (role !== 'superusuario') {
    let si = start_date;
    let ei = end_date;

    if (si && ['participante', 'staff', 'facilitadora', 'instructora', 'mentora'].includes(role)) {
      const d1 = new Date(si);
      d1.setTime(d1.getTime() + dia);
      si = d1.toISOString().split('T')[0];
    }
    if (ei && ['participante', 'staff', 'facilitadora', 'instructora', 'mentora'].includes(role)) {
      const d2 = new Date(ei);
      d2.setTime(d2.getTime() + dia);
      ei = d2.toISOString().split('T')[0];
    }

    const rangeText = buildDateRange(si, ei);
    if (rangeText) {
      page.drawText(rangeText, {
        x: (['coordinadora de informes', 'coordinadora asociada'].includes(role) ? 118 : 128),
        y: (['coordinadora de informes', 'coordinadora asociada'].includes(role) ? 215 : 205),
        size: 14,
        font,
        color: grayColor,
      });
    }
  }

  return pdfDoc;
}

/**
 * POST /api/diplomas/generate
 * Genera PDFs o ZIP a partir de un arreglo de usuarios.
 */
const generateDiplomas = async (req, res) => {
  const { users } = req.body;

  try {
    if (!Array.isArray(users) || users.length === 0) {
      return res
        .status(400)
        .json({ error: 'Debes enviar un arreglo "users" con al menos un elemento.' });
    }

    // Caso A: un solo usuario → PDF individual
    if (users.length === 1) {
      const user = users[0];
      let pdfDoc;
      try {
        pdfDoc = await dataFill(user);
      } catch (e) {
        console.error('Error en dataFill:', e);
        return res.status(404).json({ error: e.message });
      }
      const pdfBytes = await pdfDoc.save();
      const fileName = `${user.name} ${user.paternal_name}.pdf`;
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      return res.send(Buffer.from(pdfBytes));
    }

    // Caso B: varios usuarios → ZIP
    const zipPath = path.join(__dirname, '../../public/diplomas/diplomas.zip');
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip');
    archive.pipe(output);

    for (const user of users) {
      let pdfDoc;
      try {
        pdfDoc = await dataFill(user);
      } catch (e) {
        console.warn(`Omitiendo "${user.name} ${user.paternal_name}": ${e.message}`);
        continue;
      }
      const pdfBytes = await pdfDoc.save();
      const fileName = `${user.name} ${user.paternal_name}.pdf`;
      const carpeta = `${user.campus.charAt(0).toUpperCase() + user.campus.slice(1) || 'Comité Operativo'}/${user.role.charAt(0).toUpperCase() + user.role.slice(1) || 'Sin Rol'}/${fileName}`;
      archive.append(Buffer.from(pdfBytes), { name: carpeta });
    }

    output.on('close', () => {
      res.download(zipPath, 'diplomas.zip', () => {
        fs.unlink(zipPath, () => {});
      });
    });
    archive.on('error', (err) => {
      throw err;
    });
    await archive.finalize();
  } catch (error) {
    console.error('Error generando diplomas:', error);
    res.status(500).json({ error: 'Error al generar diplomas.' });
  }
};

// GET /api/diplomas/filtros
const getDiplomaFilters = async (req, res) => {
  const { user_id = '', user_role = '' } = req.query;
  try {
    let sedes = [], roles = [];
    if (user_role === 'superuser') {
      const todas = await prisma.venues.findMany({ select: { name: true } });
      sedes = todas.map(v => v.name);
      roles = [
        'participante','staff','facilitadora','instructora','mentora',
        'coordinadora asociada','coordinadora de sede','coordinadora de informes','superusuario'
      ];
    } else if (user_role === 'venue_coordinator') {
      const propias = await prisma.venues.findMany({
        where: { venue_coordinators: { some: { id_venue_coord: parseInt(user_id) } } },
        select: { name: true }
      });
      sedes = propias.map(v => v.name);
      roles = ['participante','staff','facilitadora','instructora','mentora'];
    }
    return res.json({ sedes, roles });
  } catch (error) {
    console.error('Error en getDiplomaFilters:', error);
    return res.status(500).json({ error: 'Error al cargar filtros.' });
  }
};

/**
 * POST /api/diplomas/email
 *
 * Envía por correo los diplomas de los usuarios seleccionados.
 * Body: {
 *   users: [ { id, name, paternal_name, campus, role, start_date, end_date, email } ],
 *   senderName: string,
 *   message: string
 * }
 */
const sendDiplomasByEmail = async (req, res) => {
  const { users, senderName, message, includeCopy } = req.body;
  const loggedEmail = req.user.email;

  try {
    if (!Array.isArray(users) || users.length === 0) {
      return res.status(400).json({ error: 'Debes enviar al menos un usuario.' });
    }
    if (!senderName) {
      return res.status(400).json({ error: 'Debe incluir nombre del remitente.' });
    }

    const results = [];

    for (const user of users) {
      if (!user.email) {
        results.push({ user, status: 'skipped', reason: 'Sin email' });
        continue;
      }

      // 1) Generar PDF
      let pdfDoc;
      try {
        pdfDoc = await dataFill(user);
      } catch (e) {
        console.warn(`Error generando PDF para ${user.name}: ${e.message}`);
        results.push({ user, status: 'error_pdf', reason: e.message });
        continue;
      }
      const pdfBytes = await pdfDoc.save();
      const filename = `${user.name} ${user.paternal_name}.pdf`;
      const attachment = {
        filename,
        content: Buffer.from(pdfBytes),
        contentType: 'application/pdf',
      };

      // 2) Enviar un email individual
      try {
        await sendEmail({
          to: user.email,
          cc: includeCopy ? loggedEmail : undefined,
          subject: '¡Felicidades por tu logro!',
          template: '/templates/usuarios/diplomas',  // ruta a diplomas.ejs
          data: {
            name: `${user.name} ${user.paternal_name}`,
            role: user.role,
            senderName,
            customMessage: message,
          },
          attachments: [attachment],
        });
        results.push({ user, status: 'sent' });
      } catch (emailErr) {
        console.error(`Error enviando diploma a ${user.email}:`, emailErr);
        results.push({ user, status: 'error_send', reason: emailErr.message });
      }
    }

    return res.json({
      ok: true,
      results,
    });
  } catch (err) {
    console.error('Error en sendDiplomasByEmail:', err);
    return res.status(500).json({ error: 'Error al enviar diplomas por correo.' });
  }
};

/**
 * GET /api/diplomas/users
 *
 * Devuelve solo registros con `status = 'Aprobada'`, salvo en superusuario.
 * Para superusuario, trae todos los superusers.
 */
// GET /api/diplomas/users
const getDiplomaUsers = async (req, res) => {
  const { search = '', sede = '', role = '', user_id = '', user_role = '' } = req.query;
  const hoy = new Date();
  const usuarios = [];

  // Búsqueda de texto
  const filtroTexto = {
    OR: [
      { name: { contains: search } },
      { paternal_name: { contains: search } },
      { maternal_name: { contains: search } },
    ]
  };

  try {
    // Si es coordinador de sede, obtengo su único id_venue
    let coordVenueId = null;
    if (user_role === 'venue_coordinator') {
      const coord = await prisma.venue_coordinators.findUnique({
        where: { id_venue_coord: parseInt(user_id) },
        select: { id_venue: true }
      });
      if (!coord) {
        return res.status(403).json({ error: 'Coordinador de sede no encontrado.' });
      }
      coordVenueId = coord.id_venue;
    }

    // Construyo el filtro de grupo único
    const groupFilter = user_role === 'venue_coordinator'
      ? {
          id_venue: coordVenueId,
          start_date: { lte: hoy }
        }
      : {
          start_date: { lte: hoy },
          ...(sede ? { venues: { name: sede } } : {})
        };

    // 1) PARTICIPANTES
    if (['superuser','venue_coordinator'].includes(user_role) &&
        (role === '' || role === 'participante')) {
      const participantes = await prisma.participants.findMany({
        where: {
          ...filtroTexto,
          status: 'Aprobada',
          groups: { is: groupFilter }
        },
        include: { groups: { include: { venues: true } } }
      });
      participantes.forEach(p =>
        usuarios.push({
          id: String(p.id_participant),
          name: p.name,
          paternal_name: p.paternal_name,
          maternal_name: p.maternal_name || '',
          campus: p.groups.venues.name,
          role: 'participante',
          start_date: p.groups.start_date.toISOString().split('T')[0],
          end_date: p.groups.end_date.toISOString().split('T')[0],
          email: p.email
        })
      );
    }

    // 2) COLABORADORAS (staff, facilitadora, instructora)
    if (['superuser','venue_coordinator'].includes(user_role) &&
        (role === '' || ['staff','facilitadora','instructora'].includes(role))) {
      const colaboradoras = await prisma.collaborators.findMany({
        where: {
          ...filtroTexto,
          status: 'Aprobada',
          ...(role && { preferred_role: role.charAt(0).toUpperCase() + role.slice(1) }),
          groups: { is: groupFilter }
        },
        include: { groups: { include: { venues: true } } }
      });
      colaboradoras.forEach(c =>
        usuarios.push({
          id: String(c.id_collaborator),
          name: c.name,
          paternal_name: c.paternal_name,
          maternal_name: c.maternal_name || '',
          campus: c.groups.venues.name,
          role: c.preferred_role.toLowerCase(),
          start_date: c.groups.start_date.toISOString().split('T')[0],
          end_date: c.groups.end_date.toISOString().split('T')[0],
          email: c.email
        })
      );
    }

// 3) MENTORAS
if (['superuser','venue_coordinator'].includes(user_role) &&
    (role === '' || role === 'mentora')) {

  const mentoras = await prisma.mentors.findMany({
    where: {
      ...filtroTexto,
      status: 'Aprobada',
      groups: { every: groupFilter }
    },
    include: {
      groups: {
        include: {
          venues: true
        }
      }
    }
  });

  mentoras.forEach(m => {
    const g = m.groups[0];
    if (!g) return;
    usuarios.push({
      id: String(m.id_mentor),
      name: m.name,
      paternal_name: m.paternal_name,
      maternal_name: m.maternal_name || '',
      campus: g.venues.name,
      role: 'mentora',
      start_date: g.start_date
        .toISOString()
        .split('T')[0],
      end_date: g.end_date
        .toISOString()
        .split('T')[0],
      email: m.email
    })
  });
}


    // ---------------- COORDINADORAS ASOCIADAS ----------------
    if (user_role === 'superuser' && (role === '' || role === 'coordinadora asociada')) {
      const asociadas = await prisma.assistant_coordinators.findMany({
        where: {
          ...filtroTexto,
          status: 'Aprobada', // solo "Aprobada"
          venues: sede ? { name: sede } : {},
        },
        include: { venues: true },
      });

      for (const a of asociadas) {
        const todos = await prisma.groups.findMany({
          where: { id_venue: a.id_venue },
        });

        let startIso = '';
        let endIso = '';
        if (todos.length > 0) {
          const tsI = todos.filter((g) => g.start_date).map((g) => g.start_date.getTime());
          const tsF = todos.filter((g) => g.end_date).map((g) => g.end_date.getTime());

          if (tsI.length > 0) {
            startIso = new Date(Math.min(...tsI)).toISOString().split('T')[0];
          }
          if (tsF.length > 0) {
            endIso = new Date(Math.max(...tsF)).toISOString().split('T')[0];
          }
        }

        usuarios.push({
          id: a.id_assistant_coord.toString(),
          name: a.name || '',
          paternal_name: a.paternal_name || '',
          maternal_name: a.maternal_name || '',
          campus: a.venues?.name || '',
          role: 'coordinadora asociada',
          start_date: startIso,
          end_date: endIso,
          email: a.email || '',
        });
      }
    }

    // ---------------- COORDINADORAS DE SEDE ----------------
    if (user_role === 'superuser' && (role === '' || role === 'coordinadora de sede')) {
      const sedesCoordinadoras = await prisma.venue_coordinators.findMany({
        where: {
          ...filtroTexto,
          status: 'Aprobada', // solo "Aprobada"
          venues: sede ? { name: sede } : {},
        },
        include: { venues: true },
      });

      for (const vc of sedesCoordinadoras) {
        const todos = await prisma.groups.findMany({
          where: { id_venue: vc.id_venue },
        });

        let startIso = '';
        let endIso = '';
        if (todos.length > 0) {
          const tsI = todos.filter((g) => g.start_date).map((g) => g.start_date.getTime());
          const tsF = todos.filter((g) => g.end_date).map((g) => g.end_date.getTime());

          if (tsI.length > 0) {
            startIso = new Date(Math.min(...tsI)).toISOString().split('T')[0];
          }
          if (tsF.length > 0) {
            endIso = new Date(Math.max(...tsF)).toISOString().split('T')[0];
          }
        }

        usuarios.push({
          id: vc.id_venue_coord.toString(),
          name: vc.name || '',
          paternal_name: vc.paternal_name || '',
                    maternal_name: vc.maternal_name || '',
          campus: vc.venues?.name || '',
          role: 'coordinadora de sede',
          start_date: startIso,
          end_date: endIso,
          email: vc.email || '',
        });
      }
    }

    // ---------------- COORDINADORAS DE INFORMES ----------------
    if (user_role === 'superuser' && (role === '' || role === 'coordinadora de informes')) {
      const informes = await prisma.assistant_coordinators.findMany({
        where: {
          ...filtroTexto,
          status: 'Aprobada',
          venues: sede ? { name: sede } : {},
        },
        include: { venues: true },
      });

      for (const c of informes) {
        const todos = await prisma.groups.findMany({
          where: { id_venue: c.id_venue },
        });

        let startIso = '';
        let endIso = '';
        if (todos.length > 0) {
          const tsI = todos.filter((g) => g.start_date).map((g) => g.start_date.getTime());
          const tsF = todos.filter((g) => g.end_date).map((g) => g.end_date.getTime());

          if (tsI.length > 0) {
            startIso = new Date(Math.min(...tsI)).toISOString().split('T')[0];
          }
          if (tsF.length > 0) {
            endIso = new Date(Math.max(...tsF)).toISOString().split('T')[0];
          }
        }

        usuarios.push({
          id: c.id_assistant_coord.toString(),
          name: c.name || '',
          paternal_name: c.paternal_name || '',
                    maternal_name: c.maternal_name || '',
          campus: c.venues?.name || '',
          role: 'coordinadora de informes',
          start_date: startIso,
          end_date: endIso,
          email: c.email || '',
        });
      }
    }

    // ---------------- SUPERUSUARIO ----------------
    if (user_role === 'superuser' && (role === '' || role === 'superusuario')) {
      // Jalar todos los superusers de la tabla
      const suList = await prisma.superusers.findMany();
      suList.forEach((su) =>
        usuarios.push({
          id: su.id_superuser.toString(),
          name: su.name || '',
          paternal_name: su.paternal_name || '',
                    maternal_name: su.maternal_name || '',
          campus: '',
          role: 'superusuario',
          start_date: '',
          end_date: '',
          email: su.email || '',
        })
      );
    }

    return res.json(usuarios);
  } catch (err) {
    console.error('Error en getDiplomaUsers:', err);
    return res.status(500).json({ error: 'Error al obtener usuarios para diplomas.' });
  }
};

module.exports = {
  generateDiplomas,
  getDiplomaUsers,
  getDiplomaFilters,
  sendDiplomasByEmail,
};