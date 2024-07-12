import express from 'express';
import upload from '../middleware/upload';
import {addFoodItem,getAllItems} from '../controller/adminController'
const router = express.Router();
router.post('/add-food-item', upload.single('foodImage'), addFoodItem);
router.get('/all-items', getAllItems);  
export default router;