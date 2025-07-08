import { Button } from "../components/Button";
import { Inputcomponent } from "../components/inputbox";

export function Signin() {

    return <div>

        <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">

            <div className="bg-white rounded-xl border-2 w-4/12 px-8 py-8">
                <div className="flex justify-center items-center text-2xl pb-4 font-bold" ><h1>Signin</h1></div>
                
                 <div className="pb-2"><h2>EmailID</h2>
                <Inputcomponent placeholder="EmailID"></Inputcomponent>
                </div>
                
               <div className="pb-2"><h2>Password</h2>
                <Inputcomponent placeholder="Password"></Inputcomponent>
                </div>

                <div className="flex justify-center py-4">
                    <Button fullwidth={true} variant="primary"  text="Signup"/>
                </div>
            </div>

        </div>


    </div>
    
}