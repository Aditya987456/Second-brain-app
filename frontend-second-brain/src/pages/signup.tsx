import { useRef } from "react";
import { Button } from "../components/Button";
import { Inputcomponent } from "../components/inputbox";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BACKEND_URL } from "./config";
import brainimg from "../assets/brainimg.png"
export function Signup() {



     const UsernameRef = useRef<HTMLInputElement>(null);
     const EmailRef = useRef<HTMLInputElement>(null);
     const PasswordRef = useRef<HTMLInputElement>(null);

     const navigate = useNavigate()
    




    async function signup(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();    //$$$$ because --> triggers a default submit, which reloads the page unless explicitly prevented.
        try {

        const username = UsernameRef.current?.value;
        const password = PasswordRef.current?.value;
        const emailid = EmailRef.current?.value;

        //checking not submit the form empty.
        if (!emailid || !username || !password) {
            alert("All fields are required.");
            return;
            }


        //sending post request --> to backend
        await axios.post(BACKEND_URL + "/api/v1/signup" , {
            emailID:emailid, password, username
        });

        navigate('/signin')  //redirect to the next page.

        alert('You are signed in')


            
        } catch (error) {
            console.log('signup error'+ error)
            
        }
        
    }


    return (
        
        <div className="min-h-screen   flex justify-center items-center px-6 py-12">
            
            <div className=" max-w-4xl w-full rounded-xl border-2 border-t-8 border-t-purple-400 bg-white overf grid grid-cols-1 md:grid-cols-2">



                 {/* left part area. */}
                 <div className="p-8">
                    <h2 className="text-4xl font-bold mb-10 flex justify-center  leading-tight" >Create Your <br />Second Brain</h2>
                    <form className="space-y-4 px-6">
                       
                       <div>Username
                        <Inputcomponent 
                            reference={UsernameRef}
                            placeholder="Username"
                       /></div>


                       <div>Gmail
                       <Inputcomponent
                            reference={EmailRef}
                            placeholder="gmail"
                       /></div>


                        <div>Password
                        <Inputcomponent
                            reference={PasswordRef}
                            placeholder="password"
                       /></div>

                        <div className="py-4">
                       <Button
                            variant="primary"
                            text="Sign up"
                            fullwidth={true}
                            onClick={(e:any)=>signup(e)}
                       /></div>

                    </form> 
                    <p className="text-sm text-gray-500 ml-20" >
                        Already have an Account? {"  "} <Link to="/signin" className="text-[#6A5ACD] hover:underline text-lg fond-md">SignIn</Link>

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


