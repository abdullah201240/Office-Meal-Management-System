import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useLogin';
import { clearAuth } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = useAppSelector((state) => state.auth.email);

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate('/login');
  };

  return (
    <div>
      <h1>Home Page</h1>
      {email && <p>Welcome, {email}!</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
