"use strict";
const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const validateCollaborator = [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('paternal_name').notEmpty().withMessage('El apellido paterno es obligatorio'),
    body('email')
        .notEmpty()
        .withMessage('El correo electrónico es obligatorio')
        .isEmail()
        .withMessage('Correo electrónico no válido')
        .custom(async (email) => {
        const existing = await prisma.collaborators.findFirst({
            where: { email },
        });
        if (existing) {
            throw new Error('El correo ya está registrado');
        }
    }),
    body('phone_number').notEmpty().withMessage('El celular es obligatorio'),
    body('gender').notEmpty().withMessage('El sexo es obligatorio'),
    body('college').notEmpty().withMessage('La institución académica es obligatoria'),
    body('degree').notEmpty().withMessage('La carrera es obligatoria'),
    body('semester').notEmpty().withMessage('El semestre es obligatorio'),
    body('preferred_role')
        .isIn(['Instructora', 'Facilitadora', 'Staff'])
        .withMessage('Rol preferido no válido'),
    body('preferred_language').isIn(['Español', 'Inglés']).withMessage('Idioma preferido no válido'),
    body('preferred_level')
        .isIn(['Básico', 'Intermedio', 'Avanzado'])
        .withMessage('Dificultad preferida no válida'),
    body('preferred_venue')
        .optional()
        .isInt()
        .withMessage('Sede preferida debe ser un número')
        .custom(async (id_venue) => {
        if (id_venue) {
            const venue = await prisma.venues.findUnique({
                where: { id_venue: parseInt(id_venue) },
            });
            if (!venue) {
                throw new Error('Sede no encontrada');
            }
        }
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                message: 'Error de validación',
                errors: errors.array(),
            });
        }
        next();
    },
];
module.exports = { validateCollaborator };
