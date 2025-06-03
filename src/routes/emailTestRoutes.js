const express = require('express');
const router = express.Router();
const emailTestController = require('../controllers/emailTestController');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');

router.post(
  '/test',
  authMiddleware,
  roleMiddleware(['venue_coordinator', 'superuser']),
  emailTestController.sendTestEmail
);

module.exports = router;