import React from 'react';
import { useAppDispatch } from '../hooks/adminLogin';
import { clearAdminAuth } from '../redux/adminAuthSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import '../../assets/css/Style.css';

const AdminHome: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAdminAuth());
    navigate('/adminLogin');
  };

  const handleUpdate = (userId: string) => {
    // Logic for updating user with ID userId
    console.log(`Updating user with ID: ${userId}`);
  };

  const handleDelete = (userId: string) => {
    // Logic for deleting user with ID userId
    console.log(`Deleting user with ID: ${userId}`);
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

  const users = [
    { id: '1', name: 'Mark Otto', username: '@mdo', email: 'mark@example.com' },
    { id: '2', name: 'Jacob Thornton', username: '@fat', email: 'jacob@example.com' },
    { id: '3', name: 'Larry the Bird', username: '@twitter', email: 'larry@example.com' },
  ];

  return (
    <div className='background-radial-gradient'>
      <Navbar menuItems={adminMenuItems} />
      
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
            {users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td className="btn-group">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleUpdate(user.id)}
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
    </div>
  );
};

export default AdminHome;
