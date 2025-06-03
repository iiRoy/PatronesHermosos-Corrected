const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groups.controller');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');

router.get('/', groupController.getAll);
router.post('/', groupController.createGroup);
router.patch('/:id', groupController.updateGroup);
router.patch(
    '/:id/status',
    authMiddleware,
    roleMiddleware(['superuser', 'venue_coordinator']),
    groupController.changeGroupStatus
);

module.exports = router;