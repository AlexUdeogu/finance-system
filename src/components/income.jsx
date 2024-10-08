import React, { useState, useEffect } from 'react';
/*import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'; */
import axios from 'axios';
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
  const [deletingIncomeId, setDeletingIncomeId] = useState(null);

  useEffect(() => {
    fetchIncomeData();
  }, []);

  const fetchIncomeData = async () => {
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

      updateLineChart(incomes);
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
      setIsLoading(false); // Stop loading if validation fails
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

    const token = localStorage.getItem('token');
    await axios.post('https://finaki-backend.onrender.com/api/v1/income/create', incomeData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchIncomeData();
    clearFormFields();
    setIsLoading(false); // Stop loading after successful submission
  };

  const clearFormFields = () => {
    setTitle('');
    setAmount('');
    setSelectedOption('');
    setSelectedDate('');
    setDescription('');
  };

  const handleDelete = async (incomeId) => {
    setDeletingIncomeId(incomeId);
      const token = localStorage.getItem('token');
      await axios.delete(`https://finaki-backend.onrender.com/api/v1/income/${incomeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchIncomeData();
  };

  return (
    <div>
      <div className='container mx-auto px-6 py-4'>
        <h1 className="text-6xl font-bold text-gray-800">Income</h1>
        <p className="text-gray-600 mt-2 text-xl">
          Manage your income and track your financial inflow.
        </p>
      </div>

      <div className="flex justify-center m-2 items-center">
        <div className="bg-gray-100 container mx-auto rounded-md p-5 sm:p-10 flex flex-col lg:flex-row justify-between w-full">
          {/* First Half */}
          <div className="flex flex-col justify-start w-full sm:w-3/4 lg:w-2/3 lg:pr-5 mb-5 lg:mb-0">
            <div className='bg-green-200 mb-5 pt-5 pl-5 pb-3 pr-15 rounded-md w-full'>
              <div>
                <h1 className='font-semibold text-gray-800 text-2xl'>Income</h1>
              </div>
              <div>
                <p className='font-medium text-green-500 text-4xl md:text-6xl'>₦{totalIncome.toLocaleString()}</p>
              </div>
            </div>

            {/* Line Chart */}
            <div className="bg-white p-5 sm:p-7 w-full rounded-xl mb-5">
              <h2 className="text-2xl text-gray-800 font-semibold">Income Over Time Chart</h2>
              <p className='text-gray-800 text-base mb-5'>
                Visualize your income and analyze trends to make informed decisions.
              </p>
              <Line data={lineChartData} options={lineChartOptions} />
            </div>

            {/* Recents Table */}
            <div className="bg-white p-7 w-full rounded-md" style={{ maxHeight: '350px', overflowY: 'auto' }}>
              <h2 className="text-2xl text-gray-800 font-semibold">Recents</h2>
              <p className='text-gray-800 text-base mb-5'>
                Here are your recent income entries.
              </p>
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
                    {recentIncomes.length > 0 ? (
                      recentIncomes.map((income) => (
                        <tr key={income._id}>
                          <td className="py-2 px-4 text-gray-800 border-b whitespace-nowrap border-gray-200">{income.title}</td>
                          <td className="py-2 px-4 text-gray-800 border-b border-gray-200">₦{income.amount.toLocaleString()}</td>
                          <td className="py-2 px-4 text-gray-800 border-b border-gray-200">{new Date(income.date).toLocaleDateString()}</td>
                          <td>
                            <button
                              onClick={() => handleDelete(income._id)}
                              className="text-red-500 hover:text-white bg-red-200 hover:bg-red-700 font-bold mx-3 py-1 px-3 rounded-full transition duration-300 relative"
                              disabled={deletingIncomeId === income._id}
                            >
                              {deletingIncomeId === income._id ? (
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
                        <td className="py-2 px-4 border-b border-gray-200" colSpan="4">No Income to show</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Second Half */}
          <div className="flex flex-col justify-center w-full sm:w-3/4 lg:w-1/3 lg:pl-5">
            <div className="bg-white p-5 rounded-md">
              <h2 className="text-2xl text-gray-800 font-semibold">Record your income</h2>
              <p className='text-gray-800 text-base mb-5'>
                Easily log your income to maintain a clear financial overview.
              </p>
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
                <option value="Freelance">Freelance</option>
                <option value="Business">Business</option>
                <option value="Investments">Investments</option>
                <option value="Rental Income">Rental Income</option>
                <option value="Dividends">Dividends</option>
                <option value="Interest">Interest</option>
                <option value="Pension">Pension</option>
                <option value="Social Security">Social Security</option>
                <option value="Gifts">Gifts</option>
                <option value="Royalties">Royalties</option>
                <option value="Commission">Commission</option>
                <option value="Bonus">Bonus</option>
                <option value="Other">Other</option>
              </select>

              <p className="text-gray-800 text-base mb-2">Description</p>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Enter a brief description, max 20 characters"
                className="w-full mb-3 p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ minHeight: '300px' }}
                maxLength="20"
              >
              </textarea>

              {/* Submit Button with Loader */}
              <button
                type="submit"
                onClick={handleSubmit}
                className="text-black bg-yellow-400 hover:bg-yellow-700 font-bold hover:text-black py-2 px-1 rounded-full transition duration-300 w-40 lg:w-40 text-center relative"
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