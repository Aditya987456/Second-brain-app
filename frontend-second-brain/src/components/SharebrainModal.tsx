//---- it is for sharing the individual contents by coping the link of that content.


import { X } from "lucide-react"
import { Copy } from "lucide-react"
import toast from "react-hot-toast"


interface SharebrainModalProps {
    setShareModal?: React.Dispatch<React.SetStateAction<boolean>>
    sharelink:string
}


export const SharebrainModal=({setShareModal,sharelink}:SharebrainModalProps)=>{


     const handleCopy = () => {
    navigator.clipboard.writeText(sharelink)
      .then(() => { toast.success("Link copied to clipboard")
                    setShareModal?.(false) }
    )
      .catch(() => toast.error("Failed to copy link"));
  };




    return(
         <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">

            {/* ---------------------------------  modal div   ------------------------------  */}
            <div className="dark:border dark:border-zinc-600 bg-white dark:bg-[#323232] text-black w-full max-w-sm mx-4 sm:mx-0 rounded-lg px-10 py-12 relative transition-all">
                    
                {/* bg-white text-black px-4 py-8 rounded-lg   space-y-6 relative */}
                    {/* header of the add content modal. */}
                    <button
                    className="absolute top-3 dark:hover:text-white dark:text-gray-400 right-3 text-gray-400 hover:text-gray-800"
                    onClick={()=>setShareModal?.(false)}
                    >
                    <X />
                    </button>

         <h3 className="text-2xl flex dark:text-white justify-center font-semibold mb-6">Share this content</h3>

        {/* Link Input */}
        <input 
          type="text" 
          value={sharelink}
          readOnly
          className="w-full dark:invert p-2 border rounded-md mb-4"
        />

        {/* Copy Button */}
        <button 
          onClick={handleCopy}
          className="flex items-center justify-center w-full gap-2 bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 mb-3"
        >
          <Copy size={18} />
          Copy Link
        </button>

        {/* Cancel Button */}
        <button 
          onClick={()=>setShareModal?.(false)}
          className="w-full bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 dark:text-white text-gray-700 p-2 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>




            </div>
        </div>
    )
}