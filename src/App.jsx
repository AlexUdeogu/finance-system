import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landingpage from './pages/landingpage';
import Signup from './pages/signup';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Info from './components/info';
import Income from './components/income';
import Expense from './components/expense';
import Settings from './components/settings';


function App() {
  return (
    <Router>
      <div>
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
    </Router>
  );
}

export default App;
