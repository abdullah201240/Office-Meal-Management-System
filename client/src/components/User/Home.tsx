import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useLogin';
import { clearAuth } from '../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { userMenuItems } from './UserMenuItems';
import { useFoodsQuery } from '../api/ViewAllFoodApi';
import { API } from '../../config';

import '../../assets/css/Style.css';

export default function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = useAppSelector((state) => state.auth.email);

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate('/login');
  };

  const { data: foods, isLoading, isError, error, refetch } = useFoodsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const menuItems = [...userMenuItems, { name: 'Logout', onClick: handleLogout }];

  const todaysMenu = foods.filter((food: { day: string; }) => food.day === new Date().toLocaleDateString('en-US', { weekday: 'long' }));
  const allMenu = foods;

  return (
    <div className="background-radial-gradient">
      <Navbar menuItems={menuItems} />
      <main className="main" style={{ padding: '20px', overflowY: 'auto', height: 'calc(100vh - 60px)' }}>
        <section>
          <div className="container">
            <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>Today's Menu</h1>
            <div className="row gy-5">
              {todaysMenu.map((food: any) => (
                <div className="col-lg-4" key={food.id}>
                  <div className="card" style={{ padding: '15px' }}>
                    <img src={`${API}${food.foodImage}`} className="card-img-top" alt="Food" />
                    <div className="card-body" style={{ paddingTop: '20px', position: 'relative' }}>
                      <h5 className="card-title">{food.foodMenu}</h5>
                      <p className="card-text">
                        <span>Type: {food.type}</span><br />
                        <span>Price: {food.price}</span><br />
                        <span>Day: {food.day}</span>
                        <br /><br />
                      </p>
                      <Link to="/login" className="btn btn-success" style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>Add Card</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>All Menu</h1>
            <div className="row gy-5">
              {allMenu.map((food: any) => (
                <div className="col-lg-4" key={food.id}>
                  <div className="card" style={{ padding: '15px' }}>
                    <img src={`${API}${food.foodImage}`} className="card-img-top" alt="Food" />
                    <div className="card-body" style={{ paddingTop: '20px', position: 'relative' }}>
                      <h5 className="card-title">{food.foodMenu}</h5>
                      <p className="card-text">
                        <span>Type: {food.type}</span><br />
                        <span>Price: {food.price}</span><br />
                        <span>Day: {food.day}</span>
                        <br /><br />
                      </p>
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
