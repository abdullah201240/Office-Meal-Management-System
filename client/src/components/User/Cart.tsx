import React from 'react';
import Navbar from '../Navbar';
import { userMenuItems } from './UserMenuItems';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useLogin';
import { clearAuth } from '../redux/authSlice';
import '../../assets/css/Style.css';
import { useFoodsQuery } from '../api/ViewAllCartApi';
import { API } from '../../config';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBangladeshiTakaSign } from '@fortawesome/free-solid-svg-icons';

export default function Cart() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userEmail = useAppSelector((state) => state.auth.email);
    const handleLogout = () => {
        dispatch(clearAuth());
        navigate('/login');
    };

    const { data: foods, isError, error, refetch } = useFoodsQuery(userEmail);

    const menuItems = [...userMenuItems, { name: 'Logout', onClick: handleLogout }];

    const handleDelete = async (foodId: string) => {
        try {
            await axios.delete(`${API}api/user/delete-from-cart/${foodId}`);
            refetch();
        } catch (error) {
            console.error('Error deleting food item:', error);
        }
    };

    const calculateTotal = () => {
        return foods?.reduce((total: number, food: any) => total + food.price, 0) || 0;
    };

    const handlePlaceOrder = () => {
        console.log('Order placed');
    };

    const totalAmount = Number(calculateTotal());

    return (
        <div className="background-radial-gradient" style={{ overflowY: 'scroll' }}>
            <Navbar menuItems={menuItems} />
            <div className="admin-content">
                <h1 style={{ color: 'white', textAlign: 'center' }}>Cart</h1>
                {isError && <p>Error: {error.message}</p>}
                <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    <table className="table table-dark table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Food Menu</th>
                                <th scope="col">Food Type</th>
                                <th scope="col">Price (BDT)</th>
                                <th scope="col">Day</th>
                                <th scope="col">Food Image</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foods && foods.map((food: any, index: number) => (
                                <tr key={food.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{food.foodMenu}</td>
                                    <td>{food.type}</td>
                                    <td>
                                        <FontAwesomeIcon icon={faBangladeshiTakaSign} style={{ marginRight: '5px' }} />
                                        {food.price}
                                    </td>
                                    <td>{food.day}</td>
                                    <td><img src={`${API}${food.foodImage}`} alt="Food" style={{ width: '50px', height: '50px' }} /></td>
                                    <td className="btn-group">
                                        <button
                                            className="btn btn-danger btn-sm ms-2"
                                            onClick={() => handleDelete(food.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="text-center mt-4">
                    <h2 style={{ color: 'white' }}>
                        Total Amount: 
                        <FontAwesomeIcon icon={faBangladeshiTakaSign} style={{ marginLeft: '5px', marginRight: '5px' }} />
                        {totalAmount.toFixed(2)}
                    </h2>
                    <br/>
                    <button className="btn btn-success" onClick={handlePlaceOrder}>Place Order</button>
                </div>
            </div>
        </div>
    );
}
