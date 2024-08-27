import React, { useState } from 'react';

const Income = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [description, setDescription] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div>
      <div className='container mx-auto px-6 py-4'>
        <h1 className="text-6xl font-bold text-gray-800">
          Expenses
        </h1>
        <p className="text-gray-600 mt-2 text-xl">
          From easy money management to financial goals and investments.
        </p>
      </div>

      <div className="flex justify-center m-5 items-center">
        <div className="bg-gray-100 container mx-auto rounded-md py-4 flex flex-col lg:flex-row ">
          {/* First Half */}
          <div className="flex flex-col justify-start w-auto m-5 lg:w-1/2">
            <div className='bg-red-200 mb-5 pt-5 pl-5 pb-3 pr-15 w-auto rounded-md max-w-md'>
              <div>
                <h1 className='font-semibold text-gray-800 text-2xl'>
                  Expenses
                </h1>
              </div>
              <div>
                <p className='font-medium text-red-500 text-6xl'>
                  ₦100,000
                </p>
              </div>
            </div>

            <div className='bg-blue-200 mb-5 pt-5 pl-5 pb-3 pr-15 w-auto rounded-md max-w-md'>
              <div>
                <h1 className='font-semibold text-gray-800 text-2xl'>
                  Total Balance
                </h1>
              </div>
              <div>
                <p className='font-medium text-blue-500 text-6xl'>
                  ₦100,000
                </p>
              </div>
            </div>
          </div>

          {/* Second Half */}
          <div className="flex flex-col justify-center w-full lg:w-1/2 lg:mt-0 lg:pl-6">
            <div className="bg-gray-100 pr-5 rounded-md">
              <p className="text-gray-800 text-base mb-2">
                Expense Title
              </p>
              <input
                type="text"
                placeholder="Enter the title"
                className="w-full mb-4 p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-gray-800 text-base mb-2">
                Expense Amount
              </p>
              <input
                type="number"
                placeholder="Enter the amount"
                className="w-full mb-4 p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Date Input */}
              <p className="text-gray-800 text-base mb-2">
                Date
              </p>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full mb-4 p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Dropdown Menu */}
              <p className="text-gray-800 text-base mb-2">
                Select Category
              </p>
              <select
                value={selectedOption}
                onChange={handleOptionChange}
                className="w-full p-3 mb-4 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="salary">Salary</option>
                <option value="investment">Investment</option>
                <option value="business">Business</option>
                <option value="freelance">Freelance</option>
                <option value="other">Other</option>
              </select>

              {/* Description Box */}
              <p className="text-gray-800 text-base mb-2">
                Description
              </p>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Enter a description"
                className="w-full p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Income;
