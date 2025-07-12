// src/pages/LandingPage.tsx

import { Brain, Link2, Youtube, Twitter, FileText } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 shadow-sm">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Brain className="text-blue-600" />
          <span>My Second Brain</span>
        </div>
        <nav className="space-x-6 font-medium">
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">About</a>
          <a href="#" className="hover:text-blue-600">Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex flex-col-reverse lg:flex-row items-center px-8 py-12 max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Create Your <br /> <span className="text-blue-600">Second Brain</span>
          </h1>
          <p className="text-lg text-gray-600">
            Store links, videos, tweets and ideas in one convenient place.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-semibold transition">
            Get Started
          </button>
        </div>

        {/* Illustration */}
        <div className="flex-1 mb-10 lg:mb-0">
          <img
            src="/illustration.svg" // Replace with actual path
            alt="Second Brain Illustration"
            className="w-full max-w-lg mx-auto"
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
