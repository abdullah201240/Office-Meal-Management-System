import express from 'express';
import authRoutes from './authRoutes';
import userRoutes from './route';
import adminAuthRouts from './adminauthRoutes'
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/adminAuth', adminAuthRouts);

export default router;
