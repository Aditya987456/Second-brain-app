import { QrCode } from "lucide-react";

import qrcode1 from "../assets/qrcode1.png"
import { HeartPlus } from 'lucide-react';


export function SupportPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-darkbg flex flex-col items-center justify-center px-6 py-16">
      
      {/* Heading */}
      <h1 className=" mt-4 text-2xl flex md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        <HeartPlus className="sm:h-14 h-10 w-14 mr-0 sm:mr-4 pb-2 text-purple-600" /> Support Second Brain
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-xl mb-10">
        I’m building <span className="font-semibold">Second Brain</span> to help people 
        organize their knowledge with AI-powered search.  
        If you find it useful, you can support me and keep this project alive 💜
      </p>

      {/* Payment Options */}
      <div className="grid md:grid-cols-2 gap-10 max-w-3xl w-full">
        
        {/* UPI QR */}
        <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl
         dark:hover:shadow-purple-600 dark:shadow-sm rounded-2xl p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Pay via UPI
          </h2>
          <p className="text-md text-gray-500 dark:text-gray-400 mb-4">
            Scan the QR code with your UPI app
          </p>
          <div className="flex items-center justify-center">
            <img 
              src={qrcode1} 
              alt="UPI QR" 
              className="w-48 h-48 rounded-xl p-2 dark:invert border border-gray-300 dark:border-gray-600"
            />
          </div>
          <p className="mt-4 text-md text-gray-500 dark:text-gray-400">
            or send to <span className="font-serif text-indigo-600 dark:text-purple-400">adityaraj844126@oksbi</span>
          </p>
        </div>

        {/* Buy Me a Coffee */}
        <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl 
            dark:hover:shadow-purple-600 dark:shadow-sm rounded-2xl p-6 text-center flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Buy Me a Coffee
          </h2>
          <p className="text-md text-secondary dark:text-gray-400 mb-4">
            Support me with a coffee and keep me coding ☕
          </p>
          <a 
            href="https://www.buymeacoffee.com/adityaraj_x" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            Buy Me a Coffee
          </a>
        </div>
      </div>

    
    </div>
  );
}
