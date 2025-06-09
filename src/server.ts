// src/server.ts
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import next from 'next';
import path from 'path';

import { logRequestMiddleware } from './middlewares/logRequestMiddleware';
import authRoutes from './routes/auth.routes';
import venueRoutes from './routes/venue.routes';
import participantsRoutes from './routes/participants.routes';
import superuserRoutes from './routes/superuser.routes';
import collaboratorRoutes from './routes/collaborator.routes';
import dataRoutes from './routes/data.routes';
import statusRoutes from './routes/status.routes';
import venueCoordinatorRoutes from './routes/venueCoordinator.routes';
import mentorRoutes from './routes/mentor.routes';
import diplomaRoutes from './routes/diploma.routes';
import groupRoutes from './routes/groups.routes';
import registrationRoutes from './routes/registrations.routes';
import auditLogRoutes from './routes/auditLog.routes';
//import emailRoutes from './routes/email.routes';

const dev = process.env.NODE_ENV !== 'production';
const appNext = next({ dev, dir: path.join(__dirname, '..') });
const handle = appNext.getRequestHandler();

const app = express();
const PORT = process.env.PORT || 3000;

import cron from 'node-cron';
import { promises as fs } from 'fs';

const cleanupTmpFiles = async () => {
  const tmpDir = path.join(__dirname, 'uploads', 'tmp');
  await fs.mkdir(tmpDir, { recursive: true });
  const files = await fs.readdir(tmpDir);
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  for (const file of files) {
    const filePath = path.join(tmpDir, file);
    const stats = await fs.stat(filePath);
    if (now - stats.mtimeMs > maxAge) {
      await fs.unlink(filePath);
      console.log(`Deleted old file: ${file}`);
    }
  }
};

// Run cleanup every hour
cron.schedule('0 * * * *', cleanupTmpFiles);

// Run once on startup
cleanupTmpFiles();

appNext.prepare().then(() => {
  // Middlewares globales
  app.set('trust proxy', 1);
  app.use(express.json({ limit: '50mb' })); // Increase JSON payload limit
  app.use(express.urlencoded({ limit: '50mb', extended: true })); // Optional: for form-urlencoded data
  app.use(morgan('dev'));
  app.use(logRequestMiddleware);

  // Rutas backend
  app.use('/api/auth', authRoutes);
  app.use('/api/venues', venueRoutes);
  app.use('/api/participants', participantsRoutes);
  app.use('/api/diplomas', diplomaRoutes);
  app.use('/api/superusers', superuserRoutes);
  app.use('/api/data', dataRoutes);
  app.use('/api/collaborators', collaboratorRoutes);
  app.use('/api/status', statusRoutes);
  app.use('/api/venue-coordinators', venueCoordinatorRoutes);
  app.use('/api/mentors', mentorRoutes);
  app.use('/api/groups', groupRoutes);
  app.use('/api/registrations', registrationRoutes);
  app.use('/api/audit-logs', auditLogRoutes);
  //app.use('/api/emails', emailRoutes);

  app.get('/api', (_req: express.Request, res: express.Response) => {
    res.send('¡API corriendo!');
  });

  // Todas las demás rutas serán manejadas por Next.js
  app.use(async (req: express.Request, res: express.Response) => {
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
