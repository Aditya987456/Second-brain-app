import { X } from "lucide-react";
import { MonitorCog } from "lucide-react";

interface DashboardShareProps{
    setShareDashboard:React.Dispatch<React.SetStateAction<boolean>>
}

export const DashboardShare=({setShareDashboard}:DashboardShareProps )=>{

    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
       <div className="dark:border border dark:border-zinc-600 bg-white dark:bg-[#323232] text-black w-full max-w-sm mx-4 sm:mx-0 rounded-lg px-4 py-12 relative transition-all">
        
        
        <button 
          className="absolute top-3 right-3 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 p-1 hover:bg-gray-200 rounded-full"
          onClick={()=>setShareDashboard?.(false)}
        >
          <X size={20} />
        </button>

       
        <h3 className="text-2xl dark:text-white flex justify-center font-semibold mb-10">Dashboard Share</h3>

        
<p className="text-gray-600 dark:text-gray-300 text-lg mb-2">
        Sharing isn’t available yet. You can copy the link manually from each card’s share icon.
      </p>
      <span className="flex">
      <p className="text-purple-700 dark:text-purple-500 text-lg">
        Full sharing is coming soon—stay tuned! 
      </p><MonitorCog className="-mr-3 dark:text-purple-500 pl-1"/></span>
      </div>
    </div>
  );
}


