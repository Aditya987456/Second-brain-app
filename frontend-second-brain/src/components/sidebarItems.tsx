import type { ReactElement } from "react";

export function SidebarItems( {text,icon,sidebar}:{
    text:string;
    icon:ReactElement;
    sidebar:boolean
} ) {

    return <div className="flex gap-6  hover:bg-purple-100 rounded-md transition-all duration-300 ease-in-out 
                                    whitespace-nowrap 
                                    overflow-hidden mr-2 ml-2 pl-3 p-2 cursor-pointer" >
                <span className="size-2">{icon}</span>
                <span className={`${sidebar ? 'opacity-100 w-auto ml-1' : 'opacity-0 w-0'}`}>{text}</span>   
            </div>
    
}