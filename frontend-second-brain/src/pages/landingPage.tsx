// src/pages/LandingPage.tsx

import { Link2, Youtube, Twitter, FileText } from "lucide-react";

import heroImage from "../assets/heroImage.png"
import { useNavigate } from "react-router-dom";
import { HandleDemo } from "./HandleDemo";


export default function LandingPage() {

 

  const navigate=useNavigate()


  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header
      <Navbar/>    */}


      {/* Hero */}
      <section className="flex flex-col-reverse  md:flex-row md:justify-center  md:px-20 min-h-screen  max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="flex-1 ">
          <div className="flex justify-center md:justify-normal">
          <h1 className="text-4xl md:text-7xl md:mt-40 -mt-20">
            <span className="block md:leading-[5rem] leading-[2rem] font-bold md:pl-0 pl-2">Create Your</span>
            <span className="block text-purple-600 font-extrabold">Second Brain</span>
          </h1>
          </div>

          <p className="text-sm md:text-lg font-medium text-gray-600 md:mt-4 mt-0 px-4 md:px-2 flex justify-center md:justify-normal">
            Store and organize your digital life — links,  YouTube <br className="md:hidden"/> videos, tweets, notes, and more.
          </p>

          <h2 className="flex justify-center md:justify-normal md:mt-24 mt-10 text-purple-500 font-bold text-2xl md:text-4xl">Powered by AI to search smarter</h2>
          
          <div className="flex justify-center md:justify-normal  font-semibold text-gray-600 text-sm md:text-lg md:mt-2 px-4 md:px-2">
            Forget scrolling through bookmarks — just  ask,  and your  AI brain delivers</div>
           
            <div className="flex justify-center md:justify-normal items-stretch gap-12 mt-8 md:mt-16 md:ml-20">
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 md:px-8 md:py-4 rounded-md md:rounded-xl text-sm md:text-lg font-semibold transition"
                >
                  Get Started
                </button>
                <button
                  className="px-4 py-2 md:px-8 md:py-4 font-bold text-sm md:text-lg border-purple-600 border-2 hover:bg-purple-200 text-purple-900 rounded-md md:rounded-xl transition"
                   onClick={()=>HandleDemo(navigate)}
                >
                 
                  Try Demo
                </button>
            </div>

          </div>
        {/* image side wala */}
        <div className="flex-1 md:mt-4 -mt-2">
          <img
            src={heroImage} 
            alt="Second Brain image"
            className="w-full  max-w-lg mx-auto"
          />
        </div>
      </section>


        <div className=" font-bold text-xl md:text-4xl flex justify-center md:-mt-8 mt-20 md:mb-8 ">
          Here’s What You Can Save
          </div>
      {/* cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-8 pb-16 max-w-7xl mx-auto md:mt-0 mt-6">
        <FeatureCard icon={<Link2 className="text-blue-600" />} title="Links" description="Save and manage your online resources." />
        <FeatureCard icon={<Youtube className="text-red-600" />} title="Videos" description="Organize and access your favorite clips." />
        <FeatureCard icon={<Twitter className="text-sky-500" />} title="Tweets" description="Keep a collection of your saved tweets." />
        <FeatureCard icon={<FileText className="text-purple-600" />} title="Docs" description="Collect and organize important documents." />
      </section>
    </div>
  );
}


function FeatureCard({ icon, title, description }: { icon: JSX.Element; title: string; description: string }) {
  return (
    <div className="border rounded-xl p-4 flex items-start gap-4 shadow-sm bg-purple-50">
      <div className="text-2xl">{icon}</div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
