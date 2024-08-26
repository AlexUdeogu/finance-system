import React from 'react';

const Info = () => {
  return (
    <div className='font-manrope'>
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

            <div className='bg-green-200 mb-5 pt-5 pl-5 pb-3 pr-15 w-auto rounded-md max-w-md'>
              <div>
                <h1 className='font-semibold text-gray-800 text-2xl'>
                  Income
                </h1>
              </div>
              <div>
                <p className='font-medium text-green-500 text-6xl'>
                  ₦500,000
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
            <div className='bg-blue-200 mb-5 pt-5 pl-5 pb-3 pr-15 w-auto rounded-md max-w-md'>
              PIE CHART
            </div>

            {/* New Table */}
            <div className="bg-gray-100 pr-5 rounded-md">
              <table className="min-w-full bg-white rounded-md">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200"></th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left">Min</th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left">Max</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-200">Income</td>
                    <td className="py-2 px-4 border-b border-gray-200">₦50,000</td>
                    <td className="py-2 px-4 border-b border-gray-200">₦100,000</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-200">Expense</td>
                    <td className="py-2 px-4 border-b border-gray-200">₦20,000</td>
                    <td className="py-2 px-4 border-b border-gray-200">₦40,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Line chart */}
      <div className='container mx-auto px-6 rounded-sm py-4'>
        <div className="flex justify-center p-20 bg-gray-100 mx-auto items-center">
          <h1>line chart</h1>
        </div>
      </div>

      {/* Recents section */}
      <div className='container mx-auto px-6 rounded-sm py-4'>
        <div className="bg-gray-100 p-10 rounded-md">
          <h2 className="text-2xl font-semibold mb-5">Recents</h2>
          <table className="min-w-full bg-white rounded-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 text-left">Title</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b border-gray-200">Rent</td>
                <td className="py-2 px-4 border-b border-gray-200">₦40,000</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-200">Groceries</td>
                <td className="py-2 px-4 border-b border-gray-200">₦20,000</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-200">Utilities</td>
                <td className="py-2 px-4 border-b border-gray-200">₦15,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Info;
