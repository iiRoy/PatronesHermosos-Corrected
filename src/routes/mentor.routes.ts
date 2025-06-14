import express from 'express';
import { authMiddleware, roleMiddleware } from '../middlewares/authMiddleware';
import mentorController from '../controllers/mentor.controller';

function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
const router = express.Router();

// Ruta para obtener todas las mentoras
router.get(
  '/',
  asyncHandler(authMiddleware),
  roleMiddleware(['admin', 'superuser', 'venue_coordinator']),
  mentorController.getAll,
);

// Ruta para obtener una mentora por ID
router.get(
  '/:id',
  asyncHandler(authMiddleware),
  roleMiddleware(['admin', 'superuser', 'venue_coordinator']),
  mentorController.getMentorById,
);

// Ruta para obtener datos específicos de una mentora
router.get(
  '/specific/:id',
  asyncHandler(authMiddleware),
  roleMiddleware(['admin', 'superuser', 'venue_coordinator']),
  mentorController.getSpecific,
);

// Ruta para crear una nueva mentora
router.post('/', asyncHandler(authMiddleware), roleMiddleware(['admin']), mentorController.create);

// Ruta para actualizar todos los datos de una mentora
router.put(
  '/:id',
  asyncHandler(authMiddleware),
  roleMiddleware(['admin', 'superuser', 'venue_coordinator']),
  mentorController.update,
);

// Ruta para actualizar datos básicos de una mentora (por superuser)
router.put(
  '/specific/:id',
  asyncHandler(authMiddleware),
  roleMiddleware(['admin', 'superuser', 'venue_coordinator']),
  mentorController.updateBasicData,
);

// Ruta para eliminar una mentora
router.delete(
  '/:id',
  asyncHandler(authMiddleware),
  roleMiddleware(['admin']),
  mentorController.remove,
);

// Ruta para obtener los grupos de una mentora
router.get(
  '/:id_mentor/groups',
  asyncHandler(authMiddleware),
  roleMiddleware(['admin', 'superuser', 'venue_coordinator']),
  mentorController.getGroupMentor,
);

// Ruta para remover una mentora de un grupo
router.put(
  '/groups/:id_group/remove-mentor',
  asyncHandler(authMiddleware),
  roleMiddleware(['admin']),
  mentorController.removeMentorFromGroup,
);

// Cancelar una mentora
router.patch(
  '/:id/cancel',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser', 'venue_coordinator']),
  mentorController.cancelMentor,
);
export default router;
module.exports = router;
