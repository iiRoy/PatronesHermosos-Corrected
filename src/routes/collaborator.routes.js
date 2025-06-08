const express = require('express');
const router = express.Router();
const collaboratorsController = require('../controllers/collaborator.controller');
const { validateCollaborator } = require('../validators/collaboratorValidator');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');
const { sendCustomEmailToCollaborator } = require('../controllers/collaborator.controller');

// Get all collaborators (superuser or venue_coordinator)
router.get(
  '/',
  authMiddleware,
  roleMiddleware(['superuser', 'venue_coordinator']),
  collaboratorsController.getAllCollaborators,
);

// Create a new collaborator (public, no auth required)
router.post('/', validateCollaborator, collaboratorsController.createCollaborator);

// Get a collaborator by ID (superuser or venue_coordinator)
router.get(
  '/:id',
  authMiddleware,
  roleMiddleware(['superuser', 'venue_coordinator']),
  collaboratorsController.getCollaboratorById,
);

// Reject a collaborator (superuser or venue_coordinator)
router.patch(
  '/:id/reject',
  authMiddleware,
  roleMiddleware(['superuser', 'venue_coordinator']),
  collaboratorsController.rejectCollaborator,
);

// Update a collaborator (superuser or venue_coordinator)
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['superuser', 'venue_coordinator']),
  validateCollaborator,
  collaboratorsController.updateCollaborator,
);

// Update basic info of a collaborator (superuser or venue_coordinator)
router.patch(
  '/basic/:id',
  authMiddleware,
  roleMiddleware(['superuser', 'venue_coordinator']),
  collaboratorsController.updateCollaboratorBasicInfo,
);

// Delete a collaborator (superuser or venue_coordinator)
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['superuser', 'venue_coordinator']),
  collaboratorsController.deleteCollaborator,
);

router.post('/:id/send-email', sendCustomEmailToCollaborator);

// Get available groups for a collaborator (superuser or venue_coordinator)
router.get(
  '/:collaboratorId/available-groups',
  authMiddleware,
  roleMiddleware(['superuser', 'venue_coordinator']),
  collaboratorsController.getAvailableGroups,
);

// Approve a collaborator (superuser or venue_coordinator)
router.patch(
  '/:collaboratorId/approve',
  authMiddleware,
  roleMiddleware(['superuser', 'venue_coordinator']),
  collaboratorsController.approveCollaborator,
);

// Cancel a collaborator (superuser or venue_coordinator)
router.patch(
  '/:id/cancel',
  authMiddleware,
  roleMiddleware(['superuser', 'venue_coordinator']),
  collaboratorsController.cancelCollaborator,
);

// New route: Update collaborator assignment (superuser or venue_coordinator)
router.patch(
  '/:collaboratorId/update-assignment',
  authMiddleware,
  roleMiddleware(['superuser', 'venue_coordinator']),
  collaboratorsController.updateCollaboratorAssignment,
);

module.exports = router;
