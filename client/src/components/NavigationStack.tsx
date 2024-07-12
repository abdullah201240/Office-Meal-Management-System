import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './Main';
import Login from './User/Login';
import Home from './User/Home';
import ProtectedRoute from './ProtectedRoute';
export default function NavigationStack() {
  return (
    <div>
      <Routes>
        <Route path='/main' element={<Main />} /> 
        <Route path='/login' element={<Login />} /> 
        <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

        <Route path='*' element={<Navigate to="/main" />} />
      </Routes>
    </div>
  );
}
