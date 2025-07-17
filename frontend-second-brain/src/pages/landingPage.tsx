// src/pages/LandingPage.tsx

import { Link2, Youtube, Twitter, FileText } from "lucide-react";
import brain2icon from "../assets/brain2icon.png"
import heroImage from "../assets/heroImage.png"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="flex justify-center pt-6">
        <header className="fixed h-16 w-full max-w-[1250px] bg-purple-100/30 backdrop-blur-md rounded-xl border-purple-600 shadow-md px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <img src={brain2icon} alt="logo" className="w-10 h-10 text-2xl font font-extrabold "/>
              <span>Second Brain</span>
            </div>
            <nav className="space-x-6 font-medium">
             
              <a href="#" className="hover:text-purple-600">About</a>
              <a href="#" className="hover:text-purple-600">Contact</a>
            </nav>
        </header>
      </div>
     


      {/* Hero */}
      <section className="flex flex-col-reverse  lg:flex-row  px-20 min-h-screen  max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-7xl mt-40">
            <span className="block leading-[5rem]  font-bold">Create Your</span>
            <span className="block text-purple-600 font-extrabold">Second Brain</span>
          </h1>

          <p className="text-lg font-medium text-gray-600 mt-4 px-2">
            Store and organize your digital life — links, YouTube videos, tweets, notes, and more.
          </p>

          <h2 className="mt-24 text-purple-500 font-bold text-4xl">Powered by AI to search smarter</h2>
          <div className="font-semibold text-gray-600 text-lg mt-2 px-2">Forget scrolling through bookmarks — just ask, and your AI brain delivers</div>
          
          <button className="bg-purple-600 mt-20 ml-20 hover:bg-purple-700 text-white px-8 py-5 rounded-xl text-lg font-semibold transition">
            Get Started
          </button>
          <button className="ml-8 px-8 py-4 font-bold text-lg border-purple-600 border-2 hover:bg-purple-200 text-purple-900 rounded-xl transition">Try Demo</button>
        
        </div>

        {/* Illustration */}
        <div className="flex-1 mb-10 lg:mb-0">
          <img
            src={heroImage} // Replace with actual path
            alt="Second Brain Illustration"
            className="w-full  max-w-lg mx-auto"
          />
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-8 pb-16 max-w-7xl mx-auto">
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
    <div className="border rounded-xl p-4 flex items-start gap-4 shadow-sm bg-white">
      <div className="text-2xl">{icon}</div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
