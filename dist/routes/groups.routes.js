"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const groups_controller_1 = __importDefault(require("../controllers/groups.controller"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
function asyncHandler(fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
const router = express_1.default.Router();
router.get('/', groups_controller_1.default.getAll);
router.post('/', groups_controller_1.default.createGroup);
router.patch('/:id', groups_controller_1.default.updateGroup);
router.patch('/:id/status', asyncHandler(authMiddleware_1.authMiddleware), (0, authMiddleware_1.roleMiddleware)(['superuser', 'venue_coordinator']), groups_controller_1.default.changeGroupStatus);
exports.default = router;
module.exports = router;
