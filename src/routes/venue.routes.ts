import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import venueController from '../controllers/venue.controller';
import { validateVenue } from '../validators/venueValidator';
import { authMiddleware, roleMiddleware } from '../middlewares/authMiddleware';

// Configure multer to store files on disk
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save files to uploads/tmp directory
    cb(null, path.join(__dirname, '..', 'uploads', 'tmp'));
  },
  filename: (req, file, cb) => {
    // Generate unique filename with appropriate extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = file.fieldname === 'participation_file' ? '.pdf' : '.jpg';
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'participation_file' && file.mimetype !== 'application/pdf') {
      return cb(new Error('El archivo de participación debe ser un PDF'));
    }
    if (
      (file.fieldname === 'logo' || file.fieldname === 'venueCoordinator.profileImage') &&
      !file.mimetype.startsWith('image/')
    ) {
      return cb(new Error('Los archivos de logo y foto de perfil deben ser imágenes'));
    }
    cb(null, true);
  },
});

function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
const router = express.Router();

// Routes
router.get('/', venueController.getAll);
//router.get('/:id/pdf', asyncHandler(authMiddleware), venueController.getVenuePDF);
router.post(
  '/',
  upload.fields([
    { name: 'participation_file', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
    { name: 'venueCoordinator.profileImage', maxCount: 1 },
  ]),
  validateVenue,
  venueController.create,
);
router.get('/specific', asyncHandler(authMiddleware), venueController.getSpecificData); // Nueva ruta para obtener solo los datos específicos
router.get('/:id', asyncHandler(authMiddleware), venueController.getById);
router.put(
  '/:id',
  upload.fields([
    { name: 'participation_file', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
  ]),
  asyncHandler(authMiddleware),
  roleMiddleware(['admin']),
  validateVenue,
  venueController.update,
);
router.put(
  '/basic/:id',
  asyncHandler(authMiddleware),
  roleMiddleware(['admin', 'superuser']),
  venueController.updateBasic, // Nueva ruta para actualización básica
);
router.delete('/:id', asyncHandler(authMiddleware), roleMiddleware(['admin']), venueController.remove);
router.post('/:id/cancel', asyncHandler(authMiddleware), roleMiddleware(['admin']), venueController.cancelVenue);

// Serve files from uploads/tmp
router.get('/files/:filename', asyncHandler(authMiddleware), (req, res) => {
  const { filename } = req.params;
  const { download } = req.query; // Check for download query parameter
  const filePath = path.join(__dirname, '..', 'Uploads', 'tmp', filename);

  // Check if file exists
  fs.access(filePath)
    .then(() => {
      // Set appropriate headers
      const ext = path.extname(filename).toLowerCase();
      const contentType = ext === '.pdf' ? 'application/pdf' : 'image/jpeg';
      res.setHeader('Content-Type', contentType);
      // Use 'attachment' for download, 'inline' for preview
      res.setHeader(
        'Content-Disposition',
        download === 'true'
          ? `attachment; filename="${filename}"`
          : `inline; filename="${filename}"`,
      );

      // Serve the file
      res.sendFile(filePath);
    })
    .catch(() => {
      res.status(404).json({ message: 'Archivo no encontrado' });
    });
});

// Cancelar una sede
router.patch(
  '/:id/cancelar',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser']),
  venueController.cancelarVenue,
);

router.get('/:id/pdf', asyncHandler(authMiddleware), venueController.getVenuePDF);

router.get(
  '/:id/groups',
  asyncHandler(async (req: Request, res: Response) => {
    const id_venue = parseInt(req.params.id, 10);
    if (isNaN(id_venue)) {
      return res.status(400).json({ message: 'ID de sede inválido' });
    }
    const groups = await prisma.groups.findMany({
      where: { id_venue },
      select: {
        id_group: true,
        name: true,
        location: true,
        language: true,
        level: true,
        mode: true,
        start_date: true,
        end_date: true,
        start_hour: true,
        end_hour: true,
        max_places: true,
        occupied_places: true,
        status: true,
      },
    });
    res.json(groups);
  }),
);

router.patch('/:id/approve', asyncHandler(authMiddleware), venueController.approveVenue);
router.patch(
  '/:id/reject',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser', 'venue_coordinator']),
  venueController.rejectVenue,
);

export default router;
