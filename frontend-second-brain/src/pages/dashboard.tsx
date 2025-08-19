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
import axios from "axios"

type OutletContextType = {
  isSidebarOpen: boolean;
  filter: string;
};




export function Dashboard() {



const [isTwitterScriptLoaded, setTwitterScriptLoaded] = useState(false);
const { isSidebarOpen, filter } = useOutletContext<OutletContextType>();

const [isOpen, setIsOpen] = useState(false); // Set to false initially in real project -->
const { contents, loading, fetchcontents, setContents } = useContent(filter);

//----- for search ---------
const [query, setQuery] = useState("");
const [results, setResults] = useState<any[]>([]);      // search result response from the LLM
const [showResults, setShowResults] = useState(false);   //to show search result on the dashboard and hide content
const [ aiResult, setAiResult ]=useState("")



// async function HandleSearch() {
//   if(!query.trim()) return;

//   try {
//     const res= await axios.get(`/api/v1/ai-answer`, { params: {q:query}})
//     console.log("AI API response:", res.data);  // 👈 check this
//     setResults(res.data.cards || [])
//     setAiResult(res.data.LLMresponses || "")
//     setShowResults(true)   // ---jab sab kuch response aa gaya hai to show karo...
    
//   } catch (error) {
//      console.error("Search error:", error);
//   }
  
// } 



async function HandleSearch() {
  if (!query.trim()) return;


  try {
     const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:3000/api/v1/ai-answer`,
       { params: { q: query },
       headers: { Authorization: token ? token : "" } },
      );
    
    
    
    
       //console.log("📩 API raw response:", res.data);
    // ✅ safely extract values
    const cards = res.data?.cards || [];
    const aiResponse = res.data?.LLMresponses?.trim() || "No AI answer found 🤔";

    setResults(cards);
    setAiResult(aiResponse);
    setShowResults(true);   // only show when everything is ready

  } catch (error: any) {
    // ✅ show error in UI instead of console.log
    setAiResult("⚠️ Sorry, something went wrong while fetching the AI answer.");
    setResults([]);
    setShowResults(true);
  }
}








  //const [ modalcard, setModalcard ]=useState(false);

  // if (loading) {
  //   return <div className="p-4">Loading your brain... 🧠</div>;
  // }


















function handleDelete(id: string) {
  // Update state to remove the deleted card without refetching everything
  setContents(prev => prev.filter(content => content._id !== id));
}




const username = localStorage.getItem("username") || "guest";    // -- will do something in v2
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





  {/*  **** header of dashboard -> your sec brain , search bar, share, add, theme button. */}
        

        
        <div className="flex gap-4 justify-end items-center">
          {/* <div className="bg-green-400 mr-20"><SearchBar/></div> */}

  {/*--------------- search bar  ---------------- */}
      {/* <input
        type="text"
        placeholder="Let AI find it for you..."
        className="flex-1 bg-green-100 m-4 ml-60 rounded-lg  border-2 border-purple-200 p-2 outline-none bg-transparent text-gray-800 placeholder:text-gray-400"
        value={query}

        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="bg-green-600 " onClick={HandleSearch}>Search</button> */}

    <div className="relative w-full max-w-xl mr-8">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}   // $$$Each keystroke is captured by onChange.
        type="text"
        placeholder="Let AI find it for you..."
        className="w-full pr-20 pl-4 py-2 border border-purple-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
      />
      <button
        onClick={HandleSearch}
        className=" font-semibold absolute right-1 top-1 bottom-1 px-4
          bg-custom-gradient
        text-white rounded-lg  transition"
      >
        AI search
      </button>
    </div>



        
      {/* -----------------   Two buttons add content  and  share brain ----------- */}
          <Button  onClick={ ()=>{setIsOpen(true)} }  variant='primary'  text="Add content"  startIcon={<AddIcons/>}></Button>
          <Button  variant='secondary'  text="Share brain" startIcon={<ShareIcons/>} ></Button>

        </div>


 








  {/* -------------------------- all the cards are there ------------------ */}
    <div className=" transition-all duration-300 ease-linear  mt-10  ">
          



        { showResults ?

// ai-responses---
        <>
          {/* AI's Answer */}
          <div className="p-4 mb-4 bg-purple-50 border border-purple-200 rounded-lg">
            <strong>AI Answer:</strong>
            <p>{aiResult ? aiResult : "No AI answer found 🤔"}</p>
          </div>

          {/* Search Result Cards */}
          {results.map(({ _id, type, link, title }) => (
            <div key={_id} className="break-inside-avoid mb-4 md:ml-8 scroll-mt-20">
              <Card
                id={_id}
                type={type}
                link={link}
                title={title}
                isTwitterScriptLoaded={isTwitterScriptLoaded}
                setTwitterScriptLoaded={setTwitterScriptLoaded}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </>

          :
        
// default dashboard--
           <div className=" transition-all duration-300 ease-linear columns-1 mt-10 sm:columns-2 md:columns-3 xl:columns-4 space-y-6">
        <>
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


        </>       
</div>
      
      }

          {/* { loading? (<p className="bg-black p-2 text-red-50">loading...</p>):
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
          } */}





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