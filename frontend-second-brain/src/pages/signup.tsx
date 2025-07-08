import { useRef } from "react";
import { Button } from "../components/Button";
import { Inputcomponent } from "../components/inputbox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./config";


export function Signup() {



    const UsernameRef = useRef<HTMLInputElement>(null);
    const EmailRef = useRef<HTMLInputElement>(null);
    const PasswordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate()
    

    async function signup() {
        try {

        const username = UsernameRef.current?.value;
        const password = PasswordRef.current?.value;
        const emailid = EmailRef.current?.value;


        //sending post request --> to backend
        await axios.post(BACKEND_URL + "/api/v1/signup" , {
            emailID:emailid, password, username
        });

        navigate('/signin')  //redirect to the next page.

        alert('You are signed in')


            
        } catch (error) {
            console.log(error)
            
        }
        
    }


    return <div>

        <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">

            <div className="bg-white rounded-xl border-2 w-4/12 px-8 py-8">
                <div className="flex justify-center items-center text-2xl pb-4 font-bold" ><h1>Create Account</h1></div>
                
                <div className="pb-2"><h2>Username</h2>
                <Inputcomponent reference={UsernameRef} placeholder="Username"></Inputcomponent>
                </div>

                 <div className="pb-2"><h2>EmailID</h2>
                <Inputcomponent reference={EmailRef} placeholder="EmailID"></Inputcomponent>
                </div>
                
               <div className="pb-2"><h2>Password</h2>
                <Inputcomponent reference={PasswordRef} placeholder="Password"></Inputcomponent>
                </div>

                <div className="flex justify-center py-4">
                    <Button onClick={signup} fullwidth={true} variant="primary"  text="Signup"/>
                </div>
            </div>

        </div>


    </div>
    
}