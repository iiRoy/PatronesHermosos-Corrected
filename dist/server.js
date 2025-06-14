'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
// src/server.ts
const dotenv_1 = __importDefault(require('dotenv'));
dotenv_1.default.config();
const express_1 = __importDefault(require('express'));
const morgan_1 = __importDefault(require('morgan'));
const next_1 = __importDefault(require('next'));
const path_1 = __importDefault(require('path'));
const logRequestMiddleware_1 = require('./middlewares/logRequestMiddleware');
const auth_routes_1 = __importDefault(require('./routes/auth.routes'));
const venue_routes_1 = __importDefault(require('./routes/venue.routes'));
const participants_routes_1 = __importDefault(require('./routes/participants.routes'));
const superuser_routes_1 = __importDefault(require('./routes/superuser.routes'));
const collaborator_routes_1 = __importDefault(require('./routes/collaborator.routes'));
const data_routes_1 = __importDefault(require('./routes/data.routes'));
const status_routes_1 = __importDefault(require('./routes/status.routes'));
const venueCoordinator_routes_1 = __importDefault(require('./routes/venueCoordinator.routes'));
const mentor_routes_1 = __importDefault(require('./routes/mentor.routes'));
const diploma_routes_1 = __importDefault(require('./routes/diploma.routes'));
const groups_routes_1 = __importDefault(require('./routes/groups.routes'));
const registrations_routes_1 = __importDefault(require('./routes/registrations.routes'));
const auditLog_routes_1 = __importDefault(require('./routes/auditLog.routes'));
//import emailRoutes from './routes/email.routes';
const dev = process.env.NODE_ENV !== 'production';
const appNext = (0, next_1.default)({ dev, dir: path_1.default.join(__dirname, '..') });
const handle = appNext.getRequestHandler();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const node_cron_1 = __importDefault(require('node-cron'));
const fs_1 = require('fs');
const cleanupTmpFiles = async () => {
  const tmpDir = path_1.default.join(__dirname, 'uploads', 'tmp');
  await fs_1.promises.mkdir(tmpDir, { recursive: true });
  const files = await fs_1.promises.readdir(tmpDir);
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  for (const file of files) {
    const filePath = path_1.default.join(tmpDir, file);
    const stats = await fs_1.promises.stat(filePath);
    if (now - stats.mtimeMs > maxAge) {
      await fs_1.promises.unlink(filePath);
      console.log(`Deleted old file: ${file}`);
    }
  }
};
// Run cleanup every hour
node_cron_1.default.schedule('0 * * * *', cleanupTmpFiles);
// Run once on startup
cleanupTmpFiles();
appNext.prepare().then(() => {
  // Middlewares globales
  app.set('trust proxy', 1);
  app.use(express_1.default.json({ limit: '50mb' })); // Increase JSON payload limit
  app.use(express_1.default.urlencoded({ limit: '50mb', extended: true })); // Optional: for form-urlencoded data
  app.use((0, morgan_1.default)('dev'));
  app.use(logRequestMiddleware_1.logRequestMiddleware);
  // Rutas backend
  app.use('/api/auth', auth_routes_1.default);
  app.use('/api/venues', venue_routes_1.default);
  app.use('/api/participants', participants_routes_1.default);
  app.use('/api/diplomas', diploma_routes_1.default);
  app.use('/api/superusers', superuser_routes_1.default);
  app.use('/api/data', data_routes_1.default);
  app.use('/api/collaborators', collaborator_routes_1.default);
  app.use('/api/status', status_routes_1.default);
  app.use('/api/venue-coordinators', venueCoordinator_routes_1.default);
  app.use('/api/mentors', mentor_routes_1.default);
  app.use('/api/groups', groups_routes_1.default);
  app.use('/api/registrations', registrations_routes_1.default);
  app.use('/api/audit-logs', auditLog_routes_1.default);
  //app.use('/api/emails', emailRoutes);
  app.get('/api', (_req, res) => {
    res.send('¡API corriendo!');
  });
  // Todas las demás rutas serán manejadas por Next.js
  app.use(async (req, res) => {
    try {
      return await handle(req, res);
    } catch (err) {
      console.error('Error al manejar la ruta en Next.js:', err);
      res.status(500).send('Error interno al manejar la ruta.');
    }
  });
  app.listen(PORT, () => {
    console.log(`Servidor combinado corriendo en http://localhost:${PORT}`);
  });
});
