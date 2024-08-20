import React from 'react';
import hero from '../assets/Hover.png';
import People from '../assets/People.png';
import Phone from '../assets/Phone.png';
import Stats from '../assets/Stats.png';
import Group from '../assets/Group.png';
import Airtable from '../assets/airtable.png';
import Discord from '../assets/discord.png';
import Slack from '../assets/slack.png';
import Pinterest from '../assets/pinterest.png';
import Monday from '../assets/monday.png';
import Dropbox from '../assets/dropbox.png';
import Stripe from '../assets/stripe.png';
import Zoom from '../assets/zoom.png';
import Actions from '../assets/actions.png';	
import Footer from '../assets/footer.png';






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
                <img src={hero} alt="Hero" className=" w-auto  h-auto" />
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
          <h2 className="text-4xl font-semibold text-gray-800">Custom and design your card,  make it look unique</h2>
          <p className="text-gray-600 text-lg mt-2">Create a custom card that reflects your uinque style and personality. Choose from a range of colors, patterns, and  designs to customize the look of your card.</p>
          <img src={Group} alt="group" className="w-full h-full mt-10" />
        </div>

        {/* Second Card */}
        <div className="bg-gray-100 rounded-2xl p-6 max-w-[600px] min-h-[300px] flex-1 flex flex-col items-left justify-start">
          <img src={Stats} alt="phone" className="w-16 h-16 mb-5" />
          <h2 className="text-4xl font-semibold text-gray-800">Personalized your Financial insights and goals</h2>
          <p className="text-gray-600 text-lg mt-2">Track your sending patterns,analyze income or expenses easily, and recieve personalized recommendations to optimize your financial habits.</p>
          <img src={Group} alt="group" className="w-full h-full mt-10" />
        </div>

      </div>

    </div>

    <div className="flex flex-col items-center justify-center pt-20 h-full">
      <div className="text-center mb-10">
        <h1 className="text-6xl font-bold text-gray-800">
          200+ The fastest growing <br/> company use Finzo
        </h1>
        <p className="text-lg text-gray-600 text-center mt-5 lg:text-center">
          Many companies have tried using Finzo and they trust <br/> the safety of their money
        </p>
      </div>



      {/* Cards Section */}
      <div className="grid grid-cols-4 gap-6">
        {/* Row 1 */}
        <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center min-h-[100px]">
        <img src={Airtable} alt="group" className="w-30 h-30" />
        </div>
        <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center min-h-[100px]">
        <img src={Discord} alt="group" className="w-30 h-30" />
        </div>
        <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center min-h-[100px]">
        <img src={Slack} alt="group" className="w-30 h-30" />
        </div>
        <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center min-h-[100px]">
        <img src={Pinterest} alt="group" className="w-30 h-30" />
        </div>

        {/* Row 2 */}
        <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center min-h-[100px]">
        <img src={Monday} alt="group" className="w-30 h-30" />
        </div>
        <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center min-h-[100px]">
        <img src={Dropbox} alt="group" className="w-30 h-30" />
        </div>
        <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center min-h-[100px]">
        <img src={Stripe} alt="group" className="w-30 h-30" />
        </div>
        <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center min-h-[100px]">
        <img src={Zoom} alt="group" className="w-30 h-30" />
        </div>
      </div>


    </div>

    {/* Get app Section */}
    <div className="pt-20  flex justify-center items-center min-h-[400px]">
      <div className="bg-gray-100 rounded-2xl pt-6 pb-0 p-x-0 max-w-[1000px] min-h-[300px] flex flex-col items-center justify-center">
        <h2 className="text-4xl font-semibold text-gray-800 text-center">Get the Finzo Mobile app.</h2>
        <p className="text-gray-600 text-lg mt-2 text-center">With this platform,you can access your account anywhere, <br/>anytime for balance and so much more.</p>
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
      <div className="flex flex-col justify-center w-full lg:w-1/2">
        <img src={Footer} alt="group" className="w-16 h-16" />
        <h1 className="text-6xl font-bold mt-10 text-gray-800 text-center lg:text-left">
          Keep up with the <br/> latest
        </h1>
        <p className="text-gray-600 text-lg mt-2 text-center lg:text-left">
          With this platform, you can access your account anywhere, <br/> anytime for balance and so much more.
        </p>
      </div>

      {/* Second Half */}
      <div className="flex flex-col justify-end w-full lg:w-1/2 mt-xl lg:mt-0 lg:pl-6">
        <p className="text-white font-bold text-2xl mb-4">
          Stay up to date
        </p>
        <input
          type="text"
          placeholder="Enter your email"
           className="w-full p-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
</div>

  </div>






    </div>
  );
};

export default Navbar;
