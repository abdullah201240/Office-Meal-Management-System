import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './Main';
import Login from './User/Login';
import Home from './User/Home';
import ProtectedRoute from './ProtectedRoute';
import AdminLogin from './admin/Login';
import AdminHome from './admin/Home';
import AdminProtectedRoute from './AdminProtectedRoute';
import AddEmployee from './admin/AddEmployee';
import AddItems from './admin/AddItems';
import ViewAllFoods from './admin/ViewAllFoods';
export default function NavigationStack() {
  return (
    <div>
      <Routes>
        <Route path='/main' element={<Main />} /> 
        <Route path='/login' element={<Login />} /> 
        <Route
          path="/home"
          element={
            <>
             
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            </>
          }
        />
        <Route path='/adminLogin' element={<AdminLogin />} /> 
        <Route
          path="/adminHome"
          element={
            <>
              
              <AdminProtectedRoute>
                <AdminHome />
              </AdminProtectedRoute>
            </>
          }
        />
        <Route
          path="/admin/add-employee"
          element={
            <>
              
              <AdminProtectedRoute>
                <AddEmployee />
              </AdminProtectedRoute>
            </>
          }
        />
         <Route
          path="/admin/add-items"
          element={
            <>
              
              <AdminProtectedRoute>
                <AddItems />
              </AdminProtectedRoute>
            </>
          }
        />
       

        <Route
          path="/admin/view-items"
          element={
            <>
              
              <AdminProtectedRoute>
                <ViewAllFoods />
              </AdminProtectedRoute>
            </>
          }
        />

        
        <Route path='*' element={<Navigate to="/main" />} />
      </Routes>
    </div>
  );
}
