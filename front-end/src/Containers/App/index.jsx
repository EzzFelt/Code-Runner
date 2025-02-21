import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Home from '../../Pages/Home';
import Consults from '../../Pages/Consults';
import Exercises from '../../Pages/Exercises';
import Navbar from '../../Components/NavBar/NavBar';
import SubNavbar from '../../Components/SubNav/SubNav';
import Lesson1 from '../../Lessons/Lesson1';
import Lesson2 from '../../Lessons/Lesson2';
import Lesson3 from '../../Lessons/Lesson3';
import Login from '../../Pages/Login';
import Signup from '../../Pages/Signup';
import ResetPassword from '../../Pages/ResetPassword';
import { UserProvider } from '../../Contexts/UserContext';

// Layout para páginas que incluem Navbar e SubNavbar
const MainLayout = () => (
  <>
    <Navbar />
    <SubNavbar />
    <Outlet />
  </>
);

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Rotas de Login, Signup e ResetPassword */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Roteamento principal com Navbar e SubNavbar */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/consults" element={<Consults />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/lessons/lesson1" element={<Lesson1 />} />
            <Route path="/lessons/lesson2" element={<Lesson2 />} />
            <Route path="/lessons/lesson3" element={<Lesson3 />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>

  );
};

export default App;
