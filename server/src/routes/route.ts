import express from 'express';
import { getUser, getUserById } from '../controller/userController';
import upload from '../middleware/upload';
import addFoodItem from '../controller/adminController'
const router = express.Router();

router.get('/users', getUser);
router.get('/users/:id', getUserById);
router.post('/add-food-item', upload.single('foodImage'), addFoodItem);


export default router;

