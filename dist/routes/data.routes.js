"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const data_controller_1 = require("../controllers/data.controller");
function asyncHandler(fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
const router = express_1.default.Router();
router.get('/', asyncHandler(authMiddleware_1.authMiddleware), data_controller_1.data);
router.get('/getprofile', asyncHandler(authMiddleware_1.authMiddleware), data_controller_1.getProfile);
exports.default = router;
