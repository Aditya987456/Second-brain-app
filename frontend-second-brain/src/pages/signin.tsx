import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Inputcomponent } from "../components/inputbox";
import axios from "axios";
import { BACKEND_URL } from "./config";
import { useNavigate } from "react-router-dom";
import brainimg from "../assets/brainimg.png"
import brainimgdark from "../assets/brainimgdark.png"
import toast from "react-hot-toast";
//import { BeatLoader } from "react-spinners";



export function Signin() {

    const navigate = useNavigate()     //$$$should be inside component

    const emailidref=useRef<HTMLInputElement>(null);
    const passwordref=useRef<HTMLInputElement>(null);
    const [ loader, setLoader]=useState(false)


//#### because we are accessing it in the finally block as well for clearing the timeout so for that we can't define it in the try block only.
  let stage1: ReturnType<typeof setTimeout>;
  let stage2: ReturnType<typeof setTimeout>;
  let stage3: ReturnType<typeof setTimeout>;
  let stage4: ReturnType<typeof setTimeout>;
  let stage_5_withRetry: ReturnType<typeof setTimeout>;



    async function signin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        setLoader(true)

        try {

            const emailid=emailidref.current?.value.trim().toLocaleLowerCase()
            const password=passwordref.current?.value.trim()


            //checking not submit the form empty.
            if (!emailid || !password) {
                toast.error("All fields are required.", { id: "signin" });
                return;
                }




            toast.loading("Signing in...", { id: "signin" });

            stage1 = setTimeout(() => {
                toast.loading("Starting server, please wait...", { id: "signin" });
                }, 15000);

            stage2 = setTimeout(() => {
                toast.loading("Connecting to backend...", { id: "signin" });
                }, 30000);

            stage3 = setTimeout(() => {
                toast.loading("Loading your second brain...", { id: "signin" });
                }, 45000);

            stage4 = setTimeout(() => {
                toast.loading("Final step in progress...", { id: "signin" });
                }, 60000);

            stage_5_withRetry = setTimeout(() => {
                toast.error("Still waiting? 🔁 Try refreshing.", {
                id: "signin",
                //---------???? refresh button also will add this later.
                // action: {      
                //   label: "🔄 Refresh",
                //   onClick: () => window.location.reload(),
                // },
                });
            }, 75000);


            const response=await axios.post(BACKEND_URL+"/api/v1/signin", {
                emailID:emailid,
                password
            })

            const Token=response.data.Token;
            
            localStorage.setItem("token",Token)
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("isDemo", response.data.isDemo);


            toast.success(response.data.message || "Signed in successfully!" , {
            id:'signin'
            }); 

            navigate('/dashboard')

            
        }catch (error:any) {
            console.log(error.response?.data);  // <-- ?
            toast.error(error.response?.data?.message || "Something went wrong" , {
            id:'signin'
        });
            }finally{
                setLoader(false)
                clearTimeout(stage1);
                clearTimeout(stage2);
                clearTimeout(stage3);
                clearTimeout(stage4);
                clearTimeout(stage_5_withRetry);
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
                            type="string"
                       /></div>


                        <div>Password
                        <Inputcomponent
                            reference={passwordref}
                            placeholder="password"
                            type="password"
                       /></div>

                        <div className="py-4">
                       <Button
                            variant="primary"
                            text={loader ? "Signing in..." : "Sign in"}
                            
                            
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