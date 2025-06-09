import express, { Request, Response } from 'express';
import multer from 'multer';
import * as multerTypes from 'multer';
import path from 'path';
import fs from 'fs/promises'; // Add fs for file serving
import participantsController, { sendCustomEmailToParticipant } from '../controllers/participants.controller';
import { validateParticipant } from '../validators/participantsValidator';
import { authMiddleware, roleMiddleware } from '../middlewares/authMiddleware';

const storage = multer.diskStorage({
  destination: (_req: express.Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, path.join(__dirname, '..', 'uploads', 'tmp'));
  },
  filename: (_req: express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `participation_file-${uniqueSuffix}.pdf`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'participation_file' && file.mimetype !== 'application/pdf') {
      return cb(new Error('El archivo de participación debe ser un PDF'));
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

router.get('/', asyncHandler(authMiddleware), participantsController.getAllParticipants);
router.post(
  '/',
  upload.fields([{ name: 'participation_file', maxCount: 1 }]),
  validateParticipant,
  participantsController.createParticipant,
);
router.get('/:id', asyncHandler(authMiddleware), participantsController.getParticipantById);
router.get('/table', asyncHandler(authMiddleware), participantsController.getParticipantsTable);
router.get(
  '/:participantId/available-groups',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser', 'venue_coordinator']),
  participantsController.getAvailableGroups,
);
router.patch(
  '/:participantId/approve',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser', 'venue_coordinator']),
  participantsController.approveParticipant,
);

router.put(
  '/:id',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser', 'venue_coordinator']),
  participantsController.updateParticipant,
);
router.put(
  '/:id/basic-info',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser', 'venue_coordinator']),
  participantsController.updateParticipantBasicInfo,
);
router.delete(
  '/:id',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser', 'venue_coordinator']),
  participantsController.deleteParticipant,
);
router.patch(
  '/:id/status',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser', 'venue_coordinator']),
  participantsController.changeParticipantStatus,
);

// Serve files from uploads/tmp
router.get('/files/:filename', async (req: Request, res: Response) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '..', 'uploads', 'tmp', filename);

  try {
    // Check if file exists
    await fs.access(filePath);
    // Set appropriate headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    // Serve the file
    res.sendFile(filePath);
  } catch (error) {
    res.status(404).json({ message: 'Archivo no encontrado' });
  }
});
router.get('/:id/pdf', asyncHandler(authMiddleware), participantsController.getParticipantPDF);

router.post(
  '/:id/send-email',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser', 'venue_coordinator']),
  sendCustomEmailToParticipant,
);

router.patch(
  '/:id/reject',
  asyncHandler(authMiddleware),
  roleMiddleware(['venue_coordinator', 'superuser']),
  participantsController.rejectParticipant,
);

module.exports = router;
export default router;
