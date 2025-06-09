import express from 'express';
import authRoutes from './auth.routes';
import venueRoutes from './venue.routes';
import participantRoutes from './participants.routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/venues', venueRoutes);
router.use('/participants', participantRoutes);

export default router;
