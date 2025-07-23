import { useState } from "react"
import { AddContent } from "../components/AddContent"
import { Button } from "../components/Button"
import { Card } from "../components/card"
import { AddIcons } from "../icons/PlusIcon"
import { ShareIcons } from "../icons/ShareIcon"
import { Sidebar } from "../components/sidebar"
import { useContent } from "../hooks/useContent"
import AddContentModal from "../components/modal"
import { SearchBar } from "../components/Searchbar"



import { useOutletContext } from "react-router-dom";

type OutletContextType = {
  isSidebarOpen: boolean;
};




export function Dashboard() {

  const [isTwitterScriptLoaded, setTwitterScriptLoaded] = useState(false);

  const { isSidebarOpen } = useOutletContext<OutletContextType>();

const [isOpen, setIsOpen] = useState(false); // Set to false initially in real project
  const { contents, loading, fetchcontents } = useContent();
 
  //const [ modalcard, setModalcard ]=useState(false);

  // if (loading) {
  //   return <div className="p-4">Loading your brain... 🧠</div>;
  // }

  return (

   <div className={` bg-green-500  ${ 
          isSidebarOpen ? "ml-72" : "ml-16"} `} >

    

    <div className={`p-4 min-h-screen transition-all duration-300 ease-in-out `}>


        { isOpen && <AddContentModal 
          isOpen={isOpen}
          fetchcontents={fetchcontents}
          onClose={ ()=>{ setIsOpen(false) }}
           /> }

  {/*  ------------- header of dashboard -> your sec brain , search bar, share, add, theme button. */}
        <div className="flex gap-4 justify-end items-center">
          {/* <div className="bg-green-400 mr-20"><SearchBar/></div> */}


          <Button  onClick={ ()=>{setIsOpen(true)} }  variant='primary'  text="Add content"  startIcon={<AddIcons/>}></Button>
          <Button  variant='secondary'  text="Share brain" startIcon={<ShareIcons/>} ></Button>

        </div>




  {/* -------------------------- all the cards are there ------------------ */}
        <div className="flex gap-4">
          {/* <Card link="https://youtu.be/p1v66VcK5HA?si=SjEpCw986F6-0b-6" title="Gana hai bhaiyt video" type="youtube" />
          <Card link="https://x.com/AdityaRaj_x/status/1925647114878521412" title='aditya raj x post' type='twitter'/> */}


          { loading? (<p className="bg-black text-red-50">loading...</p>):
            contents.map(({ type, link, title }) => {
              //const { type, link, title } = item;  // it is same as passing in the props like
              return <Card
                type={type}
                key={link}
                link={link}
                title={title} />;
            })
          }
        </div>

   




    </div>






   </div>
  )
}

