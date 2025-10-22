import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
  placeholder: string;
  reference?: any;
  type?: string;
}

export function Inputcomponent({ placeholder, reference, type = "text" }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <input
        ref={reference}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        className="w-full px-4 py-2 border dark:bg-[#191919] dark:text-white border-[#E0E0E0] rounded focus:outline-none focus:ring-1 focus:ring-[#867eb5] pr-10" 
        // 👆 Added pr-10 to make space for the icon on the right
      />

      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      )}
    </div>
  );
}
