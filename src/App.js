import logo from './logo.svg';
import './App.css';
import BaseInput from './components/BaseInput';
import Signup from './components/Signup';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Employees from './components/emp/Employees';
import Layout from './components/Layout';
import CreateEmployee from './components/emp/CreateEmployee';
import ViewEmployee from './components/emp/ViewEmployee';
import EditEmployee from './components/emp/EditEmployee';
import { useState } from 'react';
import UserContext from './context/UserContext';

function App() {

  const [userToken, setUserToken] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Login setUserToken={setUserToken} />} />
          <Route path='signup' element={<Signup />} />
        </Route>
        <Route path='/employees' element={<Layout />}>
          <Route index element={<Employees />} />
          <Route path='create' element={<CreateEmployee />} />
          <Route path=':id' element={<ViewEmployee />} />
          <Route path='edit/:id' element={<EditEmployee/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
