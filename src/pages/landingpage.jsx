import React from 'react';
import hero from '../assets/Hover.png';
import People from '../assets/People.png';

const Navbar = () => {
  return (
    <div className='font-manrope'>
    <div className="font-manrope sticky top-0 bg-white z-20">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Logo</h1>

        <div className="hidden lg:flex flex-grow justify-center items-center ml-12 font-bold space-x-10">
          <a href="#about" className="text-black hover:text-yellow-400 transition duration-300">About</a>
          <a href="#faqs" className="text-black hover:text-yellow-400 transition duration-300">FAQs</a>
          <a href="#how-it-works" className="text-black hover:text-yellow-400 transition duration-300">How It Works</a>
        </div>

        <div className="flex items-center space-x-4">
          <a href="#signup" className="text-black font-bold hover:text-yellow-400 transition duration-300">Login</a>

          <a 
            href="#login"  
            className="text-white bg-black hover:bg-yellow-400 font-bold hover:text-black py-2 px-4 rounded-full transition duration-300 hidden lg:block"
          >
            Open Account
          </a>
        </div>
      </div>
      </div>



      {/* Hero Image Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4">
            <div className="flex justify-start mb-4  lg:mb-0">
                <img src={hero} alt="Hero" className="max-w-2xl  h-auto" />
            </div>
            <div className="flex-1 flex flex-col items-center lg:items-start lg:justify-start">
                <h1 className="text-3xl lg:text-8xl font-bold text-gray-800 text-center lg:text-left mb-5">
                     Control your <br /> financial <br /> future easily
                 </h1>
                <p className="text-lg text-gray-600 text-center lg:text-left">
                    From easy money management, to financial goals and <br /> investments. Open your account <br /> in a Flash
                 </p>
                 <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                    <a 
                        href="#login"  
                        className="text-black bg-yellow-400 hover:bg-black font-bold hover:text-white py-2 px-4 rounded-full transition duration-300 hidden lg:block mr-1"
                    >
                        Open Account
                    </a>

                    <a 
                        href="#login"  
                        className="text-black outline outline-offset-2 outline-1 hover:outline-none hover:bg-yellow-400 font-bold hover:text-black py-2 px-4 rounded-full transition duration-300 hidden lg:block m-4"
                    >
                        Generate Card
                    </a>
                 </div>


                 <div  className='flex flex-col lg:flex-row pt-5 lg:items-center lg:justify-between'>
                    <img src={People} alt="Hero" className="max-w-2xl  h-auto" />
                      <h1 className="text-3xl font-bold text-gray-800 ml-3">
                        10 Million+ 
                      </h1>
                 </div>

            </div>
        </div>


      {/* feature Section */}
      <div className="flex items-center justify-center pt-20 h-full">
        <div className="text-center">
          <h1  className="text-6xl font-bold  text-gray-800">
            Feel the best experience <br/> with our feature
          </h1>
        </div>
      </div>


    </div>
  );
};

export default Navbar;
