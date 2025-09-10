// ---------main landing page --> have to add grid or dot in bg-> in v2 -------

import heroImage from "../assets/heroImage.png"
import { useNavigate } from "react-router-dom";
import { HandleDemo } from "./HandleDemo";
import LandingSection from "../components/landingpage2";
//import heroimagedark1 from "../assets/heroimagedark1.png"
//import heroimagedark2 from "../assets/heroimagedark2.png"
import heroimagedark4 from "../assets/heroimagedark4.png"


export default function LandingPage() {

 

  const navigate=useNavigate()


  return (
    <div className=" min-h-screen text-black dark:text-white dark:bg-darkbg">
      {/* Header
      <Navbar/>    */}


      {/* Hero */}
      <section className="flex flex-col-reverse  md:flex-row md:justify-center  md:px-20 min-h-screen  max-w-7xl mx-auto mt-2 md:-mt-6 ">
        {/* Left Content */}
        <div className="flex-1 ">
          <div className="flex justify-center md:justify-normal">
          <h1 className="text-3xl md:text-6xl md:mt-40 -mt-20">
            <span className="block md:leading-[5rem] leading-[2.5rem] font-bold md:pl-0 pl-8">Your Second Brain</span>
            <span className="flex md:leading-[5rem] leading-[3rem] font-bold md:pl-2 pl-2">
              
              <span >with</span>
              <span className="block text-purple-600 font-extrabold ml-2">AI-Powered</span>
              <span className="md:hidden block text-purple-600 font-extrabold md:ml-2 ml-2">Search</span>
            
            </span> 
            <span className="hidden md:block  text-purple-600 font-extrabold md:ml-2 ml-16">Search</span>
          </h1>
          </div>


          <p className="text-sm md:text-xl dark:text-secondary font-medium text-slate-600 md:mt-10 mt-2 px-4 md:px-2 flex justify-center  md:justify-normal">
            {/* Store and organize your digital life — links,  YouTube <br className="md:hidden"/> videos, tweets, notes, and more. */}
          Second Brain doesn’t just store your knowledge — it thinks with you. Our AI understands context, connects ideas, and find ideas by meaning, not just keywords.
          </p>


          {/* <h2 className="flex justify-center md:justify-normal md:mt-24 mt-10 text-purple-500 font-bold text-2xl md:text-4xl">Powered by AI to search smarter</h2> */}
{/*           
          <div className="flex justify-center md:justify-normal  font-semibold text-gray-600 text-sm md:text-lg md:mt-2 px-4 md:px-2">
            Forget scrolling through bookmarks — just  ask,  and your  AI brain delivers</div>
            */}

            <div className="flex justify-center md:justify-normal items-stretch md:gap-24 gap-12 mt-8 md:mt-16 md:ml-10">
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 md:px-8 md:py-4 rounded-md md:rounded-xl text-sm md:text-lg font-semibold transition"
                >
                  Get Started
                </button>
                <button
                  className="dark:hover:bg-zinc-800 dark:text-white px-8 py-2 md:px-8 md:py-4 font-bold text-sm md:text-lg border-purple-600 border-2 hover:bg-purple-200 text-purple-900 rounded-md md:rounded-xl transition"
                   onClick={()=>HandleDemo(navigate)}
                >
                 
                  Try Demo
                </button>
            </div>

          </div>
        {/* image side wala */}
        <div className="flex-1 md:mt-4 -mt-2 ">
          
          <img
            src={heroImage} 
            alt="Second Brain image"
            className="w-full  max-w-lg mx-auto block dark:hidden"
          />

{/* when theme --> dark  */}
            <img
            src={heroimagedark4} 
            alt="Second Brain image"
            className="w-full hidden dark:block  max-w-lg mx-auto"
          />



        </div>
      </section>


      <LandingSection />

      



      
    </div>
  );
}


