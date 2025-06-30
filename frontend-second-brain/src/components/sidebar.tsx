import { CrossIcon } from "../icons/crossIcon"
import { TwitterIcon } from "../icons/twitterIcon"
import { YtIcons } from "../icons/ytIcons"
import { SidebarItems } from "./sidebarItems"

export const Sidebar=()=>{


    return <div>





        <div className="h-screen bg-slate-50 border-r w-72 fixed left-0 top-0">

        {/* logo+cross  ---  in sidebar */}
        <div className="flex justify-between items-center relative top-3">
            <span className="pl-8 font-extrabold font-serif text-4xl">LOGO</span>
            <span><CrossIcon/></span>
            </div>

        {/* all the items of sidebar. */}
        <div className="mt-16">
            <ul className="relative left-4 text-lg space-y-6" >
                <li><SidebarItems text="Twitter" icon={<TwitterIcon/>}/></li>
                <li><SidebarItems text="Youtube" icon={<YtIcons/>}/></li>
            </ul>
        </div>





        {/* below -> logout button. */}
        <div className="mt-96 flex justify-center">
            <button className="bg-purple-600 rounded-md px-4 py-2 text-white">LOGOUT</button>
        </div>






    </div>




    </div>
}