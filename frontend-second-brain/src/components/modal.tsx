import { useRef, useState } from "react";
import { X, Twitter, Youtube, FileText, Link2,CircleEllipsis, Github } from "lucide-react";
import { Inputcomponent } from "./inputbox";
import axios from "axios";
import { BACKEND_URL } from "../pages/config";
import { TwitterIcon } from "../icons/twitterIcon";
import toast from "react-hot-toast";




//  here isOpen is saying is the modal is open like popup or not?
// onclose for setIsOpen false and close the modal.

export default function AddContentModal( {isOpen ,onClose, fetchcontents,setAllContents  }:any) {
 
 
  const [ nextmodal, setNextmodal ]=useState<"select"|"enterdetails">("select")
  
  const [type, setType]=useState<string|null>(null)
  const titleRef=useRef<HTMLInputElement>(null)
  const linkRef=useRef<HTMLInputElement>(null)

  const [ loading, setLoading ]=useState(false)



//----------------adding content--------------
  const HandleSubmitform=async (e:React.FormEvent)=>{
      e.preventDefault();  //prevent deafault form submission 

    setLoading(true);
    const loadingToast = toast.loading("Adding your content...");


      //********  send backend request to add the content   ******* */
      try {
        const res= await axios.post(`${BACKEND_URL}/api/v1/content`, {
          title:titleRef.current?.value,
          link:linkRef.current?.value,
          type:type,
        },
        {
            headers: {
              authorization:localStorage.getItem("token")
          }}
      )

      if (!res) throw new Error("Failed to add content");

      

        const newContent=res.data.content
        //await fetchcontents()   //why await because ..
        setAllContents((prev: any) => [newContent, ...prev]);
        onClose()    //modal close on form submit...  only automatically close on successfully submit.
        toast.success("Content added successfully! 🎉", {
                id: loadingToast,
              });
        
      } catch (error) {
       toast.error(String(error) || "Something went wrong", {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
     // onClose()    //here also we can add like irrespective of error or sucess in adding content just close modal.
    }
  }
  



  if (!isOpen) return null;






  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">



{/* ---------------------------------  modal div   ------------------------------  */}
      <div className="dark:border dark:border-zinc-600 bg-white dark:bg-[#323232] text-black w-full max-w-sm mx-4 sm:mx-0 rounded-lg px-10 py-12 relative transition-all">
        
{/* bg-white text-black px-4 py-8 rounded-lg   space-y-6 relative */}
      {/* header of the add content modal. */}
        <button
          className="absolute top-3 dark:hover:text-white dark:text-gray-400 right-3 text-gray-400 hover:text-gray-800"
          onClick={onClose}
        >
          <X />
        </button>
        <h2 className="pb-10 text-3xl font-semibold text-center dark:text-white">Add Content</h2>




      
      
    {/* first step of modal-> it has all 4-6 cards inside for the type of the content. */}
       { nextmodal==="select" &&  (<div><div  className="grid grid-cols-2 gap-6">

          <button onClick={()=>{setNextmodal("enterdetails"), setType("Twitter")}} className="flex flex-col items-center px-12 py-6 dark:bg-[#282728] dark:hover:bg-[#141414] dark:border-none hover:bg-gray-100 bg-white  rounded border">
            <Twitter className="w-8 h-8 text-sky-400" />
            <span className="mt-2 text-md dark:text-white ">Tweet</span>
          </button>

          <button onClick={()=>{setNextmodal("enterdetails"), setType("Youtube")}}  className="dark:bg-[#282728] dark:hover:bg-[#141414] dark:border-none flex flex-col items-center px-12 py-6 hover:bg-gray-100 bg-white rounded border">
            <Youtube className="w-8 h-8 text-red-500" />
            <span className="mt-2 text-md dark:text-secondary">Video</span>
          </button>

          <button onClick={()=>{setNextmodal("enterdetails"), setType("Docs")}} className="dark:bg-[#282728] dark:hover:bg-[#141414] dark:border-none flex flex-col items-center px-12 py-6  hover:bg-gray-100 bg-white rounded border">
            <FileText className="w-8 h-8 text-yellow-400" />
            <span className="mt-2 text-md dark:text-white">Document</span>
          </button>

          <button  onClick={()=>{setNextmodal("enterdetails"), setType("Link")}} className="dark:bg-[#282728] dark:hover:bg-[#141414] dark:border-none flex flex-col items-center px-12 py-6  hover:bg-gray-100 bg-white rounded border">
            <Link2 className="w-8 h-8 text-slate-600 dark:text-slate-400" />
            <span className="mt-2 text-md dark:text-white">Link</span>
          </button>

          <button  onClick={()=>{setNextmodal("enterdetails"), setType("Github")}} className="dark:bg-[#282728] dark:hover:bg-[#141414] dark:border-none flex flex-col items-center px-12 py-6 hover:bg-gray-100 bg-white rounded border">
            <Github className="w-8 h-8 text-black dark:text-white" />
            <span className="mt-2 text-md dark:text-white">Github</span>
          </button>


          <button  onClick={()=>{setNextmodal("enterdetails"), setType("Others")}} className="dark:bg-[#282728] dark:hover:bg-[#141414] dark:border-none flex flex-col items-center px-12 py-6 hover:bg-gray-100 bg-white rounded border">
            <CircleEllipsis className="w-8 h-8 text-blue-400" />
            <span className="mt-2 text-md dark:text-white">Others</span>
          </button>

        </div>

                  { /* cancel button below is there. */}
        <button
          className="mt-8 text-white  min-w-full py-2 bg-purple-600 rounded hover:bg-purple-800 font-semibold text-md"
          onClick={onClose } 
          >
          Cancel
        </button>

        </div>
      
      
      ) }





    {/*second step of modal -> it has inputbox for the title and link with back and submit button. */}
        {nextmodal === "enterdetails"  &&  ( 
          <form  className=" dark:bg-[#323232] dark:text-white space-y-6 bg-white text-black mx-4 py-2 rounded-lg relative h-full flex flex-col justify-between" onSubmit={HandleSubmitform}>
          <p className="text-center text-md dark:text-secondary  text-gray-600">
            Add details for <span className="font-bold dark:text-white">{type}</span> </p>

          <div>Title
          <Inputcomponent
          placeholder="title"
          reference={titleRef}
          /></div>

          <div>Link
          <Inputcomponent
          placeholder="link"
          reference={linkRef}
          /></div>


        <div className="flex justify-center items-center">
            <button
              type="submit"
              className="mt-8 m-2 text-white w-full py-2 bg-green-700 dark:hover:bg-green-600 rounded hover:bg-green-950 font-semibold text-md"
               >
              Add content
            </button>


            <button
              className="mt-8 m-2 font-semibold text-white w-full py-2 bg-slate-600 dark:hover:bg-slate-500 rounded hover:bg-slate-800 text-md"
              onClick={() => setNextmodal("select") } 
              >
              Go back
            </button>
        </div>
        </form> )}







      </div>

    </div>
  );
}
