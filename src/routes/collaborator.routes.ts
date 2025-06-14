import express from 'express';
import collaboratorsController, {
  sendCustomEmailToCollaborator,
} from '../controllers/collaborator.controller';
import { validateCollaborator } from '../validators/collaboratorValidator';
import { authMiddleware, roleMiddleware } from '../middlewares/authMiddleware';

function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
const router = express.Router();

// Get all collaborators (superuser or venue_coordinator)
router.get(
  '/',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser', 'venue_coordinator']),
  collaboratorsController.getAllCollaborators,
);

// Create a new collaborator (public, no auth required)
router.post('/', validateCollaborator, collaboratorsController.createCollaborator);

// Get a collaborator by ID (superuser or venue_coordinator)
router.get(
  '/:id',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser', 'venue_coordinator']),
  collaboratorsController.getCollaboratorById,
);

// Reject a collaborator (superuser or venue_coordinator)
router.patch(
  '/:id/reject',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser', 'venue_coordinator']),
  collaboratorsController.rejectCollaborator,
);

// Update a collaborator (superuser or venue_coordinator)
router.put(
  '/:id',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser', 'venue_coordinator']),
  validateCollaborator,
  collaboratorsController.updateCollaborator,
);

// Update basic info of a collaborator (superuser or venue_coordinator)
router.patch(
  '/basic/:id',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser', 'venue_coordinator']),
  collaboratorsController.updateCollaboratorBasicInfo,
);

// Delete a collaborator (superuser or venue_coordinator)
router.delete(
  '/:id',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser', 'venue_coordinator']),
  collaboratorsController.deleteCollaborator,
);

router.post('/:id/send-email', sendCustomEmailToCollaborator);

// Get available groups for a collaborator (superuser or venue_coordinator)
router.get(
  '/:collaboratorId/available-groups',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser', 'venue_coordinator']),
  collaboratorsController.getAvailableGroups,
);

// Approve a collaborator (superuser or venue_coordinator)
router.patch(
  '/:collaboratorId/approve',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser', 'venue_coordinator']),
  collaboratorsController.approveCollaborator,
);

// Cancel a collaborator (superuser or venue_coordinator)
router.patch(
  '/:id/cancel',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser', 'venue_coordinator']),
  collaboratorsController.cancelCollaborator,
);

// New route: Update collaborator assignment (superuser or venue_coordinator)
router.patch(
  '/:collaboratorId/update-assignment',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser', 'venue_coordinator']),
  collaboratorsController.updateCollaboratorAssignment,
);

export default router;
