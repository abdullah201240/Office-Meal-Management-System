import React from 'react'
import Navbar from '../Navbar';
import { userMenuItems } from './UserMenuItems';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useLogin';
import { clearAuth } from '../redux/authSlice';
import '../../assets/css/Style.css';
import { useFoodsQuery } from '../api/ViewAllFoodApi';
import { API } from '../../config';
import axios from 'axios';

export default function Cart() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(clearAuth());
        navigate('/login');
      };
 const { data: foods, isLoading, isError, error, refetch } = useFoodsQuery();

const menuItems = [...userMenuItems, { name: 'Logout', onClick: handleLogout }];
const handleDelete = async (foodId: string) => {
    try {
      await axios.delete(`${API}api/admin/delete-food-item/${foodId}`);
      refetch();
    } catch (error) {
      console.error('Error deleting food item:', error);
    }
  };
  return (
    <div className="background-radial-gradient">
              <Navbar menuItems={menuItems} />
              <div className="admin-content">
        <h1 style={{ color: 'white', textAlign: 'center' }}>Cart</h1>

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
  )
}
