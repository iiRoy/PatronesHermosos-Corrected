import express, { Router } from 'express';
import { validateLogin } from '../validators/auth.validator';
import authController from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router: Router = express.Router();

router.post('/login', validateLogin, authController.login);
// Helper to wrap async route handlers and pass errors to next()
import { Request, Response, NextFunction, RequestHandler } from 'express';

const asyncHandler =
  (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any>>,
  ): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

router.post('/logout', asyncHandler(authMiddleware), asyncHandler(authController.logout));

export default router;
