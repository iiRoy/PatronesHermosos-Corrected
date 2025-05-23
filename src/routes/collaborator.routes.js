const express = require('express');
const router = express.Router();
const collaboratorsController = require('../controllers/collaborator.controller');
const { validateCollaborator } = require('../validators/collaboratorValidator');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');

// Get all collaborators (superuser only)
router.get('/', authMiddleware, roleMiddleware(['superuser', 'venue_coordinator']), collaboratorsController.getAllCollaborators);

// Create a new collaborator (public, no auth required)
router.post('/', validateCollaborator, collaboratorsController.createCollaborator);

// Get a collaborator by ID (superuser or venue coordinator)
router.get('/:id', authMiddleware, roleMiddleware(['superuser', 'venue_coordinator']), collaboratorsController.getCollaboratorById);

// Update a collaborator (superuser only)
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['superuser']),
  validateCollaborator,
  collaboratorsController.updateCollaborator
);

// Update basic info of a collaborator (superuser only)
router.patch(
  '/basic/:id/',
  authMiddleware,
  roleMiddleware(['superuser']),
  collaboratorsController.updateCollaboratorBasicInfo
);

// Delete a collaborator (superuser only)
router.delete('/:id', authMiddleware, roleMiddleware(['superuser']), collaboratorsController.deleteCollaborator);

module.exports = router;