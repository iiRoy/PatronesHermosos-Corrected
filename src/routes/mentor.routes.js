const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');
const mentorController = require('../controllers/mentor.controller');

// Ruta para obtener todas las mentoras
router.get(
  '/',
  authMiddleware,
  roleMiddleware(['admin', 'superuser', 'venue_coordinator']),
  mentorController.getAll
);

// Ruta para obtener una mentora por ID
router.get(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin', 'superuser', 'venue_coordinator']),
  mentorController.getMentorById
);

// Ruta para obtener datos específicos de una mentora
router.get(
  '/specific/:id',
  authMiddleware,
  roleMiddleware(['admin', 'superuser', 'venue_coordinator']),
  mentorController.getSpecific
);

// Ruta para crear una nueva mentora
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['admin']),
  mentorController.create
);

// Ruta para actualizar todos los datos de una mentora
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin', 'superuser', 'venue_coordinator']),
  mentorController.update
);

// Ruta para actualizar datos básicos de una mentora (por superuser)
router.put(
  '/specific/:id',
  authMiddleware,
  roleMiddleware(['admin', 'superuser', 'venue_coordinator']),
  mentorController.updateBasicData
);

// Ruta para eliminar una mentora
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin']),
  mentorController.remove
);

// Ruta para obtener los grupos de una mentora
router.get(
  '/:id_mentor/groups',
  authMiddleware,
  roleMiddleware(['admin', 'superuser', 'venue_coordinator']),
  mentorController.getGroupMentor
);

// Ruta para remover una mentora de un grupo
router.put(
  '/groups/:id_group/remove-mentor',
  authMiddleware,
  roleMiddleware(['admin']),
  mentorController.removeMentorFromGroup
);

module.exports = router;