import express from 'express';
import { getUsers, getUserById, updateUser, deleteUser,addToCart, viewCart, deleteFromCart, placeOrder } from '../controller/userController';


const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser); 
router.delete('/users/:id', deleteUser); 
router.post('/cart', addToCart);
router.get('/viewCart', viewCart)
router.delete('/delete-from-cart/:id', deleteFromCart); 
router.post('/place-order', placeOrder);


export default router;
