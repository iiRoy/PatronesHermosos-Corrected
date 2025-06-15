'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.resetDbHandler = exports.backupHandler = void 0;
const archiver_1 = __importDefault(require('archiver'));
const client_1 = require('@prisma/client');
const exportExcel_service_1 = require('./exportExcel.service');
const diplomaZip_service_1 = require('./diplomaZip.service');
const resetDb_service_1 = require('./resetDb.service');
const prisma = new client_1.PrismaClient();
// Handler para respaldo (Excel + diplomas en ZIP)
const backupHandler = async (req, res) => {
  try {
    // 1. Generar Excel de la base de datos
    const excelBuffer = await (0, exportExcel_service_1.exportDatabaseToExcel)();
    // 2. Generar ZIP de diplomas (PDFs)
    const diplomasZipBuffer = await (0, diplomaZip_service_1.generateAllDiplomasZip)();
    // 3. Crear un ZIP con ambos archivos
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=respaldo.zip');
    const archive = (0, archiver_1.default)('zip', { zlib: { level: 9 } });
    archive.on('error', (err) => {
      throw err;
    });
    archive.pipe(res);
    archive.append(excelBuffer, { name: 'base_de_datos.xlsx' });
    archive.append(diplomasZipBuffer, { name: 'diplomas.zip' });
    await archive.finalize();
  } catch (err) {
    res.status(500).json({ error: 'Error generando respaldo', details: err.message });
  }
};
exports.backupHandler = backupHandler;
// Handler para restablecer la base de datos
const resetDbHandler = async (req, res) => {
  try {
    await (0, resetDb_service_1.resetDatabaseExceptProtected)();
    res.status(200).json({ message: 'Base de datos reestablecida correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al reestablecer la base de datos', details: err.message });
  }
};
exports.resetDbHandler = resetDbHandler;
