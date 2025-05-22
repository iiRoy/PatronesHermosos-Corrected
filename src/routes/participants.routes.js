const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises; // Add fs for file serving
const participantsController = require('../controllers/participants.controller');
const { validateParticipant } = require('../validators/participantsValidator');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads', 'tmp'));
  },
  filename: (req, file, cb) => {
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

const router = express.Router();

router.get('/', authMiddleware, participantsController.getAllParticipants);
router.post(
  '/',
  upload.single('participation_file'),
  validateParticipant,
  participantsController.createParticipant
);
router.get('/:id', authMiddleware, participantsController.getParticipantById);
router.get('/table', authMiddleware, participantsController.getParticipantsTable);
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['superuser']),
  participantsController.updateParticipant
);
router.put(
  '/:id/basic-info',
  authMiddleware,
  roleMiddleware(['superuser']),
  participantsController.updateParticipantBasicInfo
);
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['superuser']),
  participantsController.deleteParticipant
);

// Serve files from uploads/tmp
router.get('/files/:filename', async (req, res) => {
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

module.exports = router;