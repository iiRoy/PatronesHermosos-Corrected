import express from 'express';
import groupController from '../controllers/groups.controller';
import { authMiddleware, roleMiddleware } from '../middlewares/authMiddleware';

function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
const router = express.Router();

router.get('/', groupController.getAll);
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
