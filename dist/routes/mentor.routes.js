'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const authMiddleware_1 = require('../middlewares/authMiddleware');
const mentor_controller_1 = __importDefault(require('../controllers/mentor.controller'));
function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
const router = express_1.default.Router();
// Ruta para obtener todas las mentoras
router.get(
  '/',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['admin', 'superuser', 'venue_coordinator']),
  mentor_controller_1.default.getAll,
);
// Ruta para obtener una mentora por ID
router.get(
  '/:id',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['admin', 'superuser', 'venue_coordinator']),
  mentor_controller_1.default.getMentorById,
);
// Ruta para obtener datos específicos de una mentora
router.get(
  '/specific/:id',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['admin', 'superuser', 'venue_coordinator']),
  mentor_controller_1.default.getSpecific,
);
// Ruta para crear una nueva mentora
router.post(
  '/',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['admin']),
  mentor_controller_1.default.create,
);
// Ruta para actualizar todos los datos de una mentora
router.put(
  '/:id',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['admin', 'superuser', 'venue_coordinator']),
  mentor_controller_1.default.update,
);
// Ruta para actualizar datos básicos de una mentora (por superuser)
router.put(
  '/specific/:id',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['admin', 'superuser', 'venue_coordinator']),
  mentor_controller_1.default.updateBasicData,
);
// Ruta para eliminar una mentora
router.delete(
  '/:id',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['admin']),
  mentor_controller_1.default.remove,
);
// Ruta para obtener los grupos de una mentora
router.get(
  '/:id_mentor/groups',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['admin', 'superuser', 'venue_coordinator']),
  mentor_controller_1.default.getGroupMentor,
);
// Ruta para remover una mentora de un grupo
router.put(
  '/groups/:id_group/remove-mentor',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['admin']),
  mentor_controller_1.default.removeMentorFromGroup,
);
// Cancelar una mentora
router.patch(
  '/:id/cancel',
  asyncHandler(authMiddleware_1.authMiddleware),
  (0, authMiddleware_1.roleMiddleware)(['superuser', 'venue_coordinator']),
  mentor_controller_1.default.cancelMentor,
);
exports.default = router;
module.exports = router;
