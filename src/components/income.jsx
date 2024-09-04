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
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Income = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [totalIncome, setTotalIncome] = useState(0);
  const [recentIncomes, setRecentIncomes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lineChartData, setLineChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetchIncomeData();
  }, []);

  const fetchIncomeData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://finaki-backend.onrender.com/api/v1/income/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const incomes = response.data.Incomes;
      const incomeSum = incomes.reduce((sum, income) => sum + income.amount, 0);
      setTotalIncome(incomeSum);
      setRecentIncomes(incomes);

      // Update line chart data
      updateLineChart(incomes);

      toast.success('Income data fetched successfully!');
    } catch (error) {
      toast.error('Failed to fetch income data.');
      console.error('Error fetching income data:', error);
    }
  };

  const updateLineChart = (incomes) => {
    const sortedIncomes = incomes.sort((a, b) => new Date(a.date) - new Date(b.date));
    const labels = sortedIncomes.map(income => new Date(income.date).toLocaleDateString());
    const data = sortedIncomes.map(income => income.amount);

    setLineChartData({
      labels: labels,
      datasets: [
        {
          label: 'Income',
          data: data,
          borderColor: '#22c55e',
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          fill: true,
        }
      ]
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
        text: 'Income Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (₦)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      }
    }
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

    const incomeData = {
      title,
      amount,
      type: 'income',
      category: selectedOption,
      date: new Date(selectedDate).toISOString(),
      description,
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post('https://finaki-backend.onrender.com/api/v1/income/create', incomeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Income added successfully!');
      fetchIncomeData(); // Refresh the data to reflect changes
      clearFormFields(); // Clear form fields
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add income.');
      console.error('Error adding income:', error);
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

  const handleDelete = async (incomeId) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://finaki-backend.onrender.com/api/v1/income/${incomeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Income deleted successfully!');
      fetchIncomeData(); // Refresh the data to reflect changes
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete income.');
      console.error('Error deleting income:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className='container mx-auto px-6 py-4'>
        <h1 className="text-6xl font-bold text-gray-800">Income</h1>
        <p className="text-gray-600 mt-2 text-xl">
          From easy money management to financial goals and investments.
        </p>
      </div>

      <div className="flex justify-center m-2 items-center">
        <div className="bg-gray-100 container mx-auto rounded-md p-10 flex flex-col lg:flex-row">
          {/* First Half */}
          <div className="flex flex-col justify-start w-auto m-5 lg:w-1/2">
            <div className='bg-green-200 mb-5 pt-5 pl-5 pb-3 pr-15 rounded-md w-full'>
              <div>
                <h1 className='font-semibold text-gray-800 text-2xl'>Income</h1>
              </div>
              <div>
                <p className='font-medium text-green-500 text-6xl'>₦{totalIncome.toLocaleString()}</p>
              </div>
            </div>

            {/* Line Chart */}
            <div className="bg-white p-5 w-full rounded-xl mb-5">
              <Line data={lineChartData} options={lineChartOptions} />
            </div>

            {/* Recents Table */}
            <div className="bg-white p-10 w-full rounded-xl" style={{ maxHeight: '1000px', overflowY: 'auto' }}>
              <h2 className="text-2xl font-semibold mb-5">Recents</h2>

              <table className="min-w-full bg-white rounded-md">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 text-left">Title</th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left">Amount</th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentIncomes.length > 0 ? (
                    recentIncomes.map((income) => (
                      <tr key={income._id}>
                        <td className="py-2 px-4 border-b whitespace-nowrap border-gray-200">{income.title}</td>
                        <td className="py-2 px-4 border-b border-gray-200">₦{income.amount.toLocaleString()}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{new Date(income.date).toLocaleDateString()}</td>
                        <td>
                          <button
                            onClick={() => handleDelete(income._id)}
                            className="text-red-500 hover:text-white bg-red-200 hover:bg-red-700 font-bold mx-3 py-1 px-3 rounded-full transition duration-300"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-200" colSpan="4">No income records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Second Half */}
          <div className="flex flex-col justify-center w-full lg:w-1/2 lg:mt-0 lg:pl-6">
            <div className="bg-gray-100 pr-5 rounded-md">
              <p className="text-gray-800 text-base mb-2">Income Title</p>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter the title"
                className="w-full mb-4 p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-gray-800 text-base mb-2">Income Amount</p>
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
                <option value="Salary">Salary</option>
                <option value="Investment">Investments</option>
                <option value="Pension">Pension</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Gifts">Gifts</option>
                <option value="Stocks">Stocks</option>
                <option value="Business">Business</option>
                <option value="Royalties">Royalties</option>
                <option value="Other">Other</option>
              </select>

              <p className="text-gray-800 text-base mb-2">Description</p>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Enter a brief description, max 20 characters"
                className="w-full mb-4 p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ minHeight: '150px' }}
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
                  'Add Income'
                )}
              </button> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;