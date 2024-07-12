import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/adminLogin';
import { clearAdminAuth } from '../redux/adminAuthSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { useFoodsQuery } from '../api/ViewAllFoodApi';
import '../../assets/css/Style.css';
import { adminMenuItems } from './AdminMenuItems';
import { API } from '../../config';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

export default function ViewAllFoods() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: foods, isLoading, isError, error, refetch } = useFoodsQuery();

  const [showModal, setShowModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [updatedFood, setUpdatedFood] = useState({
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

  const handleUpdate = (food: any) => {
    setSelectedFood(food);
    setUpdatedFood({
      foodMenu: food.foodMenu,
      type: food.type,
      price: food.price,
      day: food.day,
      foodImage: null,
    });
    setShowModal(true);
  };

  const handleDelete = async (foodId: string) => {
    try {
      await axios.delete(`${API}api/admin/delete-food-item/${foodId}`);
      refetch();
    } catch (error) {
      console.error('Error deleting food item:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setUpdatedFood((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleFormSubmit = async () => {
    const formData = new FormData();
    formData.append('foodMenu', updatedFood.foodMenu);
    formData.append('type', updatedFood.type);
    formData.append('price', updatedFood.price);
    formData.append('day', updatedFood.day);
    if (updatedFood.foodImage) {
      formData.append('foodImage', updatedFood.foodImage);
    }

    try {
      await axios.put(`${API}api/admin/update-food-item/${selectedFood.id}`, formData);
      setShowModal(false);
      refetch();
    } catch (error) {
      console.error('Error updating food item:', error);
    }
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
                    onClick={() => handleUpdate(food)}
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Food Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Food Menu</Form.Label>
              <Form.Control
                type="text"
                name="foodMenu"
                value={updatedFood.foodMenu}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Food Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={updatedFood.type}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={updatedFood.price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Day</Form.Label>
              <Form.Control
                type="text"
                name="day"
                value={updatedFood.day}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Food Image</Form.Label>
              <Form.Control
                type="file"
                name="foodImage"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
