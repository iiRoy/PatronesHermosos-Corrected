'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const multer_1 = __importDefault(require('multer'));
const path_1 = __importDefault(require('path'));
const promises_1 = __importDefault(require('fs/promises'));
const client_1 = require('@prisma/client');
const prisma = new client_1.PrismaClient();
const venue_controller_1 = __importDefault(require('../controllers/venue.controller'));
const venueValidator_1 = require('../validators/venueValidator');
const authMiddleware_1 = require('../middlewares/authMiddleware');
// Configure multer to store files on disk
const storage = multer_1.default.diskStorage({
  destination: (req, file, cb) => {
    // Save files to uploads/tmp directory
    cb(null, path_1.default.join(__dirname, '..', 'uploads', 'tmp'));
  },
  filename: (req, file, cb) => {
    // Generate unique filename with appropriate extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = file.fieldname === 'participation_file' ? '.pdf' : '.jpg';
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});
const upload = (0, multer_1.default)({
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
function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
const router = express_1.default.Router();
// Routes
router.get('/', venue_controller_1.default.getAll);
//router.get('/:id/pdf', asyncHandler(authMiddleware), venueController.getVenuePDF);
router.post(
  '/',
  upload.fields([
    { name: 'participation_file', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
    { name: 'venueCoordinator.profileImage', maxCount: 1 },
  ]),
  venueValidator_1.validateVenue,
  venue_controller_1.default.create,
);
router.get(
  '/specific',
  asyncHandler(authMiddleware_1.authMiddleware),
  venue_controller_1.default.getSpecificData,
); // Nueva ruta para obtener solo los datos específicos
router.get(
  '/:id',
  asyncHandler(authMiddleware_1.authMiddleware),
  venue_controller_1.default.getById,
);
router.put(
  '/:id',
  upload.fields([
    { name: 'participation_file', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
  ]),
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['admin']),
  venueValidator_1.validateVenue,
  venue_controller_1.default.update,
);
router.put(
  '/basic/:id',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['admin', 'superuser']),
  venue_controller_1.default.updateBasic,
);
router.delete(
  '/:id',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['admin']),
  venue_controller_1.default.remove,
);
router.post(
  '/:id/cancel',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['admin']),
  venue_controller_1.default.cancelVenue,
);
// Serve files from uploads/tmp
router.get('/files/:filename', asyncHandler(authMiddleware_1.authMiddleware), (req, res) => {
  const { filename } = req.params;
  const { download } = req.query; // Check for download query parameter
  const filePath = path_1.default.join(__dirname, '..', 'Uploads', 'tmp', filename);
  // Check if file exists
  promises_1.default
    .access(filePath)
    .then(() => {
      // Set appropriate headers
      const ext = path_1.default.extname(filename).toLowerCase();
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
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['superuser']),
  venue_controller_1.default.cancelarVenue,
);
router.get(
  '/:id/pdf',
  asyncHandler(authMiddleware_1.authMiddleware),
  venue_controller_1.default.getVenuePDF,
);
router.get(
  '/:id/groups',
  asyncHandler(async (req, res) => {
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
router.patch(
  '/:id/approve',
  asyncHandler(authMiddleware_1.authMiddleware),
  venue_controller_1.default.approveVenue,
);
router.patch(
  '/:id/reject',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['superuser', 'venue_coordinator']),
  venue_controller_1.default.rejectVenue,
);
exports.default = router;
