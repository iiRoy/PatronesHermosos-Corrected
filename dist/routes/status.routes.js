'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const status_Controller_1 = require('../controllers/status.Controller');
const router = express_1.default.Router();
router.get('/:id', status_Controller_1.getEntityStatusByID);
exports.default = router;
