const express = require('express');
const router = express.Router();
const participantsController = require('../controllers/participants.controller');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, participantsController.getAllParticipants);
router.post('/', authMiddleware, participantsController.createParticipant);
router.get('/:id', authMiddleware, participantsController.getParticipantById);
router.get('/table', authMiddleware, participantsController.getParticipantsTable);
router.get(
  '/:participantId/available-groups',
  authMiddleware,
  roleMiddleware(['superuser', 'venue_coordinator']),
  participantsController.getAvailableGroups
);
router.patch(
  '/:participantId/approve',
  authMiddleware,
  roleMiddleware(['superuser', 'venue_coordinator']),
  participantsController.approveParticipant
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['superuser', 'venue_coordinator']),
  participantsController.updateParticipant,
);
router.put(
  '/:id/basic-info',
  authMiddleware,
  roleMiddleware(['superuser', 'venue_coordinator']),
  participantsController.updateParticipantBasicInfo,
);
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['superuser', 'venue_coordinator']),
  participantsController.deleteParticipant,
);
router.patch(
  '/:id/status',
  authMiddleware,
  roleMiddleware(['superuser', 'venue_coordinator']),
  participantsController.changeParticipantStatus,
);

module.exports = router;
