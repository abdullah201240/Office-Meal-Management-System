import React from 'react';
import { useAppDispatch } from '../hooks/adminLogin';
import { clearAdminAuth } from '../redux/adminAuthSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { useFoodsQuery } from '../api/ViewAllFoodApi'; 
import '../../assets/css/Style.css';
import { adminMenuItems } from './AdminMenuItems'; 
import {API} from '../../config'

export default function ViewAllFoods() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: foods, isLoading, isError, error } = useFoodsQuery(); 

  const handleLogout = () => {
    dispatch(clearAdminAuth());
    navigate('/adminLogin');
  };
  
  const menuItems = [...adminMenuItems, { name: 'Logout', onClick: handleLogout }];

  const handleUpdate = (foodId: string) => {
    console.log(`Updating food with ID: ${foodId}`);
  };

  const handleDelete = (foodId: string) => {
    console.log(`Deleting food with ID: ${foodId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className='background-radial-gradient'>
      <Navbar menuItems={menuItems} />
      <div className="admin-content">
        <h1 style={{ color: 'white', textAlign: 'center' }}>All Food List</h1>

        <table className="table table-dark table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Food Menu</th>
              <th scope="col">Food Type</th>
              <th scope="col">Price</th>
              <th scope="col">Day</th>
              <th scope="col">Food Image</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food: any, index: number) => (
              <tr key={food.id}>
                <th scope="row">{index + 1}</th>
                <td>{food.foodMenu}</td>
                <td>{food.type}</td>
                <td>{food.price}</td>
                <td>{food.day}</td>
                <td><img src={`${API}${food.foodImage}`} alt="Food" style={{ width: '50px', height: '50px' }} /></td>
                <td className="btn-group">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleUpdate(food.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleDelete(food.id)}
                  >
                    Delete
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
