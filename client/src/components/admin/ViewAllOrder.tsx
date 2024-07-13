import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/adminLogin';
import { clearAdminAuth } from '../redux/adminAuthSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { useFoodsQuery } from '../api/adminViewAllOrder';
import '../../assets/css/Style.css';
import { adminMenuItems } from './AdminMenuItems';
import { API } from '../../config';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBangladeshiTakaSign } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

export default function ViewAllOrder() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { data: foods, isLoading, isError, error, refetch } = useFoodsQuery();

    const [showModal, setShowModal] = useState(false);
    const [selectedFood, setSelectedFood] = useState<any>(null);
    const [updatedFood, setUpdatedFood] = useState({
        foodMenu: '',
        type: '',
        price: '',
        day: '',
        foodImage: null,
    });

    const handleLogout = () => {
        dispatch(clearAdminAuth());
        navigate('/adminLogin');
    };

    const menuItems = [...adminMenuItems, { name: 'Logout', onClick: handleLogout }];

    const handleUpdate = (food: any) => {
        setSelectedFood(food);
        setUpdatedFood({
            foodMenu: food.foodMenu,
            type: food.type,
            price: food.price,
            day: food.day,
            foodImage: null,
        });
        setShowModal(true);
    };

    const handleDelete = async (foodId: string) => {
        try {
            await axios.delete(`${API}api/admin/delete-food-item/${foodId}`);
            refetch();
        } catch (error) {
            console.error('Error deleting food item:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        setUpdatedFood((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleFormSubmit = async () => {
        const formData = new FormData();
        formData.append('foodMenu', updatedFood.foodMenu);
        formData.append('type', updatedFood.type);
        formData.append('price', updatedFood.price);
        formData.append('day', updatedFood.day);
        if (updatedFood.foodImage) {
            formData.append('foodImage', updatedFood.foodImage);
        }

        try {
            await axios.put(`${API}api/admin/update-food-item/${selectedFood.id}`, formData);
            setShowModal(false);
            refetch();
        } catch (error) {
            console.error('Error updating food item:', error);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className='background-radial-gradient'>
            <Navbar menuItems={menuItems} />
            <div className="admin-content">
                <h1 style={{ color: 'white', textAlign: 'center' }}>All Order List</h1>

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
                                <td className="btn-group">
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => handleUpdate(food)}
                                    >
                                        Delivered
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm ms-2"
                                        onClick={() => handleDelete(food.id)}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </div>
    );
}
