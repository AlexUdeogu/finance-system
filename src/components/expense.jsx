import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Expense = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [totalExpense, setTotalExpense] = useState(0);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lineChartData, setLineChartData] = useState({ labels: [], datasets: [] });
  const [deletingExpenseId, setDeletingExpenseId] = useState(null);

  useEffect(() => {
    fetchExpenseData();
  }, []);

  const fetchExpenseData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://finaki-backend.onrender.com/api/v1/expense/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const expenses = response.data.Expenses;
      const expenseSum = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      setTotalExpense(expenseSum);
      setRecentExpenses(expenses);

      // Update line chart data
      updateLineChart(expenses);

      toast.success('Expense data fetched successfully!');
    } catch (error) {
      toast.error('Failed to fetch expense data.');
      console.error('Error fetching expense data:', error);
    }
  };

  const updateLineChart = (expenses) => {
    const sortedExpenses = expenses.sort((a, b) => new Date(a.date) - new Date(b.date));
    const labels = sortedExpenses.map((expense) => new Date(expense.date).toLocaleDateString());
    const data = sortedExpenses.map((expense) => expense.amount);

    setLineChartData({
      labels: labels,
      datasets: [
        {
          label: 'Expenses',
          data: data,
          borderColor: '#ff6b6b',
          backgroundColor: 'rgba(255, 107, 107, 0.2)',
          fill: true,
        },
      ],
    });
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expenses Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (₦)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  const handleDateChange = (e) => setSelectedDate(e.target.value);
  const handleOptionChange = (e) => setSelectedOption(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!title || !amount || !selectedOption || !selectedDate || !description) {
      toast.error('All fields are required!');
      setIsLoading(false);
      return;
    }

    const expenseData = {
      title,
      amount,
      type: 'expense',
      category: selectedOption,
      date: new Date(selectedDate).toISOString(),
      description,
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post('https://finaki-backend.onrender.com/api/v1/expense/create', expenseData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Expense added successfully!');
      fetchExpenseData(); // Refresh the data to reflect changes
      clearFormFields(); // Clear form fields
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add expense.');
      console.error('Error adding expense:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearFormFields = () => {
    setTitle('');
    setAmount('');
    setSelectedOption('');
    setSelectedDate('');
    setDescription('');
  };

  const handleDelete = async (expenseId) => {
    setDeletingExpenseId(expenseId);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://finaki-backend.onrender.com/api/v1/expense/${expenseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Expense deleted successfully!');
      fetchExpenseData(); // Refresh the data to reflect changes
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete expense.');
      console.error('Error deleting expense:', error);
    } finally {
      setDeletingExpenseId(null);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className='container mx-auto px-6 py-4'>
        <h1 className="text-6xl font-bold text-gray-800">Expenses</h1>
        <p className="text-gray-600 mt-2 text-xl">
          Manage your expenses and track your financial outflow.
        </p>
      </div>

      <div className="flex justify-center m-2 items-center">
        <div className="bg-gray-100 container mx-auto rounded-md p-10 flex flex-col lg:flex-row">
          {/* First Half */}
          <div className="flex flex-col justify-start w-auto m-5 lg:w-1/2">
            <div className='bg-red-200 mb-5 pt-5 pl-5 pb-3 pr-15 rounded-md w-full'>
              <div>
                <h1 className='font-semibold text-gray-800 text-2xl'>Expenses</h1>
              </div>
              <div>
                <p className='font-medium text-red-500 text-6xl'>₦{totalExpense.toLocaleString()}</p>
              </div>
            </div>

            {/* Line Chart */}
            <div className="bg-white p-5 w-full rounded-xl mb-5">
              <h2 className="text-2xl text-gray-800 font-semibold mb-5">Expenses Over Time Chart</h2>
              <Line data={lineChartData} options={lineChartOptions} />
            </div>

            {/* Recents Table */}
            <div className="bg-white p-7 w-full rounded-xl" style={{ maxHeight: '350px', overflowY: 'auto' }}>
              <h2 className="text-2xl text-gray-800 font-semibold mb-5">Recents</h2>
              <div className='overflow-y-auto'> 
              <table className="min-w-full bg-white rounded-md">
                <thead className="sticky top-0 bg-white">
                  <tr>
                    <th className="py-2 px-4 text-gray-800 font-semibold border-b border-gray-200 text-left">Title</th>
                    <th className="py-2 px-4 text-gray-800 font-semibold border-b border-gray-200 text-left">Amount</th>
                    <th className="py-2 px-4 text-gray-800 font-semibold border-b border-gray-200 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentExpenses.length > 0 ? (
                    recentExpenses.map((expense) => (
                      <tr key={expense._id}>
                        <td className="py-2 px-4 text-gray-800 border-b whitespace-nowrap border-gray-200">{expense.title}</td>
                        <td className="py-2 px-4 text-gray-800 border-b border-gray-200">₦{expense.amount.toLocaleString()}</td>
                        <td className="py-2 px-4 text-gray-800  border-b border-gray-200">{new Date(expense.date).toLocaleDateString()}</td>
                        <td>
                          <button
                            onClick={() => handleDelete(expense._id)}
                            className="text-red-500 hover:text-white bg-red-200 hover:bg-red-700 font-bold mx-3 py-1 px-3 rounded-full transition duration-300 relative"
                            disabled={deletingExpenseId === expense._id}
                          >
                            {deletingExpenseId === expense._id ? (
                              <>
                                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                  <div className="w-4 h-4 border-t-2 border-b-2 border-red-500 rounded-full animate-spin"></div>
                                </span>
                                <span className="opacity-0">Delete</span>
                              </>
                            ) : (
                              'Delete'
                            )}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-200" colSpan="4">No expense records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              </div>
            </div>
          </div>

          {/* Second Half */}
          <div className="flex flex-col justify-center w-full lg:w-1/2 lg:mt-0 lg:pl-6">
            <div className="bg-gray-100 pr-5 rounded-md">
              <p className="text-gray-800 text-base mb-2">Expense Title</p>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter the title"
                className="w-full mb-4 p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-gray-800 text-base mb-2">Expense Amount</p>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter the amount"
                className="w-full mb-4 p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Date Input */}
              <p className="text-gray-800 text-base mb-2">Date</p>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full mb-4 p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Dropdown Menu */}
              <p className="text-gray-800 text-base mb-2">Select Category</p>
              <select
                value={selectedOption}
                onChange={handleOptionChange}
                className="w-full p-3 mb-4 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Rent">Rent</option>
                <option value="Utilities">Utilities</option>
                {/* Add more categories as needed */}
              </select>

              <p className="text-gray-800 text-base mb-2">Description</p>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Enter a brief description, max 20 characters"
                className="w-full mb-4 p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ minHeight: '300px' }}
                maxLength="20"
              >
              </textarea>

              {/* Submit Button with Loader */}
              <button
                type="submit"
                onClick={handleSubmit}
                className="text-black bg-yellow-400 hover:bg-yellow-700 font-bold hover:text-black py-2 px-1 rounded-full transition duration-300 mt-6 w-40 lg:w-40 text-center relative"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-5 h-5 border-t-2 border-b-2 border-black rounded-full animate-spin"></div>
                    </span>
                    <span className="opacity-0">Add Income</span>
                  </>
                ) : (
                  'Add Expense'
                )}
              </button> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;
