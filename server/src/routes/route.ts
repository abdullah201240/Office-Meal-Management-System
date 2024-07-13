import express from 'express';
import { getUsers, getUserById, updateUser, deleteUser,addToCart } from '../controller/userController';


const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser); 
router.delete('/users/:id', deleteUser); 
router.post('/cart', addToCart);


export default router;
