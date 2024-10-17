import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Landingpage from './pages/landingpage';
import Signup from './pages/signup';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Info from './components/info';
import Income from './components/income';
import Expense from './components/expense';
import Settings from './components/settings';
import { SpeedInsights } from "@vercel/speed-insights/react";

const App = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <SpeedInsights />
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Info />} />  {/* Default route for Dashboard */}
          <Route path="info" element={<Info />} />
          <Route path="income" element={<Income />} />
          <Route path="expense" element={<Expense />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
}

const WrappedApp = () => {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default WrappedApp;
