import { useRef } from "react";
import { Button } from "../components/Button";
import { Inputcomponent } from "../components/inputbox";
import axios from "axios";
import { BACKEND_URL } from "./config";
import { useNavigate } from "react-router-dom";
import { Dashboard } from "./dashboard";
import brainimg from "../assets/brainimg.png"





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



            navigate('/dashboard')

            
        }catch (error) {
            alert('error in signing in'+ error)
        }
    }

    return (
        
        <div className="min-h-screen bg-gray-200  flex justify-center items-center px-6 py-12">
            
            <div className=" max-w-4xl w-full rounded-xl shadow-lg bg-white overf grid grid-cols-1 md:grid-cols-2">



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
                        Don't have an Account? {"  "} <a href="/signup" className="text-[#6A5ACD] hover:underline">SignUp</a>
                    </p>
                    
                 </div>


                 {/* another div for image part half */}
                 <div className="hidden rounded-xl md:flex flex-col items-center bg-white">
                    <img src={brainimg} className="w-80 mt-4" alt="logo" /> 

                    <p
                        className=" -mt-10 text-center text-[#333] text-xl font-medium leading-relaxed"
                        >
                        Store links, videos, tweets and  <br/>ideas with ease.</p>
                 </div>
            </div>



        </div>
        )   
}