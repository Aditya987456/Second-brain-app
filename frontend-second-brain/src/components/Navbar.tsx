// import brain2icon from "../assets/brain2icon.png"
// //import { DarkmodeButton } from "./DarkmodeButton1"
// import { DarkmodeButton } from "./darkLightButton"

// //import { DarkmodeButton } from "./DarkmodeButton1"
// export const Navbar=()=>{
//     return <div>
//         <div className="flex justify-center pt-2  md:pt-6">
//         <header className="fixed h-16 w-full max-w-[1250px] bg-purple-100/30 backdrop-blur-md rounded-xl border-purple-600 shadow-md px-4 md:px-6 py-4 flex  md:flex-row items-center justify-between gap-4">
//             <div className="flex items-center gap-2 text-xl font-semibold">
//               <img src={brain2icon} alt="logo" className="w-10 h-10 text-2xl font font-extrabold "/>
//               <span>Second Brain</span>
//             </div>
//             <nav className="space-x-6 font-medium">
//              <div className="flex justify-end items-center space-x-4">
//               <a href="#" className="hover:text-purple-600">About</a>
//               <a href="#" className="hover:text-purple-600 dark:text-red-900">Contact</a>
//              <DarkmodeButton/>

//              </div>
//             </nav>
//         </header>
//       </div>

//     </div>
// }





//-----------------------------------------------------------------------------------

import brain2icon from "../assets/brain2icon.png"
import { DarkmodeButton } from "./darkLightButton"
import { useNavigate } from "react-router-dom";


export const Navbar = () => {

  const navigate=useNavigate()




  return (
    <div className="flex justify-center pt-2 md:pt-6 dark:bg-darkbg ">
     <header
  className="fixed z-[999] h-16 w-full max-w-[1250px] 
  bg-purple-200/30
  dark:bg-[#111111]/60
  backdrop-blur-md rounded-full md:rounded-xl
  border-purple-600 dark:border-[#1E1E1E]
  shadow-md dark:shadow-purple-900/30
  px-4 md:px-6 py-4 mx-1
  md:mt-0 dark:border-x-4
  flex items-center justify-between gap-4"
>
        {/* Logo + Title */}
        <div onClick={() => navigate('/')}
          className="cursor-pointer flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
          <img
            src={brain2icon}
            alt="logo"
            className="w-10 h-10  "
          />
          <span>Second Brain</span>
        </div>

        {/* Links + Dark Mode Button */}
        <nav className="font-medium">
          <div className="flex justify-end items-center space-x-6">
            <a
            onClick={()=>navigate('/about')}
              href="#"
              className="text-gray-800 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
            >
              About
            </a>
            <a
            onClick={()=>navigate('/contact')}
              href="#"
              className="text-gray-800 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
            >
              Contact
            </a>
            <DarkmodeButton />
          </div>
        </nav>
      </header>
    </div>
  )
}

