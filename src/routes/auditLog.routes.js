const express = require('express');
const router = express.Router();
const auditLogController = require('../controllers/auditlog.controller');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');

// Ruta para obtener todos los registros de audit_log (solo coordinadores)
router.get('/', authMiddleware, roleMiddleware(['venue_coordinator', 'superuser' ]), auditLogController.getAll);

module.exports = router;