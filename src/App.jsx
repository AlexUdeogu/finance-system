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

  useEffect(() => {
    let timeoutId;

    // Function to log out the user
    const logoutUser = () => {
      alert("You have been logged out due to inactivity.");
      localStorage.removeItem('token'); // Remove token (or any other session data)
      localStorage.removeItem('userId');
      navigate('/login'); // Redirect to the login page
    };

    // Function to reset the timeout when there is user activity
    const resetLogoutTimer = () => {
      if (timeoutId) clearTimeout(timeoutId); // Clear the old timeout
      // Set new 10-minute timer
      timeoutId = setTimeout(logoutUser, 10 * 60 * 1000); // 10 minutes = 600,000 milliseconds
    };

    // Set up event listeners for user interactions
    const events = ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    events.forEach((event) => window.addEventListener(event, resetLogoutTimer));

    // Set the initial timer
    resetLogoutTimer();

    // Clean up event listeners on component unmount
    return () => {
      events.forEach((event) => window.removeEventListener(event, resetLogoutTimer));
      if (timeoutId) clearTimeout(timeoutId); // Clear the timeout when component unmounts
    };
  }, [navigate]);

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
