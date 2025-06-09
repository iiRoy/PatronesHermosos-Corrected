import express from 'express';
import auditLogController from '../controllers/auditlog.controller';
import { authMiddleware, roleMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// Helper to wrap async middlewares
function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Ruta para obtener todos los registros de audit_log (solo coordinadores)
router.get(
  '/',
  asyncHandler(authMiddleware),
  roleMiddleware(['venue_coordinator', 'superuser']),
  auditLogController.getAll,
);

export default router;
