
import { useState } from "react"
import { CrossIcon } from "../icons/crossIcon"
import { Button } from "./Button"
import AddContentModal from "./modal"
import { Inputcomponent } from "./inputbox"


export const AddContent=({open, onClose})=>{

    return <div>

       { open  &&  <div className="bg-black w-screen h-screen fixed inset-0  bg-opacity-70 " >
            <div className="w-screen h-screen flex justify-center items-center relative ">
                <span className="bg-white opacity-100 rounded-md py-4 px-2">


                    <div className=" flex items-center justify-end">
                        <h2 className="text-xl font-semibold text-center px-20">Add Content</h2>
                        <div className=" flex justify-end" onClick={onClose}>
                            <CrossIcon/>
                        </div>
                    </div>

                    <div className="flex justify-center items-center my-2">
                    <div>
                        <Inputcomponent placeholder={"Title..."}/>
                        <Inputcomponent placeholder={"Link..."}/>
                    </div>
                    </div>

                    <div className="flex justify-center">
                        <Button text="ADD Content" variant="primary"></Button>
                    </div>
                    


     
                </span>
            </div>




        </div>}

        {/* { open  &&   <AddContentModal/> } */}

    </div>
}







    
}