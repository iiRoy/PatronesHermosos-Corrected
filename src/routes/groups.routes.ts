import express, { Request, Response } from 'express';
import groupController from '../controllers/groups.controller';
import { authMiddleware, roleMiddleware } from '../middlewares/authMiddleware';

function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
const router = express.Router();

router.get('/', groupController.getAll);

router.get(
  '/:id_group/excluded_days',
  asyncHandler(async (req: Request, res: Response) => {
    const { id_group } = req.params;
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    const days = await prisma.excluded_days.findMany({
      where: { id_group: Number(id_group) },
      select: { excluded_date: true, reason: true },
      orderBy: { excluded_date: 'asc' },
    });
    if (!days || days.length === 0) {
      return res.status(404).json([]);
    }
    res.json(days);
  }),
);
router.post('/', groupController.createGroup);
router.patch('/:id', groupController.updateGroup);
router.patch(
  '/:id/status',
  asyncHandler(authMiddleware),
  roleMiddleware(['superuser', 'venue_coordinator']),
  groupController.changeGroupStatus,
);
export default router;
module.exports = router;
