'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.exportDatabaseToExcel = exportDatabaseToExcel;
const exceljs_1 = __importDefault(require('exceljs'));
const client_1 = require('@prisma/client');
const prisma = new client_1.PrismaClient();
async function exportDatabaseToExcel() {
  const workbook = new exceljs_1.default.Workbook();
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
      data.forEach((row) => worksheet.addRow(row));
    }
  }
  const arrayBuffer = await workbook.xlsx.writeBuffer();
  // Convert ArrayBuffer to Node.js Buffer
  return Buffer.from(arrayBuffer);
}
