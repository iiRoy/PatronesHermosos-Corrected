"use strict";
// src/utils/api.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
exports.withErrorHandler = withErrorHandler;
exports.validateBody = validateBody;
exports.validateQuery = validateQuery;
/**
 * Error personalizado que incluye un código HTTP
 */
class ApiError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ApiError = ApiError;
/**
 * Wrapper para cualquier NextApiHandler que capture errores lanzados
 * como ApiError o inesperados, y los formatee en JSON.
 */
function withErrorHandler(handler) {
    return async (req, res) => {
        try {
            return await handler(req, res);
        }
        catch (err) {
            if (err instanceof ApiError) {
                return res.status(err.statusCode).json({ error: err.message });
            }
            console.error('Unexpected error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
}
/**
 * Valida req.body contra un schema de Zod.
 * Si falla, lanza ApiError(400).
 * Devuelve el objeto ya tipado si pasa.
 */
function validateBody(schema) {
    return (req, res) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const issues = result.error.issues
                .map(i => `${i.path.join('.')}: ${i.message}`)
                .join('; ');
            throw new ApiError(`Validation failed: ${issues}`, 400);
        }
        return result.data;
    };
}
/**
 * Valida req.query contra un schema de Zod.
 * Si falla, lanza ApiError(400).
 * Devuelve el objeto ya tipado si pasa.
 */
function validateQuery(schema) {
    return (req, res) => {
        const result = schema.safeParse(req.query);
        if (!result.success) {
            const issues = result.error.issues
                .map(i => `${i.path.join('.')}: ${i.message}`)
                .join('; ');
            throw new ApiError(`Query validation failed: ${issues}`, 400);
        }
        return result.data;
    };
}
