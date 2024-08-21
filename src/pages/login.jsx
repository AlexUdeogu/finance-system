import React from 'react';

const Signup = () => {
  return (
    <div className="font-manrope min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white z-20">
        <div className="container px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Logo</h1>
          <div className="flex items-center space-x-4">
            <a 
              href="#signup" 
              className="text-black font-bold hover:text-yellow-400 transition duration-300"
            >
              Login
            </a>
            <a 
              href="#login"  
              className="text-white bg-black hover:bg-yellow-400 font-bold hover:text-black py-2 px-4 rounded-full transition duration-300 hidden lg:block"
            >
              Open Account
            </a>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className=" flex justify-center m-5 items-center">
        <div className="bg-gray-950 rounded-2xl p-20 max-w-6xl w-full flex flex-col lg:flex-row">
          {/* First Half */}
          <div className="flex flex-col justify-center w-full lg:w-1/2">
            <h1 className="text-6xl font-bold mb-5 text-white text-center lg:text-left">
            Reconnect with your potential and continue your journey.
            </h1>
            <p className="text-white text-lg mt-2 text-center lg:text-left">
             Effortlessly access your account anytime, anywhere to manage your balance and much more.
            </p>
          </div>

          {/* Second Half */}
          <div className="flex flex-col justify-center w-full lg:w-1/2  lg:mt-0 lg:pl-6">
            <p className="text-white text-base mb-2">
              Email
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mb-4 p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-white text-base mb-2">
                Password
            </p>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Open Account Button */}
            <a 
              href="#open-account"  
              className="text-black bg-yellow-400 hover:bg-yellow-700 font-bold hover:text-black py-2 px-1 rounded-full transition duration-300 mt-6 w-40 lg:w-40 text-center"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
