import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/adminLogin';
import { useNavigate } from 'react-router-dom';
import { clearAdminAuth } from '../redux/adminAuthSlice';
import Navbar from '../Navbar';
import { adminMenuItems } from './AdminMenuItems';
import '../../assets/css/Style.css';
import '../../assets/css/from.css';
import { useMutation } from '@tanstack/react-query';
import { createEmployee, EmployeeFormData } from '../api/addEmployee'; // Import the service function

export default function AddEmployee() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<EmployeeFormData>({
    username: '',
    name: '',
    email: '',
    password: '',
  });

  const handleLogout = () => {
    dispatch(clearAdminAuth());
    navigate('/adminLogin');
  };

  const menuItems = [...adminMenuItems, { name: 'Logout', onClick: handleLogout }];

  const { mutate } = useMutation<void, Error, EmployeeFormData>({
    mutationFn: createEmployee,
    onSuccess: () => {
      
      
      alert('Employee created successfully!');
      navigate('/adminHome');
    },
    onError: (error: Error) => {
      
      
      alert('Failed to create employee. Please try again.');
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await mutate(formData);
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle error state or display error message
      alert('Failed to create employee. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className='background-radial-gradient'>
      <Navbar menuItems={menuItems} />
      <br/>
      <h1 style={{ color: 'white', textAlign: 'center' }}>Add Employee</h1>
      <div className="app-container">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputName">Name</label>
              <input type="text" className="form-control" id="name" aria-describedby="nameHelp" onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputUsername">Username</label>
              <input type="text" className="form-control" id="username" onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={handleInputChange} />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="password" onChange={handleInputChange} />
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
