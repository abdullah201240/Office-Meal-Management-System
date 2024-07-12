import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useLogin';
import { clearAuth } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = useAppSelector((state) => state.auth.email);

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate('/login');
  };

  const userMenuItems = [
    { name: 'Home', link: '/home' },
    { name: 'Cart', link: '/cart' },
    { name: 'Profile', link: '/profile' },
    { name: 'Logout', onClick: handleLogout } // pass handleLogout directly to Navbar
  ];

  return (
    <div>
      <Navbar menuItems={userMenuItems} />
      <h1>Home Page</h1>
      {email && <p>Welcome, {email}!</p>}
    </div>
  );
};

export default Home;
