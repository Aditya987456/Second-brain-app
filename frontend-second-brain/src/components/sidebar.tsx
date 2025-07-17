import { CrossIcon } from "../icons/crossIcon"
import { TwitterIcon } from "../icons/twitterIcon"
import { YtIcons } from "../icons/ytIcons"
import { SidebarItems } from "./sidebarItems"
import brain2icon from "../assets/brain2icon.png"
import icontext from "../assets/icontext.png"
import secondbrainmain from "../assets/secondbrainmain.png"
import { MenuIcon } from "../icons/menu"

export const Sidebar=()=>{


    return <div>


        <div className=" h-screen md:bg-purple-50 border-r w-16 bg-purple-50 md:w-72 fixed left-0 md:top-0">

        {/* logo+cross  ---  in sidebar */}
        <div className="md:flex md:justify-between md:items-center md:relative md:-top-12">
            <div className="md:hidden flex justify-center text-center bg-green-700 "><MenuIcon/></div>
            <span className=" md:mt-2 md:size-60 mt-16"><img src={secondbrainmain} alt="logo" /></span>
            <span className="hidden pt-4 cursor-pointer pr-2 text-3xl text-gray-500  hover:text-gray-700">X</span>
        </div>

        {/* all the items of sidebar. */}
        <div className="mt-16">
            <ul className="relative left-4 text-lg space-y-6" >
                <li><SidebarItems text="Twitter" icon={<TwitterIcon/>}/></li>
                <li><SidebarItems text="Youtube" icon={<YtIcons/>}/></li>
            </ul>
            <div className="md:hidden md:size-10 text-green-500  hover:text-gray-700"><MenuIcon/></div>
        </div>





        {/* below -> logout button. */}
        <div className="mt-96 flex justify-center">
            <button className="bg-purple-600 rounded-md px-4 py-2 text-white">LOGOUT</button>
        </div>






    </div>




    </div>
}