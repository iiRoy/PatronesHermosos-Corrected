const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groups.controller');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');


router.get('/', groupController.getAll);

router.patch(
  '/:id/status',
  authMiddleware,
  roleMiddleware(['superuser']),
  groupController.changeGroupStatus
);

module.exports = router;