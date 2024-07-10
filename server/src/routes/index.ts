// src/routes/index.ts
import express from 'express';
import authRoutes from './authRoutes';
import userRoutes from './route';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

export default router;
