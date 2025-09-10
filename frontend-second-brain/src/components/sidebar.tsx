
import { CrossIcon } from "../icons/crossIcon"
import { TwitterIcon } from "../icons/twitterIcon"
import { YtIcons } from "../icons/ytIcons"
//import { SidebarItems isActive={filter === "Twitter"}  } from "./sidebarItems"
import brain2icon from "../assets/brain2icon.png"
import icontext from "../assets/icontext.png"
import secondbrainmain from "../assets/secondbrainmain.png"
import { MenuIcon } from "../icons/menu"
import { useState } from "react"
import { DocsIcon } from "../icons/docsIcons"
import { X, Twitter, Youtube, FileText, Link2,CircleEllipsis, LogOut, Instagram, Github } from "lucide-react";
import { SidebarItems } from "./sidebarItems"
import { DashboardContext } from "../pages/DashboardContext"
import React from "react"
import { DarkmodeButton } from "./darkLightButton"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
import { ChevronsLeft } from 'lucide-react';



// //types for sidebar arguments....
// interface SidebarProps {
//     isSidebarOpen: boolean;
//     setIsSidebarOpen: (value: boolean) => void;
//     setFilter:(value:string)=>void;
//     filter: string
//     showResults:boolean
//     setShowResults: (value: boolean) => void;
//     query:string
//     setQuery:(value:string)=>void
// }




export const Sidebar=()=>{
const navigate=useNavigate()
  const contextDashboard = React.useContext(DashboardContext);
  if (!contextDashboard) return null;

  const { query, setQuery, filter, setFilter, showResults, setShowResults, isSidebarOpen, setIsSidebarOpen } = contextDashboard;


  //--logout funtionality---
  const logoutUser=()=>{
    localStorage.removeItem('token')
    navigate('/')
  }




    return <div>


            <div className={`z-20 top-4 rounded-r-xl h-screen  border-r border-t bg-purple-50 dark:bg-[#363636] dark:border-gray-700 dark:text-white 
             fixed left-0  transition-all duration-300 ease-linear rounded-br-sm
                             
                             ${isSidebarOpen ? 'w-72 ' : 'w-14 md:w-16'}

                             `}>

          
   
                    <div className=" left-0 top-0 ">
                            {/* --------- for the logo and menu mobile view -------- */}
                            <div
                                    className={`cursor-pointer transition-all duration-300 ease-linear                                
                                                ${isSidebarOpen ? 'ml-72 rotate-180' : 'ml-14 md:ml-16 '}
                                                `}
                                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                    >
                                    <MenuIcon />
                                </div>




                            {/* -------------------- Logo + Text  ------------------- */}
                            <div
                            
                            onClick={() =>{ setFilter(""), setShowResults(false), setQuery("") } }
                            
                             className="     dark:bg-purple-600 cursor-pointer flex items-center gap-2 ml-2
                                             overflow-hidden bg-purple-200 rounded-lg mr-2
                                                    ">
                                <img src={brain2icon} alt="logo" className="w-12 dark:filter dark:brightness-0 dark:invert shrink-0" />
                                <p
                                    className={`
                                        


                                    transition-all duration-300 ease-linear 
                                    whitespace-nowrap 
                                    overflow-hidden
                                    text-2xl
                                    text-purple-700
                                    dark:text-white
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
                        <li><SidebarItems isActive={filter === "Twitter"}  setFilter={setFilter} sidebar={isSidebarOpen} text="Twitter" icon={<TwitterIcon/>}/></li>
                        <li><SidebarItems isActive={filter === "Youtube"}  setFilter={setFilter} sidebar={isSidebarOpen} text="Youtube" icon={<YtIcons/>}/></li>
                        <li><SidebarItems isActive={filter === "Github"}  setFilter={setFilter} sidebar={isSidebarOpen} text="Github" icon={< Github/>}/></li>
                        <li><SidebarItems isActive={filter === "Docs"}  setFilter={setFilter} sidebar={isSidebarOpen} text="Docs" icon={<FileText className="text-yellow-400"></FileText>}/></li>
                        <li><SidebarItems isActive={filter === "Links"}  setFilter={setFilter} sidebar={isSidebarOpen} text="Link" icon={<Link2 className="text-slate-600 dark:text-slate-300"></Link2>}/></li>
                        <li><SidebarItems isActive={filter === "Others"}  setFilter={setFilter} sidebar={isSidebarOpen} text="Others" icon={<CircleEllipsis className="text-blue-400"></CircleEllipsis> }/></li>
                        <li className=""><span className="pl-3 flex"><DarkmodeButton/>
                            <p className="pl-3 flex justify-center items-center"><ChevronsLeft />Toogle theme </p>
                            </span>
                        </li>
                    </ul>
                </div>



            {/* below -> logout button. */}
             <div
             onClick={() => {
                if (confirm('Are you sure you want to log out?')) {
                    logoutUser();
                    //----jab tak ye message show karega tab tak we will came at landing page so no need of it.
                    // toast.success('Logged out successfully!', {
                    //     position: 'top-right',
                    //     autoClose: 300,
                    //   });
                }
                }}
              className="dark:hover:bg-gray-800 relative top-44 md:top-72 p-2 cursor-pointer  rounded-md flex justify-center hover:rounded-md  hover:bg-purple-200">
                <LogOut></LogOut><p className={` pl-4 text-lg  ${isSidebarOpen ? 'opacity-100 w-auto ml-1 ' : 'opacity-0 w-0'}`} >Logout</p>
            </div>

        </div>






    </div>
}