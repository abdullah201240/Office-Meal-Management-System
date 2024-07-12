import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/adminLogin';
import { useNavigate } from 'react-router-dom';
import { clearAdminAuth } from '../redux/adminAuthSlice';
import Navbar from '../Navbar';
import { adminMenuItems } from './AdminMenuItems';
import '../../assets/css/Style.css';
import '../../assets/css/from.css';
import { useMutation } from '@tanstack/react-query';
import { createItems } from '../api/addItemsApi'; // Import the service function

interface ItemsFormData {
    foodMenu: string;
    type: string;
    price: string;
    day: string;
    foodImage: File | null;
}

export default function AddItems() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ItemsFormData>({
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

    const { mutate } = useMutation<void, Error, FormData>({
        mutationFn: createItems,
        onSuccess: () => {
            alert('Item created successfully!');
            navigate('/adminHome');
        },
        onError: (error: Error) => {
            alert('Failed to create item. Please try again.');
        },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('foodMenu', formData.foodMenu);
        formDataToSubmit.append('type', formData.type);
        formDataToSubmit.append('price', formData.price);
        formDataToSubmit.append('day', formData.day);
        if (formData.foodImage) {
            formDataToSubmit.append('foodImage', formData.foodImage);
        }

        try {
            await mutate(formDataToSubmit);
        } catch (error) {
            console.error('Error creating item:', error);
            alert('Failed to create item. Please try again.');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
            setFormData({
                ...formData,
                [id]: e.target.files ? e.target.files[0] : null,
            });
        } else {
            setFormData({
                ...formData,
                [id]: value,
            });
        }
    };

    return (
        <div className='background-radial-gradient'>
            <Navbar menuItems={menuItems} />
            <br />
            <h1 style={{ color: 'white', textAlign: 'center' }}>Add Items</h1>
            <div className="app-container">
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="foodMenu">Food Menu</label>
                            <input
                                type="text"
                                className="form-control"
                                id="foodMenu"
                                value={formData.foodMenu}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="type">Type</label>
                            <select
                                className="form-control"
                                id="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="Dinner">Dinner</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Breakfast">Breakfast</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input
                                type="text"
                                className="form-control"
                                id="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="day">Day</label>
                            <select
                                className="form-control"
                                id="day"
                                value={formData.day}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Day</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="foodImage">Food Image</label>
                            <input
                                type="file"
                                className="form-control"
                                id="foodImage"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
