import React from 'react';
import { useAppDispatch, adminUseAppSelector } from '../hooks/adminLogin';
import { clearAdminAuth } from '../redux/adminAuthSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const AdminHome: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = adminUseAppSelector((state) => state.adminAuth.email);

  const handleLogout = () => {
    dispatch(clearAdminAuth());
    navigate('/adminLogin');
  };

  const adminMenuItems = [
    { name: 'Home', link: '/adminHome' },
    { name: 'Add Employee', link: '/admin/add-employee' },
    { name: 'Add Items', link: '/admin/add-items' },
    { name: 'View Items', link: '/admin/view-items' },
    { name: 'Order List', link: '/admin/order-list' },
    { name: 'Profile', link: '/admin/profile' },
    { name: 'Logout', onClick: handleLogout } 
  ];

  return (
    <div>
      <Navbar menuItems={adminMenuItems} />
      <h1>Admin Home Page</h1>
      {email && <p>Welcome, {email}!</p>}
    </div>
  );
};

export default AdminHome;
