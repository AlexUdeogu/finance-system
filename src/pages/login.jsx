import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
      const response = await axios.post('https://finaki-backend.onrender.com/api/v1/auth/login', formData);
      
      // Destructure the response data
      const { success, message, user } = response.data;

      if (success) {
        const { token, _id, username } = user; // Extract username along with token and user ID
        // Store token, user ID, and username in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', _id); // Store userId as _id
        localStorage.setItem('username', username); // Store the username

        toast.success(message);
        setTimeout(() => {
          navigate('/Dashboard');
        }, 2000);
      } else {
        toast.error(message);
      }

  };

  return (
    <div className="font-manrope min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white z-20">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">QuantaBudget</h1>
          </Link>
          <div className="flex items-center">
            <Link 
                to="/signup"
                className="text-white bg-black hover:bg-yellow-400 font-bold hover:text-black py-2 px-3 sm:px-4 rounded-full transition duration-300 text-sm sm:text-base"
            >
                Open Account
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex justify-center items-center flex-grow px-4 py-8">
        <div className="bg-gray-950 rounded-2xl p-6 sm:p-10 lg:p-20 w-full max-w-6xl flex flex-col lg:flex-row">
          {/* First Half */}
          <div className="flex flex-col justify-center w-full lg:w-1/2 mb-8 lg:mb-0">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-5 text-white text-center lg:text-left">
              Reconnect with your potential and continue your journey.
            </h1>
            <p className="text-white text-base sm:text-lg mt-2 text-center lg:text-left">
              Effortlessly access your account anytime, anywhere to manage your balance and much more.
            </p>
          </div>

          {/* Second Half */}
          <div className="flex flex-col justify-center w-full lg:w-1/2 lg:pl-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <p className="text-white text-base mb-2">
                  Email
                </p>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <p className="text-white text-base mb-2">
                  Password
                </p>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Login Button with Loader */}
              <div className="flex justify-center sm:justify-start">
                <button 
                  type="submit"
                  className="text-black bg-yellow-400 font-bold hover:text-black py-2 px-6 rounded-full transition duration-300 w-full sm:w-auto text-center relative"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2">
                        <div className="w-5 h-5 border-t-2 border-b-2 border-black rounded-full animate-spin"></div>
                      </span>
                      <span className="opacity-0">Login</span>
                    </>
                  ) : (
                    'Login'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
