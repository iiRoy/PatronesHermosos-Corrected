"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diploma_controller_1 = require("../controllers/diploma.controller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
function asyncHandler(fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
const router = express_1.default.Router();
// POST /api/diplomas/generate
router.post('/generate', diploma_controller_1.generateDiplomas);
// GET /api/diplomas/filtros
router.get('/filtros', diploma_controller_1.getDiplomaFilters);
// GET /api/diplomas/users
router.get('/users', diploma_controller_1.getDiplomaUsers);
// POST /api/diplomas/email
router.post('/email', asyncHandler(authMiddleware_1.authMiddleware), diploma_controller_1.sendDiplomasByEmail);
exports.default = router;
