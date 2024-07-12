import express from 'express';
import { getUser, getUserById } from '../controller/userController';
import upload from '../middleware/upload';
import {addFoodItem,getAllItems} from '../controller/adminController'
const router = express.Router();

router.get('/users', getUser);
router.get('/users/:id', getUserById);

export default router;

