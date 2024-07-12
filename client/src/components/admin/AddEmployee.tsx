import React from 'react';
import { useAppDispatch } from '../hooks/adminLogin';
import { useNavigate } from 'react-router-dom';
import { clearAdminAuth } from '../redux/adminAuthSlice';
import Navbar from '../Navbar';
import { adminMenuItems } from './AdminMenuItems'; // Import adminMenuItems

export default function AddEmployee() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAdminAuth());
    navigate('/adminLogin');
  };

  const menuItems = [...adminMenuItems, { name: 'Logout', onClick: handleLogout }];

  return (
    <div>
      <Navbar menuItems={menuItems} />
      {/* Your page content */}
    </div>
  );
}
