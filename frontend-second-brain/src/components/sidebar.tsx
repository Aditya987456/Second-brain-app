import { CrossIcon } from "../icons/crossIcon"
import { TwitterIcon } from "../icons/twitterIcon"
import { YtIcons } from "../icons/ytIcons"
import { SidebarItems } from "./sidebarItems"
import brain2icon from "../assets/brain2icon.png"
import icontext from "../assets/icontext.png"
import secondbrainmain from "../assets/secondbrainmain.png"
import { MenuIcon } from "../icons/menu"
import { useState } from "react"
import { DocsIcon } from "../icons/docsIcons"
import { X, Twitter, Youtube, FileText, Link2,CircleEllipsis, LogOut, Instagram, Github } from "lucide-react";

export const Sidebar=()=>{

    const [ isSidebarOpen, setIsSidebarOpen ]=useState(true)


    return <div>


            <div className={`h-screen  border-r-2 bg-purple-50  fixed left-0  transition-all duration-300 ease-linear
                             
                             ${isSidebarOpen ? 'w-72 ' : 'w-16'}

                             `}>

          
   

                    
                    <div className=" left-0 top-0 ">
                            {/* --------- for the logo and menu mobile view -------- */}
                            <div
                                    className={`cursor-pointer transition-all duration-300 ease-linear                                
                                                ${isSidebarOpen ? 'ml-72 rotate-180' : 'ml-16 '}
                                                `}
                                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                    >
                                    <MenuIcon />
                                </div>




                            {/* -------------------- Logo + Text  ------------------- */}
                            <div className="flex items-center gap-2 ml-2 overflow-hidden bg-purple-200 rounded-lg mr-2">
                                <img src={brain2icon} alt="logo" className="w-12 shrink-0" />
                                <p
                                    className={`
                                    transition-all duration-300 ease-in-out 
                                    whitespace-nowrap 
                                    overflow-hidden
                                    text-2xl
                                    text-purple-700
                                    font-semibold

                                    ${isSidebarOpen ? 'opacity-100 w-auto ml-1' : 'opacity-0 w-0'}
                                    `}
                                >
                                    Second Brain
                                </p>
                            </div>


                    </div>



            {/* ------------- all the items of sidebar.  ---------------------- */}
                <div className="mt-16 whitespace-nowrap 
                                    overflow-hidden">
                    <ul className="relative left-0 text-md font-normal space-y-2 " >
                        <li><SidebarItems sidebar={isSidebarOpen} text="Twitter" icon={<TwitterIcon/>}/></li>
                        <li><SidebarItems sidebar={isSidebarOpen} text="Youtube" icon={<YtIcons/>}/></li>
                        <li><SidebarItems sidebar={isSidebarOpen} text="Github" icon={< Github/>}/></li>
                        <li><SidebarItems sidebar={isSidebarOpen} text="Documents" icon={<FileText className="text-yellow-400"></FileText>}/></li>
                        <li><SidebarItems sidebar={isSidebarOpen} text="Links" icon={<Link2 className="text-slate-600"></Link2>}/></li>
                        <li><SidebarItems sidebar={isSidebarOpen} text="Others" icon={<CircleEllipsis className="text-blue-400"></CircleEllipsis> }/></li>
                    </ul>
                </div>












            

























                





            {/* below -> logout button. */}
             <div className="mt-96  p-2 cursor-pointer  rounded-md flex justify-center hover:bg-purple-100">
                <LogOut></LogOut><p className={` pl-4 text-lg  ${isSidebarOpen ? 'opacity-100 w-auto ml-1' : 'opacity-0 w-0'}`} >Logout</p>
            </div>

        </div>






    </div>
}