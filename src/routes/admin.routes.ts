import express from 'express';
import { backupHandler, resetDbHandler } from '../services/admin.service';
import { authMiddleware, roleMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// Helper to wrap async middlewares
function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Descargar respaldo (Excel + diplomas en ZIP): superuser o venue_coordinator
router.post(
  '/backup',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser', 'venue_coordinator']),
  backupHandler,
);

// Restablecer base de datos (excepto tablas protegidas): solo superuser
router.post(
  '/resetdb',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser']),
  resetDbHandler,
);

export default router;
