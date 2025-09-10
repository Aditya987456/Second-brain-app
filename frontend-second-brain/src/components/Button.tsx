import type { ReactElement } from "react";

interface ButtonProps{
    variant:"primary" | "secondary";
    size?:"sm" | "md" | "lg";
    text:string;
    startIcon?:ReactElement;   //? : optional.
    endIcon?:ReactElement;
    onClick?: (e?: any) => void;
    fullwidth?:boolean;
    loading?:boolean;

}

const variantClasses = {
    "primary": "bg-purple-600 text-white hover:bg-purple-500 dark:hover:bg-purple-800",
    "secondary":"bg-purple-100 text-purple-600 dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:text-white", 
}

const defaultstyles= "px-1 md:px-4 py-2 rounded-md mt-2 mb-2 mr-2 cursor-pointer flex items-center"

export const Button =({variant, text, startIcon, onClick, fullwidth}:ButtonProps)=>{

    return <button onClick={onClick} className={variantClasses[variant] + " " + defaultstyles + 
                    `${fullwidth ? "py-2 px-4 bg-purple-600 text-white font-medium rounded hover:bg-purple-800 transition duration-300  w-full flex justify-center items-center " : " " }`
    }>
        <span className="md:pr-3 pr-1" >{startIcon}</span>
        {text}
    </button>

}