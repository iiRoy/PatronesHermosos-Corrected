const express = require('express');
const router = express.Router();
const { validateCollaborator } = require('../validators/collaboratorValidator');
const collaboratorController = require('../controllers/collaborator.controller');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');

// Get all collaborators (admin only)
router.get('/', authMiddleware, roleMiddleware(['admin']), collaboratorController.getAll);

// Create a new collaborator (public, no auth required)
router.post('/', validateCollaborator, collaboratorController.create);

// Get a collaborator by ID (requires auth, e.g., for user profile or admin)
router.get('/:id', authMiddleware, collaboratorController.getById);

// Update a collaborator (admin only)
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin']),
  validateCollaborator,
  collaboratorController.update
);

// Delete a collaborator (admin only)
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), collaboratorController.remove);

module.exports = router;