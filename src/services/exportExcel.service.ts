import ExcelJS from 'exceljs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function exportDatabaseToExcel(): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();

  // Lista de tablas a exportar (excluye protegidas)
  const tables = [
    'venues',
    'venue_coordinators',
    'assistant_coordinators',
    'collaborators',
    'mentors',
    'groups',
    'participants',
    'tutors',
    // Agrega más tablas según tu modelo
  ];

  for (const table of tables) {
    // @ts-ignore
    const data = await prisma[table].findMany();
    const worksheet = workbook.addWorksheet(table);

    if (data.length > 0) {
      worksheet.columns = Object.keys(data[0]).map((key) => ({ header: key, key }));
      data.forEach((row: Record<string, any>) => worksheet.addRow(row));
    }
  }

  const arrayBuffer = await workbook.xlsx.writeBuffer();
  // Convert ArrayBuffer to Node.js Buffer
  return Buffer.from(arrayBuffer);
}
