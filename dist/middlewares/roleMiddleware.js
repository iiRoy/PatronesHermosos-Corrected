"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (allowedRoles = []) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Acceso denegado: rol insuficiente' });
        }
        next();
    };
};
