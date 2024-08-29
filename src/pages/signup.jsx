import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../apis/axios';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    country: '',
    phone: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/v1/auth/register', formData);
      toast.success('Registration successful!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
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
              to="/login"  
              className="text-white bg-black hover:bg-yellow-400 font-bold hover:text-black py-2 px-4 rounded-full transition duration-300"
            >
              Login
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
              Take the first step towards unlocking your potential.
            </h1>
            <p className="text-white text-lg mt-2 text-center lg:text-left">
              Create an account to manage your finances effortlessly, anytime, anywhere.
            </p>
          </div>

          {/* Second Half */}
          <div className="flex flex-col justify-end w-full lg:w-1/2 mt-xl lg:mt-0 lg:pl-6">
            <form onSubmit={handleSubmit}>
              <p className="text-white text-base mb-2">Full name</p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full mb-4 p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-white text-base mb-2">Username</p>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full mb-4 p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-white text-base mb-2">Email</p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full mb-4 p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-white text-base mb-2">Country</p>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter your country"
                className="w-full mb-4 p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-white text-base mb-2">Phone Number</p>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full mb-4 p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-white text-base mb-2">Password</p>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
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
                    <span className="opacity-0">Open Account</span>
                  </>
                ) : (
                  'Open Account'
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

export default Signup;