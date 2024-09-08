import React from 'react';
import { Link } from 'react-router-dom';
import hero from '../assets/Hover.png';
import Phone from '../assets/Phone.png';
import Stats from '../assets/Stats.png';
import Group from '../assets/Group.png';
import Actions from '../assets/actions.png';	
import Footer from '../assets/footer.png';






const Navbar = () => {
  return (
    <div className='font-manrope'>
    <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-300/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">QuantaBudget</h1>
        <div className="flex items-center space-x-4">
          <Link
          to="/login"  
          className="text-black font-bold hover:text-yellow-400 transition duration-300"
          >
            Login
          </Link>

          <Link 
            to="/signup"
            className="text-white bg-black hover:bg-yellow-400 font-bold hover:text-black py-2 px-4 rounded-full transition duration-300 hidden lg:block"
          >
            Open Account
          </Link>

        </div>
      </div>
      </div>



      {/* Hero Image Section */}
        <div className="flex flex-col  lg:flex-row lg:items-center lg:justify-between p-4">
            <div className="flex justify-start mb-4  lg:mb-0">
                <img src={hero} alt="Hero" className=" w-auto  h-auto" />
            </div>
            <div className="flex-1 flex flex-col items-center lg:items-start lg:justify-start">
                <h1 className="text-3xl lg:text-8xl font-bold text-gray-800 text-center lg:text-left mb-5">
                  Effortlessly Manage Your Finances and Shape Your Future
                 </h1>
                <p className="text-lg text-gray-600 text-center lg:text-left">
                  From seamless money management to achieving <br/> financial goals and making smart investments.
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
            </div>
        </div>


    {/* feature Section */}
    <div className="flex flex-col items-center justify-center pt-20 h-full">
      <div className="text-center mb-10">
        <h1 className="text-6xl font-bold text-gray-800">
          Feel the best experience <br /> with our feature
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">

        {/* First Card */}
        <div className="bg-gray-100 rounded-2xl p-6 max-w-[600px] min-h-[300px] flex-1 flex flex-col items-left justify-start">
          <img src={Phone} alt="phone" className="w-16  h-16 mb-5" />
          <h2 className="text-4xl font-semibold text-gray-800">Design your financial journey</h2>
          <p className="text-gray-600 text-lg mt-2">Personalize your financial experience with a custom-designed card that mirrors your style. Track every expense, set savings goals, analyze spending habits, and manage your finances all in one place.</p>
          <img src={Group} alt="group" className="w-full h-full mt-10" />
        </div>

        {/* Second Card */}
        <div className="bg-gray-100 rounded-2xl p-6 max-w-[600px] min-h-[300px] flex-1 flex flex-col items-left justify-start">
          <img src={Stats} alt="phone" className="w-16 h-16 mb-5" />
          <h2 className="text-4xl font-semibold text-gray-800">Tailor Your Financial Insights</h2>
          <p className="text-gray-600 text-lg mt-2">Get a clear view of your spending, track income and expenses effortlessly, and set personalized goals to achieve financial freedom. Empower your money decisions with real-time insights and smart tools designed to help you stay ahead.</p>
          <img src={Group} alt="group" className="w-full h-full mt-10" />
        </div>

      </div>

    </div>





    {/* Get app Section */}
    <div className="pt-20  flex justify-center items-center min-h-[400px]">
      <div className="bg-gray-100 rounded-2xl pt-6 pb-0 p-x-0 max-w-[1000px] min-h-[300px] flex flex-col items-center justify-center">
        <h2 className="text-4xl font-semibold text-gray-800 text-center">Sign up for a QuantaBudget account.</h2>
        <p className="text-gray-600 text-lg mt-2 text-center">With this platform,you can access your account anywhere, <br/>anytime for a financial analysis and so much more.</p>
          <Link 
            to="/signup"
              className="text-black outline outline-offset-2 outline-1 hover:outline-none hover:bg-yellow-400 font-bold hover:text-black py-2 px-4 rounded-full transition duration-300 hidden lg:block m-4"
          >
              Open Account
          </Link>
        <img src={Actions} alt="group" className="w-30 h-30" />
        
      </div>
    </div>



    {/* footer Section */}
  <div className="flex flex-col items-center pt-20">
    <h1 className="text-6xl font-bold text-gray-800 pb-10">
      Save smart. Achieve more.
    </h1>

    <div className="bg-gray-950 rounded-t-2xl p-6 pb-20 max-w-6xl w-full flex flex-col lg:flex-row">
      {/* First Half */}
      <div className="flex flex-col justify-left w-full lg:w-1/2">
        <img src={Footer} alt="group" className="w-16 h-16" />
      </div>

      {/* Second Half */}
      <div className="flex flex-col justify-end w-full lg:w-1/2 mt-xl lg:mt-0 lg:pl-6">
        <a href="https://alex-portfolio-mu.vercel.app/"  className="text-6xl font-bold mt-10 text-white text-center lg:text-right">
          Wanna collaborate with the developer?
        </a>
        <p className="text-white text-lg mt-2 text-center lg:text-right">
        Partner with <a href="https://alex-portfolio-mu.vercel.app/"  className='text-yellow-400 text-underline'>Alex Udeogu</a> to bring your vision to life. Let's create something amazing together!
        </p>
      </div>
    </div>

  </div>

</div>
  );
};

export default Navbar;
