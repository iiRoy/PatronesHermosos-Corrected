import express, { Router, Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { data, getProfile } from '../controllers/data.controller';

function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
const router = express.Router();

router.get('/', asyncHandler(authMiddleware), data);
router.get('/getprofile', asyncHandler(authMiddleware), getProfile);

export default router;
