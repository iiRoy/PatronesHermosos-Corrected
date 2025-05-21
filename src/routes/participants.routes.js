const express = require('express');
const multer = require('multer');
const path = require('path');
const participantsController = require('../controllers/participants.controller');
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
  authMiddleware,
  upload.single('participation_file'),
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

module.exports = router;