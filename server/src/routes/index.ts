import express from 'express';
import authRoutes from './authRoutes';
import userRoutes from './route';
import adminAuthRouts from './adminauthRoutes'
import adminRoutes from './adminRoutes'
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/adminAuth', adminAuthRouts);
router.use('/admin', adminRoutes);


export default router;
