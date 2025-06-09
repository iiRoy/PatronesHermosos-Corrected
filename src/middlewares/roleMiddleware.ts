import { Request, Response, NextFunction } from 'express';

interface UserRequest extends Request {
  user?: {
    role: string;
    [key: string]: any;
  };
}

module.exports = (allowedRoles: string[] = []) => {
  return (req: UserRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acceso denegado: rol insuficiente' });
    }

    next();
  };
};
