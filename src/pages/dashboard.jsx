import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className='font-manrope'>
      <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-300/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <h1 className="text-3xl font-bold text-gray-800">Logo</h1>
          </Link>

          <div className="hidden lg:flex flex-grow justify-start items-center ml-12 font-bold space-x-10">
            <Link to="/dashboard/info" className="text-black hover:text-yellow-400 transition duration-300">
              Dashboard
            </Link>
            <Link to="/dashboard/income" className="text-black hover:text-yellow-400 transition duration-300">
              Incomes
            </Link>
            <Link to="/dashboard/expense" className="text-black hover:text-yellow-400 transition duration-300">
              Expenses
            </Link>
            <Link to="/dashboard/settings" className="text-black hover:text-yellow-400 transition duration-300">
              Settings
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <p className='font-semibold'>Hello, Alexander</p>  
            <Link 
              to="/login"
              className="text-white bg-black hover:bg-yellow-400 font-bold hover:text-black py-2 px-4 rounded-full transition duration-300 hidden lg:block"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </div>

      {/* Add the Outlet component to render nested routes */}
      <div className='container mx-auto px-6 py-4'>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
