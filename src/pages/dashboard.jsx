import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');
  const [username, setUsername] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setActiveLink(location.pathname);
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || '');
  }, [location]);

  const downloadUserHistory = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      console.error('Authentication details are missing.');
      return;
    }

    try {
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
    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
  };

  return (
    <div className='font-manrope'>
      <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-300/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">QuantaBudget</h1>
          </Link>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          <div className={`lg:flex flex-grow justify-start items-center ml-12 font-bold space-y-4 lg:space-y-0 lg:space-x-10 ${isMenuOpen ? 'flex flex-col absolute top-full left-0 right-0 bg-white p-4' : 'hidden'}`}>
            <Link 
              to="/dashboard/info" 
              className={`text-gray-800 transition duration-300 ${activeLink === '/dashboard/info' ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/dashboard/income" 
              className={`text-gray-800 transition duration-300 ${activeLink === '/dashboard/income' ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Incomes
            </Link>
            <Link 
              to="/dashboard/expense" 
              className={`text-gray-800 transition duration-300 ${activeLink === '/dashboard/expense' ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Expenses
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <p className='font-semibold text-gray-800 '>Hello, {username || 'User'}</p>  
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

      {/* Mobile user info and buttons */}
      <div className="lg:hidden px-4 py-2 bg-gray-100">
        <p className='font-semibold text-gray-800 mb-2'>Hello, {username || 'User'}</p>
        <button
          onClick={downloadUserHistory}
          className="text-black bg-yellow-400 hover:bg-black font-bold hover:text-white py-2 px-4 rounded-full transition duration-300 w-full mb-2"
        >
          Download History
        </button>
        <Link 
          to="/login"
          className="text-white bg-black hover:bg-yellow-400 font-bold hover:text-black py-2 px-4 rounded-full transition duration-300 w-full block text-center"
        >
          Sign Out
        </Link>
      </div>

      <div className='container mx-auto px-4 sm:px-6 py-4'>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
