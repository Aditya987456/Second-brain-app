import { useState } from "react";
import { X, Twitter, Youtube, FileText, Link2,CircleEllipsis, Instagram } from "lucide-react";

export default function AddContentModal() {
  const [isOpen, setIsOpen] = useState(true); // Set to false initially in real project

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white text-white p-6 rounded-lg w-80 relative space-y-6">
        
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          onClick={() => setIsOpen(false)}
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold text-center">Add Content</h2>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex flex-col items-center p-4 bg-gray-100 rounded hover:bg-gray-600">
            <Twitter className="w-6 h-6 text-sky-400" />
            <span className="mt-2 text-sm">Tweet</span>
          </button>

          <button className="flex flex-col items-center p-4 bg-gray-700 rounded hover:bg-gray-600">
            <Youtube className="w-6 h-6 text-red-500" />
            <span className="mt-2 text-sm">Video</span>
          </button>

          <button className="flex flex-col items-center p-4 bg-gray-700 rounded hover:bg-gray-600">
            <FileText className="w-6 h-6 text-yellow-400" />
            <span className="mt-2 text-sm">Document</span>
          </button>

          <button className="flex flex-col items-center p-4 bg-gray-700 rounded hover:bg-gray-600">
            <Link2 className="w-6 h-6 text-blue-400" />
            <span className="mt-2 text-sm">Link</span>
          </button>

          <button className="flex flex-col items-center p-4 bg-gray-700 rounded hover:bg-gray-600">
            <Instagram className="w-6 h-6 text-pink-500" />
            <span className="mt-2 text-sm">Instagram</span>
          </button>


          <button className="flex flex-col items-center p-4 bg-gray-700 rounded hover:bg-gray-600">
            <CircleEllipsis className="w-6 h-6 text-blue-400" />
            <span className="mt-2 text-sm">Others</span>
          </button>




        </div>

        <button
          className="mt-4 w-full py-2 bg-gray-700 rounded hover:bg-gray-600 text-sm"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
