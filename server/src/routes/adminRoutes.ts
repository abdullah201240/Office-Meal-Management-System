import express from 'express';
import upload from '../middleware/upload';
import { addFoodItem, getAllItems, deleteFoodItem, updateFoodItem,viewOrder } from '../controller/adminController';

const router = express.Router();

router.post('/add-food-item', upload.single('foodImage'), addFoodItem);
router.get('/all-items', getAllItems);
router.delete('/delete-food-item/:id', deleteFoodItem);
router.put('/update-food-item/:id', upload.single('foodImage'), updateFoodItem);
router.get('/view-Order', getAllItems);

export default router;
