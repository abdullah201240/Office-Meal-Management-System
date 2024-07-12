import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../assets/css/Style.css';
import { useFoodsQuery } from '../components/api/ViewAllFoodApi';
import { API } from '../config';

const mainMenuItems = [
  { name: 'Home', link: '/' },
  { name: 'Login', link: '/login' }
];

export default function Main() {
  const { data: foods, isLoading, isError, error, refetch } = useFoodsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='background-radial-gradient' style={{ overflowY: 'auto', height: '100vh' }}>
      <Navbar menuItems={mainMenuItems} />
      <main className="main" style={{ padding: '20px' }}>
        <section>
          <div className="container">
            <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>Menu</h1>
            <div className="row gy-5">
              {foods.map((food: any) => (
                <div className="col-lg-4" key={food.id}>
                  <div className="card" style={{ padding: '15px' }}>
                    <img src={`${API}${food.foodImage}`} className="card-img-top" alt="Food" />
                    <div className="card-body" style={{ paddingTop: '20px', position: 'relative' }}>
                      <h5 className="card-title">{food.foodMenu}</h5>
                      <p className="card-text">
                        <span>Type: {food.type}</span><br />
                        <span>Price: {food.price}</span><br />
                        <span>Day: {food.day}</span>
                        <br />
                        <br />
                        
                      </p>
                     

                      <Link to="/login" className="btn btn-success" style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>Add Card</Link>
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
