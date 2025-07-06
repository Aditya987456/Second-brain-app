import { useState } from "react"
import { AddContent } from "../components/AddContent"
import { Button } from "../components/Button"
import { Card } from "../components/card"
import { AddIcons } from "../icons/PlusIcon"
import { ShareIcons } from "../icons/ShareIcon"
import { Sidebar } from "../components/sidebar"


export function Dashboard() {

  const [ modalcard, setModalcard ]=useState(false);
 

  return (

   <div>




    <Sidebar/>

    <div className="p-4 ml-72 min-h-screen border-2">


        <AddContent open={modalcard} onClose={ ()=>{
          setModalcard(false);
        }}/>

        {/* header of dashboard -> your sec brain , search bar, share, add, theme button. */}
        <div className="flex gap-4 justify-end">
          <Button  onClick={ ()=>{setModalcard(true)} }  variant='primary'  text="Add content"  startIcon={<AddIcons/>}></Button>
          <Button  variant='secondary'  text="Share brain" startIcon={<ShareIcons/>} ></Button>
        </div>


        <div className="flex gap-4">
          <Card link="https://youtu.be/p1v66VcK5HA?si=SjEpCw986F6-0b-6" title="Gana hai bhaiyt video" type="youtube" />
          <Card link="https://x.com/AdityaRaj_x/status/1925647114878521412" title='aditya raj x post' type='twitter'/>
        </div>

    </div>






   </div>
  )
}

