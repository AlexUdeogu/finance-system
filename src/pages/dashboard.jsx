import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import NoData from './nodata'; // Import the NoData component

const Dashboard = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');
  const [username, setUsername] = useState('');
  const [hasData, setHasData] = useState(true); // New state to track if data exists
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for dropdown menu

  useEffect(() => {
    setActiveLink(location.pathname);
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || '');
    
    // Check if user has any data
    const checkUserData = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const [incomeResponse, expenseResponse] = await Promise.all([
        axios.get('https://finaki-backend.onrender.com/api/v1/income/user', {
          headers: { Authorization: `Bearer ${token}` },
          params: { userId: userId }
          }),
          axios.get('https://finaki-backend.onrender.com/api/v1/expense/user', {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

      const hasIncomes = incomeResponse.data.Incomes.length > 0;
      const hasExpenses = expenseResponse.data.Expenses.length > 0;

      setHasData(hasIncomes || hasExpenses);
    };

    checkUserData();
  }, [location]);

  const downloadUserHistory = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const incomeResponse = await axios.get('https://finaki-backend.onrender.com/api/v1/income/user', {
      headers: { Authorization: `Bearer ${token}` },
      params: { userId: userId }
    });

    const expenseResponse = await axios.get('https://finaki-backend.onrender.com/api/v1/expense/user', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const incomes = incomeResponse.data.Incomes.map(income => ({ ...income, type: 'income' }));
    const expenses = expenseResponse.data.Expenses.map(expense => ({ ...expense, type: 'expense' }));

    const allTransactions = [...incomes, ...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

    const csvContent = [
      ['Type', 'Title', 'Amount', 'Date', 'Description'],
      ...allTransactions.map(transaction => [
        transaction.type,
        transaction.title,
        transaction.amount,
        new Date(transaction.date).toLocaleDateString(),
        transaction.description || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'user_transaction_history.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close the dropdown when a link is clicked
  };

  return (
    <div className='font-manrope'>
      <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-300/[0.06] bg-white/95">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <h1 className="text-3xl font-bold text-gray-800">QuantaBudget</h1>
          </Link>

          {/* Toggle button for small screens */}
          <div className="flex items-center lg:hidden ml-auto">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 focus:outline-none">
              ☰
            </button>
          </div>

          {/* Navigation links for small screens */}
          <div className={`absolute left-0 top-1 bg-white shadow-lg rounded-md mt-3 w-full transition-all duration-300 ${isMenuOpen ? 'block' : 'hidden'} lg:hidden`}>
            <Link to="/dashboard/info" onClick={handleLinkClick} className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">
              Dashboard
            </Link>
            <Link to="/dashboard/income" onClick={handleLinkClick} className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">
              Incomes
            </Link>
            <Link to="/dashboard/expense" onClick={handleLinkClick} className="block px-4 py-2 text-gray-800 hover:bg-yellow-400">
              Expenses
            </Link>
          </div>

          {/* Navigation links for larger screens */}
          <div className="hidden lg:flex flex-grow justify-start items-center ml-12 font-bold space-x-10">
            <Link 
              to="/dashboard/info" 
              className={`text-gray-800 transition duration-300 ${activeLink === '/dashboard/info' ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/dashboard/income" 
              className={`text-gray-800 transition duration-300 ${activeLink === '/dashboard/income' ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
            >
              Incomes
            </Link>
            <Link 
              to="/dashboard/expense" 
              className={`text-gray-800 transition duration-300 ${activeLink === '/dashboard/expense' ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
            >
              Expenses
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Hide the username on mobile */}
            <p className='font-semibold text-gray-800 hidden lg:block' title={username || 'User'}>
              Hello, {username || 'User'}
            </p>  
            <button
              onClick={downloadUserHistory}
              className="text-black bg-yellow-400 hover:bg-black font-bold hover:text-white py-2 px-4 rounded-full transition duration-300 hidden lg:block"
            >
              Download History
            </button>
            <Link 
              to="/login"
              className="text-white bg-black hover:bg-yellow-400 font-bold hover:text-black py-2 px-4 rounded-full transition duration-300 hidden lg:block"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 sm:px-6 py-4'>
        {location.pathname === '/dashboard/info' && !hasData ? (
          <NoData />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
