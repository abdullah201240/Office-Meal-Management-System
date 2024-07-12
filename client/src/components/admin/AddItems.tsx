import React, { ChangeEvent, FormEvent, useState } from 'react';
import Navbar from '../Navbar';
import { useAppDispatch } from '../hooks/adminLogin';

import { adminMenuItems } from './AdminMenuItems';
import { clearAdminAuth } from '../redux/adminAuthSlice';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/Style.css';
import '../../assets/css/from.css';

export default function AddItems() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        
        menu: '',
        price: '',
        day: '',
        image: null
    });

    const handleLogout = () => {
        dispatch(clearAdminAuth());
        navigate('/adminLogin');
    };

    const menuItems = [...adminMenuItems, { name: 'Logout', onClick: handleLogout }];

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        console.log(formData);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
        const { id, value } = event.target;
        if (event.target instanceof HTMLInputElement && event.target.type === 'file') {
            setFormData({
                ...formData,
                [id]: event.target.files ? event.target.files[0] : null
            });
        } else {
            setFormData({
                ...formData,
                [id]: value
            });
        }
    }

    return (
        <div className='background-radial-gradient'>
            <Navbar menuItems={menuItems} />
            <br/>
            <h1 style={{ color: 'white', textAlign: 'center' }}>Add Items</h1>
            <div className="app-container">
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="menu">Menu</label>
                            <select className="form-control" id="menu" onChange={handleInputChange}>
                                <option value="">Select Menu</option>
                                <option value="Dinner">Dinner</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Breakfast">Breakfast</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input type="text" className="form-control" id="price" onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="day">Day</label>
                            <select className="form-control" id="day" onChange={handleInputChange}>
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
                            <label htmlFor="image">Food Image</label>
                            <input type="file" className="form-control" id="image" onChange={handleInputChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
