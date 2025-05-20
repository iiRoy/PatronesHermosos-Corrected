const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email.controller');
const authMiddleware = require('../middleware/auth'); // Assumed middleware

router.post('/confirm', authMiddleware(['superuser', 'venue_coordinator']), emailController.sendConfirmation);
router.post('/confirm/bulk', authMiddleware(['superuser']), emailController.sendBulkConfirmation);

module.exports = router;