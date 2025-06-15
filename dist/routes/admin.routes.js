'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const admin_service_1 = require('../services/admin.service');
const authMiddleware_1 = require('../middlewares/authMiddleware');
const router = express_1.default.Router();
// Helper to wrap async middlewares
function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
// Descargar respaldo (Excel + diplomas en ZIP): superuser o venue_coordinator
router.post(
  '/backup',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['superuser', 'venue_coordinator']),
  admin_service_1.backupHandler,
);
// Restablecer base de datos (excepto tablas protegidas): solo superuser
router.post(
  '/resetdb',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['superuser']),
  admin_service_1.resetDbHandler,
);
exports.default = router;
