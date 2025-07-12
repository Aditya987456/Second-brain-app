import { useState } from "react"
import { AddContent } from "../components/AddContent"
import { Button } from "../components/Button"
import { Card } from "../components/card"
import { AddIcons } from "../icons/PlusIcon"
import { ShareIcons } from "../icons/ShareIcon"
import { Sidebar } from "../components/sidebar"
import { useContent } from "../hooks/useContent"
import AddContentModal from "../components/modal"


export function Dashboard() {
const [isOpen, setIsOpen] = useState(false); // Set to false initially in real project
  const { contents, loading, fetchcontents } = useContent();
  //const [ modalcard, setModalcard ]=useState(false);

  if (loading) {
    return <div className="p-4">Loading your brain... 🧠</div>;
  }

  return (

   <div>

    <Sidebar/>

    <div className="p-4 ml-72 min-h-screen border-2">


        { isOpen && <AddContentModal 
          isOpen={isOpen}
          fetchcontents={fetchcontents}
          onClose={ ()=>{ setIsOpen(false) }}
           /> }

        {/* header of dashboard -> your sec brain , search bar, share, add, theme button. */}
        <div className="flex gap-4 justify-end">
          <Button  onClick={ ()=>{setIsOpen(true)} }  variant='primary'  text="Add content"  startIcon={<AddIcons/>}></Button>
          <Button  variant='secondary'  text="Share brain" startIcon={<ShareIcons/>} ></Button>
        </div>


        <div className="flex gap-4">
          {/* <Card link="https://youtu.be/p1v66VcK5HA?si=SjEpCw986F6-0b-6" title="Gana hai bhaiyt video" type="youtube" />
          <Card link="https://x.com/AdityaRaj_x/status/1925647114878521412" title='aditya raj x post' type='twitter'/> */}

          { loading? (<p className="bg-black text-red-50">loading...</p>):
            contents.map(({ type, link, title }) => {
              //const { type, link, title } = item;  // it is same as passing in the props like
              return <Card type={type} link={link} title={title} />;
            })
          }


        </div>

   
    </div>






   </div>
  )
}

