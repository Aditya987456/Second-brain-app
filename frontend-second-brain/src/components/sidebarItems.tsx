import type { ReactElement } from "react";

export function SidebarItems( {text,icon}:{
    text:string;
    icon:ReactElement;
} ) {

    return <div className="flex gap-6">
                <span className="size-2">{icon}</span>
                <span>{text}</span>   
            </div>
    
}