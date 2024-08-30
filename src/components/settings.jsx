import React from 'react'
import { FaRegCircleUser } from "react-icons/fa6";


const settings = () => {
  return (
    <div>
      <div className='container mx-auto px-6 py-4'>
        <h1 className="text-6xl font-bold text-gray-800">
          Settings
        </h1>
        <p className="text-gray-600 mt-2 text-xl">
          From easy money management to financial goals and investments.
        </p>
      </div>

      <div className="flex justify-center m-2 items-center">
        <div className="bg-gray-100 container mx-auto rounded-md p-10 flex flex-col lg:flex-row ">
          {/* First Half */}
            <div className="flex flex-col justify-start w-auto m-5 lg:w-1/2 items-center">
                <FaRegCircleUser
                size={150} 
                className="text-gray-800 mb-4" 
                /> 
                <h1 className="text-6xl font-bold text-gray-800">John Doe</h1>
                <p className="text-lg text-gray-600">johndoe@icloud.com</p>
            </div>


          {/* Second Half */}
          <div className="flex flex-col justify-center w-full lg:w-1/2 lg:mt-0 lg:pl-6">
            <div className="bg-gray-100 m-5 pr-5 rounded-md">
                <h1 className='text-3xl font-bold mb-5 text-gray-800'>
                    Update Password
                </h1>
                <p className="text-gray-800 text-base mb-2">
                    Password
                </p>
                <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full mb-4 p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-gray-800 text-base mb-2">
                    Confirm Password
                </p>
                <input
                    type="password"
                    placeholder="re-enter your password"
                    className="w-full  p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                className="text-black bg-yellow-400 hover:bg-yellow-700 font-bold hover:text-black py-2 px-2 rounded-full transition duration-300 mt-6 w-40 lg:w-40 text-center"
                >
                    Change Password
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default settings
