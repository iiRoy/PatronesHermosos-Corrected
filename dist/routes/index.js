'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const auth_routes_1 = __importDefault(require('./auth.routes'));
const venue_routes_1 = __importDefault(require('./venue.routes'));
const participants_routes_1 = __importDefault(require('./participants.routes'));
const router = express_1.default.Router();
router.use('/auth', auth_routes_1.default);
router.use('/venues', venue_routes_1.default);
router.use('/participants', participants_routes_1.default);
exports.default = router;
