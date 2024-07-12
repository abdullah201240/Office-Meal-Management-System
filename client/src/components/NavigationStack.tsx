import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './Main';
import Login from './User/Login';

export default function NavigationStack() {
  return (
    <div>
      <Routes>
        <Route path='/main' element={<Main />} /> 
        <Route path='/login' element={<Login />} /> 
        <Route path='*' element={<Navigate to="/main" />} />
      </Routes>
    </div>
  );
}
