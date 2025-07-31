import brain2icon from "../assets/brain2icon.png"
import { DarkButton } from "./DarkmodeButton"

export const Navbar=()=>{
    return <div>
        <div className="flex justify-center   pt-6">
        <header className="fixed h-16 w-full max-w-[1250px] bg-purple-100/30 backdrop-blur-md rounded-xl border-purple-600 shadow-md px-4 md:px-6 py-4 flex  md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <img src={brain2icon} alt="logo" className="w-10 h-10 text-2xl font font-extrabold "/>
              <span>Second Brain</span>
            </div>
            <nav className="space-x-6 font-medium">
             <div className="flex justify-end items-center space-x-4">
              <a href="#" className="hover:text-purple-600">About</a>
              <a href="#" className="hover:text-purple-600">Contact</a>
             <DarkButton/>

             </div>
            </nav>
        </header>
      </div>

    </div>
}
