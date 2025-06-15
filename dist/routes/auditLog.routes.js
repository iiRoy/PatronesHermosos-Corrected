'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const auditlog_controller_1 = __importDefault(require('../controllers/auditlog.controller'));
const authMiddleware_1 = require('../middlewares/authMiddleware');
const router = express_1.default.Router();
// Helper to wrap async middlewares
function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
// Ruta para obtener todos los registros de audit_log (solo coordinadores)
router.get(
  '/',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['venue_coordinator', 'superuser']),
  auditlog_controller_1.default.getAll,
);
exports.default = router;
