import React from 'react';
import { useAppDispatch } from '../hooks/adminLogin';
import { clearAdminAuth } from '../redux/adminAuthSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { useUsersQuery } from '../api/viewAllUser'; 
import '../../assets/css/Style.css';
import { adminMenuItems } from './AdminMenuItems'; 


export default function Home () {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: users, isLoading, isError, error } = useUsersQuery(); 

  const handleLogout = () => {
    dispatch(clearAdminAuth());
    navigate('/adminLogin');
  };
  const menuItems = [...adminMenuItems, { name: 'Logout', onClick: handleLogout }];


  const handleUpdate = (userId: string) => {
    // Logic for updating user with ID userId
    console.log(`Updating user with ID: ${userId}`);
  };

  const handleDelete = (userId: string) => {
    // Logic for deleting user with ID userId
    console.log(`Deleting user with ID: ${userId}`);
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

