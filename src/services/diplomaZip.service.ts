import archiver from 'archiver';
import { PrismaClient } from '@prisma/client';
import stream from 'stream';
import { dataFill } from '../controllers/diploma.controller.js';

const prisma = new PrismaClient();

export async function generateAllDiplomasZip(): Promise<Buffer> {
  // const hoy = new Date(); // Variable not used, removed to avoid warning
  const usuarios: any[] = [];

  // PARTICIPANTES
  const participantes = await prisma.participants.findMany({
    where: { status: 'Aprobada' },
    include: { groups: { include: { venues: true } } },
  });
  participantes.forEach((p: any) => {
    // groups puede ser null o undefined, o un objeto (por modelo)
    const grupo = p.groups;
    if (!grupo || !grupo.venues) return;
    usuarios.push({
      id: String(p.id_participant),
      name: p.name,
      paternal_name: p.paternal_name,
      maternal_name: p.maternal_name || '',
      campus: grupo.venues.name || '',
      role: 'participante',
      start_date: grupo.start_date ? grupo.start_date.toISOString().split('T')[0] : '',
      end_date: grupo.end_date ? grupo.end_date.toISOString().split('T')[0] : '',
      email: p.email,
    });
  });

  // COLABORADORAS (staff, facilitadora, instructora)
  const colaboradoras = await prisma.collaborators.findMany({
    where: { status: 'Aprobada' },
    include: { groups: { include: { venues: true } } },
  });
  colaboradoras.forEach((c: any) => {
    const grupo = c.groups;
    if (!grupo || !grupo.venues) return;
    const role = c.preferred_role ? c.preferred_role.toLowerCase() : (c.role || '').toLowerCase();
    usuarios.push({
      id: String(c.id_collaborator),
      name: c.name,
      paternal_name: c.paternal_name,
      maternal_name: c.maternal_name || '',
      campus: grupo.venues.name || '',
      role,
      start_date: grupo.start_date ? grupo.start_date.toISOString().split('T')[0] : '',
      end_date: grupo.end_date ? grupo.end_date.toISOString().split('T')[0] : '',
      email: c.email,
    });
  });

  // MENTORAS
  const mentoras = await prisma.mentors.findMany({
    where: { status: 'Aprobada' },
    include: { groups: { include: { venues: true } } },
  });
  mentoras.forEach((m: any) => {
    const grupo = Array.isArray(m.groups) ? m.groups[0] : m.groups;
    if (!grupo || !grupo.venues) return;
    usuarios.push({
      id: String(m.id_mentor),
      name: m.name,
      paternal_name: m.paternal_name,
      maternal_name: m.maternal_name || '',
      campus: grupo.venues.name || '',
      role: 'mentora',
      start_date: grupo.start_date ? grupo.start_date.toISOString().split('T')[0] : '',
      end_date: grupo.end_date ? grupo.end_date.toISOString().split('T')[0] : '',
      email: m.email,
    });
  });

  // COORDINADORAS ASOCIADAS
  const asociadas = await prisma.assistant_coordinators.findMany({
    where: { status: 'Aprobada' },
    include: { venues: true },
  });
  for (const a of asociadas) {
    if (!a.venues) continue;
    const todos = await prisma.groups.findMany({ where: { id_venue: a.id_venue } });
    let startIso = '';
    let endIso = '';
    if (todos.length > 0) {
      const tsI = todos.filter((g: any) => g.start_date).map((g: any) => g.start_date.getTime());
      const tsF = todos.filter((g: any) => g.end_date).map((g: any) => g.end_date.getTime());
      if (tsI.length > 0) startIso = new Date(Math.min(...tsI)).toISOString().split('T')[0];
      if (tsF.length > 0) endIso = new Date(Math.max(...tsF)).toISOString().split('T')[0];
    }
    usuarios.push({
      id: a.id_assistant_coord.toString(),
      name: a.name || '',
      paternal_name: a.paternal_name || '',
      maternal_name: a.maternal_name || '',
      campus: a.venues.name || '',
      role: 'coordinadora asociada',
      start_date: startIso,
      end_date: endIso,
      email: a.email || '',
    });
  }

  // COORDINADORAS DE SEDE
  const sedesCoordinadoras = await prisma.venue_coordinators.findMany({
    where: { status: 'Aprobada' },
    include: { venues: true },
  });
  for (const vc of sedesCoordinadoras) {
    if (!vc.venues) continue;
    const todos = await prisma.groups.findMany({ where: { id_venue: vc.id_venue } });
    let startIso = '';
    let endIso = '';
    if (todos.length > 0) {
      const tsI = todos.filter((g: any) => g.start_date).map((g: any) => g.start_date.getTime());
      const tsF = todos.filter((g: any) => g.end_date).map((g: any) => g.end_date.getTime());
      if (tsI.length > 0) startIso = new Date(Math.min(...tsI)).toISOString().split('T')[0];
      if (tsF.length > 0) endIso = new Date(Math.max(...tsF)).toISOString().split('T')[0];
    }
    usuarios.push({
      id: vc.id_venue_coord.toString(),
      name: vc.name || '',
      paternal_name: vc.paternal_name || '',
      maternal_name: vc.maternal_name || '',
      campus: vc.venues.name || '',
      role: 'coordinadora de sede',
      start_date: startIso,
      end_date: endIso,
      email: vc.email || '',
    });
  }

  // COORDINADORAS DE INFORMES
  const informes = await prisma.assistant_coordinators.findMany({
    where: { status: 'Aprobada' },
    include: { venues: true },
  });
  for (const c of informes) {
    if (!c.venues) continue;
    const todos = await prisma.groups.findMany({ where: { id_venue: c.id_venue } });
    let startIso = '';
    let endIso = '';
    if (todos.length > 0) {
      const tsI = todos.filter((g: any) => g.start_date).map((g: any) => g.start_date.getTime());
      const tsF = todos.filter((g: any) => g.end_date).map((g: any) => g.end_date.getTime());
      if (tsI.length > 0) startIso = new Date(Math.min(...tsI)).toISOString().split('T')[0];
      if (tsF.length > 0) endIso = new Date(Math.max(...tsF)).toISOString().split('T')[0];
    }
    usuarios.push({
      id: c.id_assistant_coord.toString(),
      name: c.name || '',
      paternal_name: c.paternal_name || '',
      maternal_name: c.maternal_name || '',
      campus: c.venues.name || '',
      role: 'coordinadora de informes',
      start_date: startIso,
      end_date: endIso,
      email: c.email || '',
    });
  }

  // SUPERUSUARIOS
  const suList = await prisma.superusers.findMany();
  suList.forEach((su: any) =>
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
    }),
  );

  // 2. Generar PDFs usando la función dataFill del controlador
  const archive = archiver('zip', { zlib: { level: 9 } });
  const pass = new stream.PassThrough();
  const chunks: Buffer[] = [];

  pass.on('data', (chunk) => chunks.push(chunk));
  archive.pipe(pass);

  let added = 0;
  for (const user of usuarios) {
    try {
      // Verifica que exista la plantilla PDF para el rol
      const pdfDoc = await dataFill(user);
      const pdfBytes = await pdfDoc.save();
      const fileName = `${user.name} ${user.paternal_name}.pdf`;
      const carpeta = `${
        user.campus?.charAt(0)?.toUpperCase() + (user.campus?.slice(1) || 'Comité Operativo')
      }/${user.role?.charAt(0)?.toUpperCase() + (user.role?.slice(1) || 'Sin Rol')}/${fileName}`;
      archive.append(Buffer.from(pdfBytes), { name: carpeta });
      added++;
      console.log(`[ZIP] Diploma agregado: ${carpeta}`);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(
          `[ZIP] Error generando diploma para ${user.name} ${user.paternal_name}:`,
          e.message,
        );
      } else {
        console.error(`[ZIP] Error generando diploma para ${user.name} ${user.paternal_name}:`, e);
      }
      continue;
    }
  }

  if (added === 0) {
    archive.append('No se generó ningún diploma.', { name: 'README.txt' });
    console.warn('[ZIP] No se generó ningún diploma. Se agregó README.txt');
  }
  await new Promise<void>((resolve, reject) => {
    pass.on('finish', () => {
      console.log('[ZIP] Stream terminado correctamente.');
      resolve();
    });
    pass.on('error', (err: unknown) => {
      console.error('[ZIP] Error en el stream:', err);
      reject(err);
    });
    archive.on('error', (err: unknown) => {
      console.error('[ZIP] Error en archiver:', err);
      reject(err);
    });
    archive.finalize();
  });

  return Buffer.concat(chunks);
}
