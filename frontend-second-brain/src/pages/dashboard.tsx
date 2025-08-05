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
  filter: string;
};




export function Dashboard() {



const [isTwitterScriptLoaded, setTwitterScriptLoaded] = useState(false);

const { isSidebarOpen, filter } = useOutletContext<OutletContextType>();

const [isOpen, setIsOpen] = useState(false); // Set to false initially in real project
const { contents, loading, fetchcontents, setContents } = useContent(filter);

  //const [ modalcard, setModalcard ]=useState(false);

  // if (loading) {
  //   return <div className="p-4">Loading your brain... 🧠</div>;
  // }




function handleDelete(id: string) {
  // Update state to remove the deleted card without refetching everything
  setContents(prev => prev.filter(content => content._id !== id));
}




const username = localStorage.getItem("username") || "guest";
const isDemo = localStorage.getItem("isDemo") === "true"; // it's stored as a string






  return (

   <div className={`  ${ 
          isSidebarOpen ? "ml-72" : "ml-16"} `} >

    

    <div className={`p-4 min-h-screen transition-all duration-300 ease-in-out `}>


        { isOpen && <AddContentModal 
          isOpen={isOpen}
          fetchcontents={fetchcontents}
          onClose={ ()=>{ setIsOpen(false) }}
           /> }



        {/* -------------------------   Demo section   ------------------------- */}
        {isDemo && (
          <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-4 text-sm">
            You're using a <strong>temporary demo account</strong>. All data will be deleted after 2 hours.
            <br />
            <a href="/signup" className="text-blue-600 underline font-semibold">Sign up</a> to keep your content!
          </div>
        )}





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
        <div className=" columns-1 mt-10 sm:columns-2 md:columns-3 xl:columns-4 space-y-6">
          
          { loading? (<p className="bg-black p-2 text-red-50">loading...</p>):
            contents.map(({ _id, type, link, title }) => {
              //const { type, link, title } = item;  // it is same as passing in the props like
              return <div  key={_id} className="break-inside-avoid mb-4 md:ml-8 scroll-mt-20" > <Card
                id={_id}  
                type={type}
               
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










/*

Question arises when there is solution in gpt that says separately use github url in the contents.map () because

Why You Might Be Rendering GitHubCard Separately
You likely created GitHubCard as a standalone component to fetch GitHub metadata and display a rich preview. But if your <Card /> component already handles rendering logic based on type, then the better approach is:

## then the better approach is:

✅ Move the GitHub-specific logic inside the Card component, just like you do for Twitter or YouTube.
 */