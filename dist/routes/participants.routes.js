'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== 'default') __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const multer_1 = __importDefault(require('multer'));
const path_1 = __importDefault(require('path'));
const promises_1 = __importDefault(require('fs/promises')); // Add fs for file serving
const participants_controller_1 = __importStar(require('../controllers/participants.controller'));
const participantsValidator_1 = require('../validators/participantsValidator');
const authMiddleware_1 = require('../middlewares/authMiddleware');
const storage = multer_1.default.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path_1.default.join(__dirname, '..', 'uploads', 'tmp'));
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `participation_file-${uniqueSuffix}.pdf`);
  },
});
const upload = (0, multer_1.default)({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'participation_file' && file.mimetype !== 'application/pdf') {
      return cb(new Error('El archivo de participación debe ser un PDF'));
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
router.get(
  '/',
  asyncHandler(authMiddleware_1.authMiddleware),
  participants_controller_1.default.getAllParticipants,
);
router.post(
  '/',
  upload.fields([{ name: 'participation_file', maxCount: 1 }]),
  participantsValidator_1.validateParticipant,
  participants_controller_1.default.createParticipant,
);
router.get(
  '/:id',
  asyncHandler(authMiddleware_1.authMiddleware),
  participants_controller_1.default.getParticipantById,
);
router.get(
  '/table',
  asyncHandler(authMiddleware_1.authMiddleware),
  participants_controller_1.default.getParticipantsTable,
);
router.get(
  '/:participantId/available-groups',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['superuser', 'venue_coordinator']),
  participants_controller_1.default.getAvailableGroups,
);
router.patch(
  '/:participantId/approve',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['superuser', 'venue_coordinator']),
  participants_controller_1.default.approveParticipant,
);
router.put(
  '/:id',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['superuser', 'venue_coordinator']),
  participants_controller_1.default.updateParticipant,
);
router.put(
  '/:id/basic-info',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['superuser', 'venue_coordinator']),
  participants_controller_1.default.updateParticipantBasicInfo,
);
router.delete(
  '/:id',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['superuser', 'venue_coordinator']),
  participants_controller_1.default.deleteParticipant,
);
router.patch(
  '/:id/status',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['superuser', 'venue_coordinator']),
  participants_controller_1.default.changeParticipantStatus,
);
// Serve files from uploads/tmp
router.get('/files/:filename', async (req, res) => {
  const { filename } = req.params;
  const filePath = path_1.default.join(__dirname, '..', 'uploads', 'tmp', filename);
  try {
    // Check if file exists
    await promises_1.default.access(filePath);
    // Set appropriate headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    // Serve the file
    res.sendFile(filePath);
  } catch (error) {
    res.status(404).json({ message: 'Archivo no encontrado' });
  }
});
router.get(
  '/:id/pdf',
  asyncHandler(authMiddleware_1.authMiddleware),
  participants_controller_1.default.getParticipantPDF,
);
router.post(
  '/:id/send-email',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['superuser', 'venue_coordinator']),
  participants_controller_1.sendCustomEmailToParticipant,
);
router.patch(
  '/:id/reject',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['venue_coordinator', 'superuser']),
  participants_controller_1.default.rejectParticipant,
);
module.exports = router;
exports.default = router;
