import express from 'express';
import { validateSuperUser } from '../validators/superuserValidator';
import superuserController from '../controllers/superuser.controller';
import { authMiddleware, roleMiddleware } from '../middlewares/authMiddleware';

function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
const router = express.Router();

router.get('/', asyncHandler(authMiddleware), roleMiddleware(['admin']), superuserController.getAll);
router.post('/', validateSuperUser, superuserController.create);
router.get('/:id', asyncHandler(authMiddleware), superuserController.getById);
router.put(
  '/:id',
  asyncHandler(authMiddleware),
  roleMiddleware(['admin']),
  validateSuperUser,
  superuserController.update,
);
router.delete('/:id', asyncHandler(authMiddleware), roleMiddleware(['admin']), superuserController.remove);
export default router;
module.exports = router;
