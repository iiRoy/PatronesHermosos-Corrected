// routes/venueCoordinator.routes.js

const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');
const coordinatorController = require('../controllers/venueCoordinator.controller');

// Ruta para obtener todos los coordinadores
router.get(
  '/',
  authMiddleware,
  roleMiddleware(['admin']),
  coordinatorController.getAllCoordinators,
);

// Ruta para obtener coordinadores con datos específicos (ID, NOMBRE, SEDE, CORREO, TELÉFONO)
router.get(
  '/specific',
  authMiddleware,
  roleMiddleware(['admin', 'superuser']),
  coordinatorController.getSpecific,
);

// Nueva ruta para obtener una coordinadora por ID
router.get(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin', 'superuser']),
  coordinatorController.getCoordinatorById,
);

// Ruta para crear un nuevo coordinador
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['admin']),
  coordinatorController.createCoordinator,
);

// Ruta para actualizar un coordinador completamente
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin', 'superuser']),
  coordinatorController.updateCoordinator,
);

// Ruta para actualizar solo los campos específicos de un coordinador
router.put(
  '/specific/:id',
  authMiddleware,
  roleMiddleware(['admin', 'superuser']),
  coordinatorController.updateCoordinatorFields,
);

// Ruta para eliminar un coordinador
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin']),
  coordinatorController.deleteCoordinator,
);

// Cancelar una coordinadora
router.patch(
  '/:id/cancel',
  authMiddleware,
  roleMiddleware(['superuser']),
  coordinatorController.cancelVenueCoordinator
);

router.patch(
  '/:id/replace',
   authMiddleware,
   roleMiddleware(['superuser']), 
   coordinatorController.replaceVenueCoordinator
  );
module.exports = router;