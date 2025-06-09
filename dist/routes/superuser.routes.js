"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const superuserValidator_1 = require("../validators/superuserValidator");
const superuser_controller_1 = __importDefault(require("../controllers/superuser.controller"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
function asyncHandler(fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
const router = express_1.default.Router();
router.get('/', asyncHandler(authMiddleware_1.authMiddleware), (0, authMiddleware_1.roleMiddleware)(['admin']), superuser_controller_1.default.getAll);
router.post('/', superuserValidator_1.validateSuperUser, superuser_controller_1.default.create);
router.get('/:id', asyncHandler(authMiddleware_1.authMiddleware), superuser_controller_1.default.getById);
router.put('/:id', asyncHandler(authMiddleware_1.authMiddleware), (0, authMiddleware_1.roleMiddleware)(['admin']), superuserValidator_1.validateSuperUser, superuser_controller_1.default.update);
router.delete('/:id', asyncHandler(authMiddleware_1.authMiddleware), (0, authMiddleware_1.roleMiddleware)(['admin']), superuser_controller_1.default.remove);
exports.default = router;
module.exports = router;
