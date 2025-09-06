import { useRef } from "react";
import { Button } from "../components/Button";
import { Inputcomponent } from "../components/inputbox";
import axios from "axios";
import { BACKEND_URL } from "./config";
import { useNavigate } from "react-router-dom";
import { Dashboard } from "./dashboard";
import brainimg from "../assets/brainimg.png"
import brainimgdark from "../assets/brainimgdark.png"




export function Signin() {

    const navigate = useNavigate()     //$$$should be inside component

    const emailidref=useRef<HTMLInputElement>(null);
    const passwordref=useRef<HTMLInputElement>(null);



    async function signin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        try {

            const emailid=emailidref.current?.value
            const password=passwordref.current?.value


            const response=await axios.post(BACKEND_URL+"/api/v1/signin", {
                emailID:emailid,
                password
            })

            const Token=response.data.Token;
            
            localStorage.setItem("token",Token)
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("isDemo", response.data.isDemo);




            navigate('/dashboard')

            
        }catch (error) {
            console.log(error.response?.data);  // <-- ?
            alert('Error signing in: ' + error.response?.data?.message || 'Something went wrong');
            }

    }

    return (
        
        <div className="flex flex-grow mt-20 justify-center  items-center px-6 py-12">
            
            <div className="dark:bg-darkbg dark:text-white shadow-md dark:border-t-purple-400
             dark:border-zinc-800 dark:shadow-slate-950 max-w-4xl w-full rounded-3xl
              border-2 border-t-8 border-t-purple-400 bg-white overf grid grid-cols-1 md:grid-cols-2">



                 {/* left part area. */}
                 <div className="p-8">
                    <h2 className="text-4xl font-bold mb-10 flex justify-center  leading-tight" >Create Your <br />Second Brain</h2>
                    <form className="space-y-4 px-6">
                       

                       <div>Gmail
                       <Inputcomponent
                            reference={emailidref}
                            placeholder="gmail"
                       /></div>


                        <div>Password
                        <Inputcomponent
                            reference={passwordref}
                            placeholder="password"
                       /></div>

                        <div className="py-4">
                       <Button
                            variant="primary"
                            text="Sign in"
                            fullwidth={true}
                            //@ts-ignore
                            onClick={ (e:any)=>signin(e) }
                       /></div>

                    </form> 
                    <p className="text-sm text-gray-500 ml-20" >
                        Don't have an Account? {"  "} <a href="/signup" className="text-[#6A5ACD] text-lg fond-md hover:underline">SignUp</a>
                    </p>
                    
                 </div>


                 {/* another div for image part half */}
                 <div className="dark:bg-[#0F0F0E] hidden rounded-xl md:flex flex-col items-center bg-white">
                    <img src={brainimg} className="block dark:hidden w-80 mt-4" alt="logo" /> 
                     <img src={brainimgdark} className="hidden dark:block w-80 mt-4" alt="logo" />

                    <p
                        className="dark:text-secondary -mt-10 text-center text-[#333] text-md font-medium leading-relaxed"
                        >
                        Second Brain doesn’t just store your knowledge — it thinks with you. Our AI understands context, connects ideas, and find ideas by meaning, not just keywords.</p>
                 </div>
            </div>



        </div>
        )   
}