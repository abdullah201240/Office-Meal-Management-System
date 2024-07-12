import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/adminLogin';
import { clearAdminAuth } from '../redux/adminAuthSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { useUsersQuery } from '../api/viewAllUser'; // Assuming this hook is defined for fetching users
import '../../assets/css/Style.css';
import { adminMenuItems } from './AdminMenuItems';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { API } from '../../config';

export default function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: users, isLoading, isError, error, refetch } = useUsersQuery();

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    username: '',
    email: '',
  });

  const handleLogout = () => {
    dispatch(clearAdminAuth());
    navigate('/adminLogin');
  };

  const menuItems = [...adminMenuItems, { name: 'Logout', onClick: handleLogout }];

  const handleUpdate = (user: any) => {
    setSelectedUser(user);
    setUpdatedUser({
      name: user.name,
      username: user.username,
      email: user.email,
    });
    setShowModal(true);
  };

  const handleDelete = async (userId: string) => {
    try {
      await axios.delete(`${API}api/user/users/${userId}`);
      refetch();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      await axios.put(`${API}api/user/users/${selectedUser.id}`, updatedUser);
      setShowModal(false);
      refetch();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className='background-radial-gradient'>
      <Navbar menuItems={menuItems} />
      <div className="admin-content">
        <h1 style={{ color: 'white', textAlign: 'center' }}>All User List</h1>

        <table className="table table-dark table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any, index: number) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td className="btn-group">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleUpdate(user)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleDelete(user.id)}
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
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={updatedUser.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={updatedUser.username}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={updatedUser.email}
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
