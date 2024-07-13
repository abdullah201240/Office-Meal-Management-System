import React from 'react';
import Navbar from '../Navbar';
import { userMenuItems } from './UserMenuItems';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useLogin';
import { clearAuth } from '../redux/authSlice';
import '../../assets/css/Style.css';
import { useFoodsQuery } from '../api/ViewAllOrderApi';
import { API } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBangladeshiTakaSign } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

export default function Order() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userEmail = useAppSelector((state) => state.auth.email);
    const handleLogout = () => {
        dispatch(clearAuth());
        navigate('/login');
    };
    const { data: foods, isError, error, refetch } = useFoodsQuery(userEmail);

    const menuItems = [...userMenuItems, { name: 'Logout', onClick: handleLogout }];

    return (
        <div className="background-radial-gradient" style={{ overflowY: 'scroll' }}>
            <Navbar menuItems={menuItems} />
            <div className="admin-content">
                <h1 style={{ color: 'white', textAlign: 'center' }}>Order List</h1>
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
                                <th scope="col">Status</th>
                                <th scope="col">Order Date Time</th>

                            </tr>
                        </thead>
                        <tbody>
                            {foods && foods.map((food: any, index: number) => (
                                <tr key={food.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        {food.foodMenu.split(',').map((menu: string, idx: number) => (
                                            <div key={idx}>{menu}</div>
                                        ))}
                                    </td>
                                    <td>
                                        {food.type.split(',').map((type: string, idx: number) => (
                                            <div key={idx}>{type}</div>
                                        ))}
                                    </td>
                                    <td>
                                        <FontAwesomeIcon icon={faBangladeshiTakaSign} style={{ marginRight: '5px' }} />
                                        {food.price}
                                    </td>
                                    <td>
                                        {food.day.split(',').map((day: string, idx: number) => (
                                            <div key={idx}>{day}</div>
                                        ))}
                                    </td>
                                    <td>
                                        {food.foodImage.split(',').map((image: string, idx: number) => (
                                            <img key={idx} src={`${API}${image}`} alt="Food" style={{ width: '50px', height: '50px', marginRight: '5px' }} />
                                        ))}
                                    </td>
                                    <td>{food.status}</td>
                                    <td>{moment(food.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
