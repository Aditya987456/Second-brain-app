import type { ReactElement } from "react";

interface ButtonProps{
    variant:"primary" | "secondary";
    size?:"sm" | "md" | "lg";
    text:string;
    startIcon?:ReactElement;   //? : optional.
    endIcon?:ReactElement;
    onClick?: ()=>void;
    fullwidth?:boolean;
    loading?:boolean;

}

const variantClasses = {
    "primary": "bg-purple-600 text-white",
    "secondary":"bg-purple-100 text-purple-600", 
}

const defaultstyles= "px-4 py-2 rounded-md mt-2 mb-2 mr-2 cursor-pointer flex items-center"

export const Button =({variant, text, startIcon, onClick, fullwidth}:ButtonProps)=>{

    return <button onClick={onClick} className={variantClasses[variant] + " " + defaultstyles + 
                    `${fullwidth ? "py-2 px-4 bg-purple-600 text-white font-medium rounded hover:bg-purple-800 transition duration-200  w-full flex justify-center items-center " : " " }`
    }>
        <span className="pr-3" >{startIcon}</span>
        {text}
    </button>

}