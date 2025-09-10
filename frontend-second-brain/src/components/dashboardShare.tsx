//  ---> currently whole dashboard share is not available


import { X } from "lucide-react";
import { MonitorCog } from "lucide-react";

interface DashboardShareProps{
    setShareDashboard:React.Dispatch<React.SetStateAction<boolean>>
}

export const DashboardShare=({setShareDashboard}:DashboardShareProps )=>{

    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
       <div className="dark:border border dark:border-zinc-600 bg-white dark:bg-[#323232] text-black w-full max-w-fit mx-4 sm:mx-0 rounded-lg px-4 py-12 relative transition-all">
        
        
        <button 
          className="absolute top-3 right-3 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 p-1 hover:bg-gray-200 rounded-full"
          onClick={()=>setShareDashboard?.(false)}
        >
          <X size={20} />
        </button>


      <div className="text-center p-4 bg-white dark:bg-[#323232] max-w-md w-full mx-4">
        
          <h1 className="text-4xl font-bold text-purple-700 dark:text-purple-300 mb-10">Dashboard Share 🚀</h1>
          
          <p className="text-gray-600 dark:text-white text-lg mb-4">
            Currently Sharing whole dashboard isn’t available yet. But you can copy the link manually from each card’s share icon.
          </p>

          <p className="text-purple-700 dark:text-purple-400 text-lg mb-6">
            Full sharing is coming soon—stay tuned! <span><MonitorCog className="inline-block align-middle ml-1" size={24} /></span>
          </p>

      </div>

      </div>
    </div>
  );
}





