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
    try {
      const response = await axios.post('https://finaki-backend.onrender.com/api/v1/auth/login', formData);
      
      // Log the full response data to understand its structure
      console.log('Full response data:', response.data);

      // Destructure the response data
      const { success, message, user } = response.data;

      if (success) {
        const { token, _id } = user; // Extract token and user ID from the user object

        // Log the token and user ID to the console
        console.log('Token:', token);
        console.log('User ID:', _id);

        // Store token and user ID in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', _id); // Store userId as _id

        toast.success(message);
        setTimeout(() => {
          navigate('/Dashboard');
        }, 2000);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error('Login error:', error); // Log error details
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-manrope min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white z-20">
        <div className="container px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <h1 className="text-3xl ml-16 font-bold text-gray-800">Logo</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Link 
                to="/signup"
                className="text-white bg-black hover:bg-yellow-400 font-bold hover:text-black py-2 px-4 rounded-full transition duration-300"
            >
                Open Account
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex justify-center m-5 items-center">
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
          <div className="flex flex-col justify-center w-full lg:w-1/2 lg:mt-0 lg:pl-6">
            <form onSubmit={handleSubmit}>
              <p className="text-white text-base mb-2">
                Email
              </p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full mb-4 p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
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

              {/* Login Button with Loader */}
              <button 
                type="submit"
                className="text-black bg-yellow-400 hover:bg-yellow-700 font-bold hover:text-black py-2 px-1 rounded-full transition duration-300 mt-6 w-40 lg:w-40 text-center relative"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-5 h-5 border-t-2 border-b-2 border-black rounded-full animate-spin"></div>
                    </span>
                    <span className="opacity-0">Login</span>
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
