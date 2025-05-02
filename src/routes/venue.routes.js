// src/routes/venue.routes.js
const express = require('express');
const multer = require('multer');
const venueController = require('../venue.controller');
const { validateVenue } = require('../venueValidator');

const router = express.Router();

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Routes
router.get('/', authMiddleware, venueController.getAll);
router.post(
  '/',
  upload.fields([
    { name: 'participation_file', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
    { name: 'generalCoordinator.profileImage', maxCount: 1 },
  ]),
  authMiddleware,
  roleMiddleware(['admin']),
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