import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
} from 'chart.js';
import 'react-toastify/dist/ReactToastify.css';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

const Info = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [lineChartData, setLineChartData] = useState({ labels: [], datasets: [] });
  const [username, setUsername] = useState('');

  const fetchIncomes = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    try {
      const response = await axios.get('https://finaki-backend.onrender.com/api/v1/income/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: userId,
        }
      });

      if (response.data.success && Array.isArray(response.data.Incomes) && response.data.Incomes.length > 0) {
        const validIncomes = response.data.Incomes.filter(item => typeof item.amount === 'number');
        setIncomes(validIncomes);
        const total = validIncomes.reduce((acc, income) => acc + income.amount, 0);
        setTotalIncome(total);
        updateLineChart(validIncomes, expenses);
      } else {
        toast.error('No income data available or invalid format.');
      }
    } catch (error) {
      console.error('Error fetching income:', error);
      toast.error('Error fetching income data.');
    }
  };

  const fetchExpenses = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get('https://finaki-backend.onrender.com/api/v1/expense/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success && Array.isArray(response.data.Expenses) && response.data.Expenses.length > 0) {
        const validExpenses = response.data.Expenses.filter(item => typeof item.amount === 'number');
        setExpenses(validExpenses);
        const total = validExpenses.reduce((acc, expense) => acc + expense.amount, 0);
        setTotalExpense(total);
        updateLineChart(incomes, validExpenses);
      } else {
        toast.error('No expense data available or invalid format.');
      }
    } catch (error) {
      console.error('Error fetching expense:', error);
      toast.error('Error fetching expense data.');
    }
  };

  const updateLineChart = (incomes, expenses) => {
    const incomeLabels = incomes.map(income => new Date(income.date).toLocaleDateString());
    const incomeValues = incomes.map(income => income.amount);
    const expenseLabels = expenses.map(expense => new Date(expense.date).toLocaleDateString());
    const expenseValues = expenses.map(expense => expense.amount);

    const allLabels = [...new Set([...incomeLabels, ...expenseLabels])];

    const formattedIncomes = allLabels.map(label => {
      const index = incomeLabels.indexOf(label);
      return index > -1 ? incomeValues[index] : 0;
    });

    const formattedExpenses = allLabels.map(label => {
      const index = expenseLabels.indexOf(label);
      return index > -1 ? expenseValues[index] : 0;
    });

    setLineChartData({
      labels: allLabels,
      datasets: [
        {
          label: 'Incomes',
          data: formattedIncomes,
          borderColor: '#28a745',
          backgroundColor: 'rgba(40, 167, 69, 0.2)',
          fill: true,
        },
        {
          label: 'Expenses',
          data: formattedExpenses,
          borderColor: '#dc3545',
          backgroundColor: 'rgba(220, 53, 69, 0.2)',
          fill: true,
        }
      ]
    });
  };

  useEffect(() => {
    // Debugging: Check what is stored in local storage
    console.log('Stored username:', localStorage.getItem('username'));
    console.log('Stored token:', localStorage.getItem('token'));
    console.log('Stored userId:', localStorage.getItem('userId'));

    // Retrieve username from local storage
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || 'User');

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      toast.error('Authentication details are missing.');
      return;
    }

    // Initial data fetch
    fetchIncomes();
    fetchExpenses();

    // Set up polling every 5 seconds
    const interval = setInterval(() => {
      fetchIncomes();
      fetchExpenses();
    }, 5000); // Poll every 5 seconds

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTotalBalance(totalIncome - totalExpense);
  }, [totalIncome, totalExpense]);

  const data = {
    labels: ['Total Income', 'Total Expense'],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ['#22c55e', '#ef4444 '],  
        hoverBackgroundColor: ['#218838', '#c82333'],
      },  
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className='font-manrope'>
      <ToastContainer />
      <div className='container mx-auto px-6 py-4'>
        <h1 className="text-6xl font-bold text-gray-800">
          Welcome, {username}
        </h1>
        <p className="text-gray-600 mt-2 text-xl">
          From easy money management to financial goals and investments.
        </p>
      </div>

      <div className="flex container justify-center mx-auto min-w-7xl items-center">
        <div className="bg-gray-100 container mx-auto rounded-md p-10 flex flex-col lg:flex-row">
          {/* First Half */}
          <div className="flex flex-col justify-start w-full lg:w-1/2 m-5">
            <div className='bg-red-200 mb-5 pt-5 pl-5 pb-3 pr-15 rounded-md w-full'>
              <div>
                <h1 className='font-semibold text-gray-800 text-2xl'>
                  Total Expense
                </h1>
              </div>
              <div>
                <p className='font-medium text-red-500 text-6xl'>
                  ₦{totalExpense.toLocaleString()}
                </p>
              </div>
            </div>

            <div className='bg-green-200 mb-5 pt-5 pl-5 pb-3 pr-15 rounded-md w-full'>
              <div>
                <h1 className='font-semibold text-gray-800 text-2xl'>
                  Total Income
                </h1>
              </div>
              <div>
                <p className='font-medium text-green-500 text-6xl'>
                  ₦{totalIncome.toLocaleString()}
                </p>
              </div>
            </div>

            <div className='bg-gray-300 mb-5 pt-5 pl-5 pb-3 pr-15 rounded-md w-full'>
              <div>
                <h1 className='font-semibold text-gray-800 text-2xl'>
                  Balance
                </h1>
              </div>
              <div>
                <p className='font-medium text-gray-700 text-6xl'>
                  ₦{totalBalance.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Second Half */}
          <div className="flex flex-col justify-center items-center w-full lg:w-1/2">
            {/* Doughnut Chart */}
            <div className='flex justify-center items-center w-full' style={{ width: '500px', height: '500px' }}>
              <Doughnut 
                data={data} 
                options={options} 
                width={400}  // Adjust this value for width
                height={400} // Adjust this value for height
              />
            </div>
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="flex flex-col container mx-auto min-w-7xl py-6 items-center">
        <div className="bg-gray-100 mb-10 rounded-md p-5 w-full">
          <Line data={lineChartData} />
        </div>
      </div>
    </div>
  );
};

export default Info;
