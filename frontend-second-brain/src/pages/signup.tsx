import { Button } from "../components/Button";
import { Inputcomponent } from "../components/inputbox";

export function Signup() {

    return <div>

        <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">

            <div className="bg-white rounded-xl border-2 min-w-max px-8 py-6">
                <div className="flex justify-center items-center text-2xl pb-4 font-bold" ><h1>Create Account</h1></div>
                <Inputcomponent placeholder="EmailID"></Inputcomponent>
                <Inputcomponent placeholder="Password"></Inputcomponent>
                <div className="flex justify-center py-4">
                    <Button fullwidth={true} variant="primary"  text="Signup"/>
                </div>
            </div>

        </div>


    </div>
    
}