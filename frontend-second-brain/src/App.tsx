import { Button } from "./components/Button"
import { AddIons } from "./icons/PlusIcon"


function App() {
 

  return (
    <>
     
      <div className="bg-blue-50">  hi there</div>

    <Button

      varient={"secondary"}
      startIcon={<AddIons/>}
       

    ></Button>

    </>
  )
}

export default App
