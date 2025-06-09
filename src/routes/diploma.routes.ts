import express, { Router } from 'express';
import {
  generateDiplomas,
  getDiplomaFilters,
  getDiplomaUsers,
  sendDiplomasByEmail,
} from '../controllers/diploma.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
const router = express.Router();

// POST /api/diplomas/generate
router.post('/generate', generateDiplomas);

// GET /api/diplomas/filtros
router.get('/filtros', getDiplomaFilters);

// GET /api/diplomas/users
router.get('/users', getDiplomaUsers);

// POST /api/diplomas/email
router.post('/email', asyncHandler(authMiddleware), sendDiplomasByEmail);

export default router;
