import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Login } from './pages/Login/index';
import { Home } from './pages/Home/index';

import { PrivateRoute } from './components/PrivateRoute/index';

import { GlobalStyle } from './style/style';

export function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </Router>
  );
}