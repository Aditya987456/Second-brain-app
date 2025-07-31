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
import { SearchIcon } from "../icons/search"


import { useOutletContext } from "react-router-dom";

type OutletContextType = {
  isSidebarOpen: boolean;
};




export function Dashboard() {

  const [isTwitterScriptLoaded, setTwitterScriptLoaded] = useState(false);

  const { isSidebarOpen } = useOutletContext<OutletContextType>();

const [isOpen, setIsOpen] = useState(false); // Set to false initially in real project
const { contents, loading, fetchcontents, setContents } = useContent();

  //const [ modalcard, setModalcard ]=useState(false);

  // if (loading) {
  //   return <div className="p-4">Loading your brain... 🧠</div>;
  // }




function handleDelete(id: string) {
  // Update state to remove the deleted card without refetching everything
  setContents(prev => prev.filter(content => content._id !== id));
}






  return (

   <div className={`  ${ 
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

          <input
            type="text"
            placeholder={`Let AI find it for you...`}
            className="flex-1 bg-green-100 m-4 ml-60 rounded-lg  border-2 border-purple-200 p-2 outline-none bg-transparent text-gray-800 placeholder:text-gray-400"
          />

          <Button  onClick={ ()=>{setIsOpen(true)} }  variant='primary'  text="Add content"  startIcon={<AddIcons/>}></Button>
          <Button  variant='secondary'  text="Share brain" startIcon={<ShareIcons/>} ></Button>

        </div>




  {/* -------------------------- all the cards are there ------------------ */}
        <div className=" columns-1 mt-10 sm:columns-2 md:columns-3 xl:columns-4 space-y-4">
          
          { loading? (<p className="bg-black p-2 text-red-50">loading...</p>):
            contents.map(({ _id, type, link, title }) => {
              //const { type, link, title } = item;  // it is same as passing in the props like
              return <div key={link} className="break-inside-avoid mb-4 md:ml-8 scroll-mt-20" > <Card
                id={_id}
                type={type}
                key={link}
                link={link}
                title={title}
                isTwitterScriptLoaded={isTwitterScriptLoaded}
                setTwitterScriptLoaded={setTwitterScriptLoaded}
                onDelete={handleDelete}
                 />
                 </div>
            })
          }
        </div>

   




    </div>






   </div>
  )
}

