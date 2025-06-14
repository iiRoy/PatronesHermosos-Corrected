'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const router = express_1.default.Router();
const { PrismaClient } = require('@prisma/client');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');
const prisma = new PrismaClient();
function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
// GET /api/registrations
router.get(
  '/',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser', 'venue_coordinator']),
  async (req, res) => {
    const { section } = req.query;
    try {
      let result;
      switch (section) {
        case 'PARTICIPANTES':
          result = await prisma.participants.findMany({
            select: {
              id_participant: true,
              name: true,
              paternal_name: true,
              maternal_name: true,
              email: true,
              year: true,
              groups: {
                select: {
                  venues: {
                    select: { name: true },
                  },
                },
              },
              created_at: true,
            },
          });
          res.json(
            result.map((item) => ({
              id: item.id_participant.toString(),
              nombre:
                `${item.name || ''} ${item.paternal_name || ''} ${item.maternal_name || ''}`.trim(),
              sede: item.groups?.venues?.name || 'N/A',
              fecha: item.created_at.toLocaleDateString('es-MX'),
            })),
          );
          break;
        case 'APOYO & STAFF':
          result = await prisma.collaborators.findMany({
            select: {
              id_collaborator: true,
              name: true,
              paternal_name: true,
              maternal_name: true,
              email: true,
              phone_number: true,
              college: true,
              groups: {
                select: {
                  venues: {
                    select: { name: true },
                  },
                },
              },
              created_at: true,
            },
          });
          res.json(
            result.map((item) => ({
              id: item.id_collaborator.toString(),
              nombre:
                `${item.name || ''} ${item.paternal_name || ''} ${item.maternal_name || ''}`.trim(),
              sede: item.groups?.venues?.name || 'N/A',
              fecha: item.created_at.toLocaleDateString('es-MX'),
            })),
          );
          break;
        case 'SEDES':
          result = await prisma.venues.findMany({
            select: {
              id_venue: true,
              name: true,
              state: true,
              created_at: true,
            },
          });
          res.json(
            result.map((item) => ({
              id: item.id_venue.toString(),
              institucion: item.name,
              lugar: item.state || 'N/A',
              fecha: item.created_at.toLocaleDateString('es-MX'),
            })),
          );
          break;
        default:
          res.status(400).json({ message: 'Invalid section' });
          break;
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
);
// PATCH /api/registrations/:id
router.patch(
  '/:id',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser', 'venue_coordinator']),
  async (req, res) => {
    const { id } = req.params;
    const { status, section } = req.body;
    try {
      if (!['PARTICIPANTES', 'APOYO & STAFF', 'SEDES'].includes(section)) {
        res.status(400).json({ message: 'Invalid section' });
        return;
      }
      if (status === 'accept') {
        if (section === 'PARTICIPANTES') {
          await prisma.participants.update({
            where: { id_participant: parseInt(id) },
            data: { status: 'Aprobada' },
          });
        } else if (section === 'APOYO & STAFF') {
          await prisma.collaborators.update({
            where: { id_collaborator: parseInt(id) },
            data: { status: 'Aprobada' },
          });
        } else if (section === 'SEDES') {
          await prisma.venues.update({
            where: { id_venue: parseInt(id) },
            data: { status: 'Registrada_con_participantes' },
          });
        }
      } else if (status === 'reject') {
        if (section === 'PARTICIPANTES') {
          await prisma.participants.update({
            where: { id_participant: parseInt(id) },
            data: { status: 'Rechazada' },
          });
        } else if (section === 'APOYO & STAFF') {
          await prisma.collaborators.update({
            where: { id_collaborator: parseInt(id) },
            data: { status: 'Rechazada' },
          });
        } else if (section === 'SEDES') {
          await prisma.venues.update({
            where: { id_venue: parseInt(id) },
            data: { status: 'Rechazada' },
          });
        }
      } else {
        res.status(400).json({ message: 'Invalid status' });
        return;
      }
      res.json({ message: 'Registration updated' });
    } catch (error) {
      console.error('Error updating registration:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
);
exports.default = router;
