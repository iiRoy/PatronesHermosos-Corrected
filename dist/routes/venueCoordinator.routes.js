"use strict";
// routes/venueCoordinator.routes.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const venueCoordinator_controller_1 = __importDefault(require("../controllers/venueCoordinator.controller"));
function asyncHandler(fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
const router = express_1.default.Router();
// Ruta para obtener todos los coordinadores
router.get('/', asyncHandler(authMiddleware_1.authMiddleware), (0, authMiddleware_1.roleMiddleware)(['admin']), venueCoordinator_controller_1.default.getAllCoordinators);
// Ruta para obtener coordinadores con datos específicos (ID, NOMBRE, SEDE, CORREO, TELÉFONO)
router.get('/specific', asyncHandler(authMiddleware_1.authMiddleware), (0, authMiddleware_1.roleMiddleware)(['admin', 'superuser']), venueCoordinator_controller_1.default.getSpecific);
// Nueva ruta para obtener una coordinadora por ID
router.get('/:id', asyncHandler(authMiddleware_1.authMiddleware), (0, authMiddleware_1.roleMiddleware)(['admin', 'superuser']), venueCoordinator_controller_1.default.getCoordinatorById);
// Ruta para crear un nuevo coordinador
router.post('/', asyncHandler(authMiddleware_1.authMiddleware), (0, authMiddleware_1.roleMiddleware)(['admin']), venueCoordinator_controller_1.default.createCoordinator);
// Ruta para actualizar un coordinador completamente
router.put('/:id', asyncHandler(authMiddleware_1.authMiddleware), (0, authMiddleware_1.roleMiddleware)(['admin', 'superuser']), venueCoordinator_controller_1.default.updateCoordinator);
// Ruta para actualizar solo los campos específicos de un coordinador
router.put('/specific/:id', asyncHandler(authMiddleware_1.authMiddleware), (0, authMiddleware_1.roleMiddleware)(['admin', 'superuser']), venueCoordinator_controller_1.default.updateCoordinatorFields);
// Ruta para eliminar un coordinador
router.delete('/:id', asyncHandler(authMiddleware_1.authMiddleware), (0, authMiddleware_1.roleMiddleware)(['admin']), venueCoordinator_controller_1.default.deleteCoordinator);
// Cancelar una coordinadora
router.patch('/:id/cancel', asyncHandler(authMiddleware_1.authMiddleware), (0, authMiddleware_1.roleMiddleware)(['superuser']), venueCoordinator_controller_1.default.cancelVenueCoordinator);
router.patch('/:id/replace', asyncHandler(authMiddleware_1.authMiddleware), (0, authMiddleware_1.roleMiddleware)(['superuser']), venueCoordinator_controller_1.default.replaceVenueCoordinator);
exports.default = router;
module.exports = router;
