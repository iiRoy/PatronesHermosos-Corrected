// src/routes/venue.routes.js
const express = require('express');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const venueController = require('../controllers/venue.controller');
const { validateVenue } = require('../validators/venueValidator');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Configure rate limiter: max 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Demasiadas solicitudes desde esta IP, por favor intenta de nuevo después de 15 minutos.',
});

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'participation_file' && file.mimetype !== 'application/pdf') {
      return cb(new Error('El archivo de participación debe ser un PDF'));
    }
    if (
      (file.fieldname === 'logo' || file.fieldname === 'generalCoordinator.profileImage') &&
      !file.mimetype.startsWith('image/')
    ) {
      return cb(new Error('Los archivos de logo y foto de perfil deben ser imágenes'));
    }
    cb(null, true);
  },
});

// Routes
router.get('/', authMiddleware, venueController.getAll);
router.post(
  '/',
  limiter, // Apply rate limiting
  upload.fields([
    { name: 'participation_file', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
    { name: 'generalCoordinator.profileImage', maxCount: 1 },
  ]),
  validateVenue,
  venueController.create
);
router.get('/:id', authMiddleware, venueController.getById);
router.put(
  '/:id',
  upload.fields([
    { name: 'participation_file', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
  ]),
  authMiddleware,
  roleMiddleware(['admin']),
  validateVenue,
  venueController.update
);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), venueController.remove);

module.exports = router;