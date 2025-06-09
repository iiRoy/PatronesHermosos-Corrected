// routes/venueCoordinator.routes.js

import express from 'express';
import { authMiddleware, roleMiddleware } from '../middlewares/authMiddleware';
import coordinatorController from '../controllers/venueCoordinator.controller';

function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
const router = express.Router();

// Ruta para obtener todos los coordinadores
router.get(
  '/',
  asyncHandler(authMiddleware),
  roleMiddleware(['admin']),
  coordinatorController.getAllCoordinators,
);

// Ruta para obtener coordinadores con datos específicos (ID, NOMBRE, SEDE, CORREO, TELÉFONO)
router.get(
  '/specific',
  asyncHandler(authMiddleware),
  roleMiddleware(['admin', 'superuser']),
  coordinatorController.getSpecific,
);

// Nueva ruta para obtener una coordinadora por ID
router.get(
  '/:id',
  asyncHandler(authMiddleware),
  roleMiddleware(['admin', 'superuser']),
  coordinatorController.getCoordinatorById,
);

// Ruta para crear un nuevo coordinador
router.post(
  '/',
  asyncHandler(authMiddleware),
  roleMiddleware(['admin']),
  coordinatorController.createCoordinator,
);

// Ruta para actualizar un coordinador completamente
router.put(
  '/:id',
  asyncHandler(authMiddleware),
  roleMiddleware(['admin', 'superuser']),
  coordinatorController.updateCoordinator,
);

// Ruta para actualizar solo los campos específicos de un coordinador
router.put(
  '/specific/:id',
  asyncHandler(authMiddleware),
  roleMiddleware(['admin', 'superuser']),
  coordinatorController.updateCoordinatorFields,
);

// Ruta para eliminar un coordinador
router.delete(
  '/:id',
  asyncHandler(authMiddleware),
  roleMiddleware(['admin']),
  coordinatorController.deleteCoordinator,
);

// Cancelar una coordinadora
router.patch(
  '/:id/cancel',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser']),
  coordinatorController.cancelVenueCoordinator,
);

router.patch(
  '/:id/replace',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser']),
  coordinatorController.replaceVenueCoordinator,
);

export default router;
module.exports = router;
