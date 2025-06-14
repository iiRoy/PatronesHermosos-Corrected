"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_validator_1 = require("../validators/auth.validator");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post('/login', auth_validator_1.validateLogin, auth_controller_1.default.login);
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
router.post('/logout', asyncHandler(authMiddleware_1.authMiddleware), asyncHandler(auth_controller_1.default.logout));
exports.default = router;
