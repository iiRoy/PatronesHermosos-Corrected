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

router.patch('/:id/reject', authMiddleware, roleMiddleware(['superuser', 'venue_coordinator']), collaboratorsController.rejectCollaborator);

// Update a collaborator (superuser only)
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['superuser', 'venue_coordinator']),
  validateCollaborator,
  collaboratorsController.updateCollaborator
);

// Update basic info of a collaborator (superuser only)
router.patch(
  '/basic/:id',
  authMiddleware,
  roleMiddleware(['superuser', 'venue_coordinator']),
  collaboratorsController.updateCollaboratorBasicInfo
);

// Delete a collaborator (superuser only)
router.delete('/:id', authMiddleware, roleMiddleware(['superuser', 'venue_coordinator']), collaboratorsController.deleteCollaborator);

router.get('/:collaboratorId/available-groups', authMiddleware, roleMiddleware(['superuser', 'venue_coordinator']), collaboratorsController.getAvailableGroups);
router.patch('/:collaboratorId/approve', authMiddleware, roleMiddleware(['superuser', 'venue_coordinator']), collaboratorsController.approveCollaborator);
router.patch('/:id/cancel', authMiddleware, roleMiddleware(['superuser', 'venue_coordinator']), collaboratorsController.cancelCollaborator);

module.exports = router;