import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

const RecentsTable = ({ transactions }) => (
  <div className="bg-gray-100 mb-10 rounded-md p-4 sm:p-10 w-full overflow-x-auto">
    <table className="w-full rounded-md">
      <thead>
        <tr className="bg-white">
          <th className="p-2 sm:p-3 text-gray-800 text-left">Type</th>
          <th className="p-2 sm:p-3 text-gray-800 text-left">Title</th>
          <th className="p-2 sm:p-3 text-gray-800 text-left">Amount</th>
          <th className="p-2 sm:p-3 text-gray-800 text-left">Date</th>
          <th className="p-2 sm:p-3 text-gray-800 text-left">Description</th>
        </tr>
      </thead>
      <tbody>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td className="text-gray-800 p-2 sm:p-3">{transaction.type}</td>
              <td className="text-gray-800 p-2 sm:p-3">{transaction.title}</td>
              <td className="text-gray-800 p-2 sm:p-3">₦{transaction.amount.toLocaleString()}</td>
              <td className="text-gray-800 p-2 sm:p-3">{new Date(transaction.date).toLocaleDateString()}</td>
              <td className="text-gray-800 p-2 sm:p-3">{transaction.description}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="p-3 text-center">Loading...</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

const Info = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [lineChartData, setLineChartData] = useState({ labels: [], datasets: [] });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [username, setUsername] = useState('');
  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {
    // Retrieve token, userId, and username from local storage
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || 'User');

    if (!token || !userId) {
      console.error('Authentication details are missing.');
      return;
    }

    const fetchIncomes = async () => {
      try {
        const response = await axios.get('https://finaki-backend.onrender.com/api/v1/income/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userId: userId,
          }
        });

        console.log('Incomes response:', response.data);
        if (response.data.success && Array.isArray(response.data.Incomes) && response.data.Incomes.length > 0) {
          const validIncomes = response.data.Incomes.filter(item => typeof item.amount === 'number');
          console.log('Valid incomes:', validIncomes);
          setIncomes(validIncomes);
          const total = validIncomes.reduce((acc, income) => acc + income.amount, 0);
          setTotalIncome(total);

          // Update recent transactions
          const recentIncomes = validIncomes.slice(0, 5); // Last 5 incomes
          setRecentTransactions(prev => [
            ...prev.filter(item => item.type !== 'income'),
            ...recentIncomes.map(income => ({ 
              ...income, 
              type: 'income', 
              date: income.date,
              description: income.description || 'No description' // Add description
            }))
          ]);

          updateLineChart(validIncomes, expenses);
        } else {
          console.error('No income data available or invalid format.');
        }
      } catch (error) {
        console.error('Error fetching income:', error);
      }
    };

    const fetchExpenses = async () => {
      try {
        const response = await axios.get('https://finaki-backend.onrender.com/api/v1/expense/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Expenses response:', response.data);
        if (response.data.success && Array.isArray(response.data.Expenses) && response.data.Expenses.length > 0) {
          const validExpenses = response.data.Expenses.filter(item => typeof item.amount === 'number');
          console.log('Valid expenses:', validExpenses);
          setExpenses(validExpenses);
          const total = validExpenses.reduce((acc, expense) => acc + expense.amount, 0);
          setTotalExpense(total);

          // Update recent transactions
          const recentExpenses = validExpenses.slice(0, 5); // Last 5 expenses
          setRecentTransactions(prev => [
            ...prev.filter(item => item.type !== 'expense'),
            ...recentExpenses.map(expense => ({ 
              ...expense, 
              type: 'expense', 
              date: expense.date,
              description: expense.description || 'No description' // Add description
            }))
          ]);

          updateLineChart(incomes, validExpenses);
        } else {
          console.error('No expense data available or invalid format.');
        }
      } catch (error) {
        console.error('Error fetching expense:', error);
      }
    };

    const updateLineChart = (incomes, expenses) => {
      const incomeLabels = incomes.map(income => new Date(income.date).toLocaleDateString());
      const incomeValues = incomes.map(income => income.amount);
      const expenseLabels = expenses.map(expense => new Date(expense.date).toLocaleDateString());
      const expenseValues = expenses.map(expense => expense.amount);

      // Combine and deduplicate labels
      const allLabels = [...new Set([...incomeLabels, ...expenseLabels])];
      
      // Reformat data to align with all labels
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

    const fetchAllTransactions = async () => {
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
        setAllTransactions(allTransactions);
      } catch (error) {
        console.error('Error fetching all transactions:', error);
      }
    };

    fetchIncomes();
    fetchExpenses();
    fetchAllTransactions();
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

  const downloadUserHistory = () => {
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

  return (
    <div className='font-manrope'>
      <div className='container mx-auto py-4 px-4 sm:px-6'>
        <div>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-800">
            Welcome, {username}
          </h1>
          <p className="text-gray-600 mt-2 text-base sm:text-xl">
            From easy money management to financial goals and investments.
          </p>
        </div>
      </div>

      <div className='mt-5 px-4 sm:px-6'>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 ">Overview</h2>
        <p className='text-gray-600 mb-5'>
          A quick glance at your key financial metrics and recent transactions.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row container justify-center mx-auto min-w-full lg:min-w-7xl items-stretch px-4 sm:px-6">
        <div className="bg-gray-100 container mx-auto rounded-md p-6 sm:p-10 flex flex-col lg:flex-row">
          {/* First Half */}
          <div className="flex flex-col justify-start w-full lg:w-1/2 lg:mr-5 mb-5 lg:mb-0">
            <div className='bg-red-200 mb-5 p-4 sm:p-5 rounded-md w-full'>
              <h1 className='font-semibold text-gray-800 text-xl sm:text-2xl mb-2'>
                Total Expense
              </h1>
              <p className='font-medium text-red-500 text-3xl sm:text-4xl lg:text-5xl'>
                ₦{totalExpense.toLocaleString()}
              </p>
            </div>

            <div className='bg-green-200 mb-5 p-4 sm:p-5 rounded-md w-full'>
              <h1 className='font-semibold text-gray-800 text-xl sm:text-2xl mb-2'>
                Total Income
              </h1>
              <p className='font-medium text-green-500 text-3xl sm:text-4xl lg:text-5xl'>
                ₦{totalIncome.toLocaleString()}
              </p>
            </div>

            <div className='bg-gray-300 mb-5 p-4 sm:p-5 rounded-md w-full'>
              <h1 className='font-semibold text-gray-800 text-xl sm:text-2xl mb-2'>
                Balance
              </h1>
              <p className='font-medium text-gray-700 text-3xl sm:text-4xl lg:text-5xl'>
                ₦{totalBalance.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Second Half */}
          <div className="flex flex-col justify-center items-center w-full lg:w-1/2">
            {/* Doughnut Chart */}
            <div className='flex justify-center items-center w-full' style={{ height: '300px', maxWidth: '400px' }}>
              <Doughnut 
                data={data} 
                options={options} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recents Table */}
      <div className='px-4 sm:px-6'>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800  mt-10 ">Recent Transactions</h2>
        <p className='text-gray-600 mb-5'>
          View your most recent income and expenses at a glance.
        </p>
      </div>
      <RecentsTable transactions={recentTransactions} />

      <div className='container mx-auto min-w-full lg:min-w-7xl rounded-md my-10 px-4 sm:px-6'>
        <h2 className="text-xl sm:text-2xl text-gray-800  font-semibold ">Line Chart</h2>
        <p className='text-gray-600 mb-5'>Visualize your financial trends over time.</p>
        <div className="flex justify-center rounded-md p-4 sm:p-10 bg-gray-100 mx-auto items-center">
          <div className='bg-white rounded-md p-4 sm:p-10 w-full' style={{ height: '400px' }}> 
            <Line 
              data={lineChartData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false 
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
