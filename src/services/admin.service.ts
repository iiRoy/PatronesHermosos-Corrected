import { Request, Response } from 'express';
import archiver from 'archiver';
import { PrismaClient } from '@prisma/client';
import { exportDatabaseToExcel } from './exportExcel.service';
import { generateAllDiplomasZip } from './diplomaZip.service';
import { resetDatabaseExceptProtected } from './resetDb.service';

const prisma = new PrismaClient();

// Handler para respaldo (Excel + diplomas en ZIP)
export const backupHandler = async (req: Request, res: Response) => {
  try {
    // 1. Generar Excel de la base de datos
    const excelBuffer = await exportDatabaseToExcel();

    // 2. Generar ZIP de diplomas (PDFs)
    const diplomasZipBuffer = await generateAllDiplomasZip();

    // 3. Crear un ZIP con ambos archivos
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=respaldo.zip');

    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.on('error', (err) => {
      throw err;
    });
    archive.pipe(res);

    archive.append(excelBuffer, { name: 'base_de_datos.xlsx' });
    archive.append(diplomasZipBuffer, { name: 'diplomas.zip' });

    await archive.finalize();
  } catch (err) {
    res.status(500).json({ error: 'Error generando respaldo', details: (err as Error).message });
  }
};

// Handler para restablecer la base de datos
export const resetDbHandler = async (req: Request, res: Response) => {
  try {
    await resetDatabaseExceptProtected();
    res.status(200).json({ message: 'Base de datos reestablecida correctamente' });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Error al reestablecer la base de datos', details: (err as Error).message });
  }
};
