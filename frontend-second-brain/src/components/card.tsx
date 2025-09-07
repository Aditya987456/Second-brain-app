import { useEffect, useMemo } from "react";
import { DeleteIcons } from "../icons/deleteIcons";
import { DocsIcon } from "../icons/docsIcons";
import { InstaIcon } from "../icons/instaIcons";
import { ShareIcons } from "../icons/ShareIcon";
import { TwitterIcon } from "../icons/twitterIcon";
import { YtIcons } from "../icons/ytIcons";
import { useRef } from "react";
import { CircleEllipsis, Github, Link, Link2 } from "lucide-react";
import { BACKEND_URL } from "../pages/config";
import axios from "axios";
import toast from 'react-hot-toast';
// import { TwitterCard } from "./TwitterCard";
import { useState } from "react";
import GitHubCard from "./githubCard";
import { SharebrainModal } from "./SharebrainModal";

interface Cardprops{
    id: string;
    title:string;
    link:string;
    type:"Twitter" | "Youtube" | "Docs" | "Github" | "Link" | "Others" 
    //setTwitterScriptLoaded?: (value: boolean) => void;
    isTwitterScriptLoaded?: boolean;
    setTwitterScriptLoaded?: React.Dispatch<React.SetStateAction<boolean>>;   //$$$"This is a function that sets a boolean state."
    onDelete: (id: string) => void;
    status: "ready" | "pending" | "retrying" | "failed"
    retrycounting:Number
    setShareModal?: React.Dispatch<React.SetStateAction<boolean>>
    setSharelink?:React.Dispatch<React.SetStateAction<string>>
  }




//--------------for converting the yt links in embeded formate-----------------
function convertLink(link: string) {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^?&\s]+)/;
  const matchResult = link.match(regex);   //here matchresult gives obj with full yt link and video id that regex extracted

  if (matchResult && matchResult[1]) {                   //here we checking if the matchResult have something then only checks the matchResult[1] for videoID , if we directly checks the videoID and if the link is not youtube then gave error

    return `https://www.youtube.com/embed/${matchResult[1]}`;
  }
   else {
    return "";
  }
}



//---------- for selecting the icons ---------
const TypeIcons=(type:string)=>{
    switch (type) {
        case "Youtube":
            return <YtIcons/>
            

        case "Github":
            return <Github className="dark:text-white"/>
            

        case "Docs":
            return <DocsIcon/>
            

        case "Twitter":
            return <TwitterIcon/>

        case "Link":
            return <Link2 className="dark:text-slate-300"/>

        case "Others":
            return <CircleEllipsis/>
            
        
        default:
            return null;
            
    }
}






//#-------------------------------**** cards that accept all this things ****-----------------------------------
export function Card({id,title, link, type, isTwitterScriptLoaded, setTwitterScriptLoaded, onDelete, status, setShareModal,setSharelink}:Cardprops) {


  //----  status color dots logic here.
 const statusColors: Record<string, string> = {
  ready: "",
  pending: "bg-yellow-500",
  retrying: "bg-blue-500",
  failed: "bg-red-500",
};

const statusTooltips: Record<string, string> = {
  ready: "Content fetched successfully. Search results will be accurate.",
  pending: "Content is still being processed. AI searches might not find this content yet.Refresh after sometime",
  retrying: "Fetching again. Processing is still active.",
  failed: "Failed to fetch or process content. Search results may be inaccurate. Try editing or retrying.",
};




  // ------------------------ Twitter embed ------------------------
  //.................. for the twitter card  ..........................
  useEffect(() => {
  if (type !== "Twitter") return;

  if (!isTwitterScriptLoaded) {
    const script = document.createElement("script");
    script.setAttribute("src", "https://platform.twitter.com/widgets.js");
    script.setAttribute("async", "true");
    script.setAttribute("charset", "utf-8");
    document.body.appendChild(script);

    setTwitterScriptLoaded?.(true);
    
  } else {
    // if already loaded script then do rerender.
    (window as any).twttr?.widgets?.load();
  }
}, [type]);









//.................. for the youtube card  ..........................
   

    //useMemo hook to embed the yt vid link + check type also.
        // const embededLink = useMemo(() => {
        //     if (type !== "youtube") return "";
        //     return convertLink(link);
        // }, [link, type]);

        // useEffect is best here for validation because we only want to validate on changing the link, type.
        // useEffect(() => {
        //     if (type === "youtube" && !embededLink) {
        //     alert("Invalid YouTube link---> from card saar");        
        //     }
        // }, [embededLink, type]);  //here agar link change nahi hua and we update the type therefore useeffectwill also run so we added dependency array as type as well as embededlink.





//------------------------****  Deleting the card   ****-------------------------
 async function DeletingCard() {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        data : { contentId: id },
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });

      toast.success("Card deleted!");
      onDelete(id); // update frontend dashboard
    } catch (error) {
      console.error("Error deleting card:", error);
      toast.error("Error deleting content");
    }
  }





//--------------revise some part of this ------------++++++++++  yt card
const hasAlertedRef = useRef(false); // ✳️ Track alert state

const embededLink = useMemo(() => {
  if (type !== "Youtube") return "";
  return convertLink(link);
}, [link, type]);

useEffect(() => {
  if (
    type !== "Youtube" ||
    !link ||
    hasAlertedRef.current || // ✳️ Prevent repeat alerts
    embededLink === "" // ✳️ embededLink not ready yet
  ) return;

  const isLikelyYoutube = /youtube\.com|youtu\.be/.test(link);
  const isEmbedValid = embededLink.includes("youtube.com/embed");

  if (isLikelyYoutube && !isEmbedValid) {
    hasAlertedRef.current = true;
    alert("Invalid YouTube link—please check your URL.");
  }
}, [type, link, embededLink]);





//.................. for the twitter card  ..........................
//   useEffect(() => {
//   if (type !== "Twitter") return;

//   if (!isTwitterScriptLoaded) {
//     const script = document.createElement("script");
//     script.setAttribute("src", "https://platform.twitter.com/widgets.js");
//     script.setAttribute("async", "true");
//     script.setAttribute("charset", "utf-8");
//     document.body.appendChild(script);

//     setTwitterScriptLoaded?.(true);
    
//   } else {
//     // if already loaded script then do rerender.
//     (window as any).twttr?.widgets?.load();
//   }
// }, [type]);



















//////////////////////----------------------testing something.
const testingsomething=()=>{
  alert('clicked saaaaar')
}








    return <div>



        <div className="dark:bg-[#282727] dark:border-zinc-950 dark:hover:border-zinc-500 
         md:min-h-48 mt-4 md:p-2 p-1
         md:min-w-80 max-w-80 shadow-lg hover:shadow-2xl rounded-lg 
          border-slate-200 border
         transition-all duration-300 ease-linear
          
          ">

        {/* ------------------------- header of the card  ------------------------------- */}
            <div className=" flex justify-between text-gray-500">  

                <div className="flex items-center justify-between text-md">
                    <div  className=" text-gray-500 pr-4">
                        {TypeIcons(type)}
                         </div>




                         




                         {/* title of the card */}                       
                        <span className="text-black dark:text-white">{title}</span>
                </div>

                    {/* share icon on top of the card */}
                <div className="flex items-center">



                {/* Status Dot */}
                        <span
                          className={`relative  h-3 mr-1 w-3 rounded-full ${statusColors[status]}`}
                          title={statusTooltips[status]} // shows tooltip on hover
                        ></span>




                    <div onClick={()=>{ setShareModal?.(true)
                                      setSharelink?.(link) }

                     } className="mr-3">
                        <ShareIcons/>
                    </div>


                  {/* delete icon on top of the card */}
                    <div onClick={DeletingCard} >
                        <DeleteIcons/>
                    </div>


                    




                </div>

            </div>


    {/*----------------------------------- DASHBOARD -->  embedding video, tweets, docs, links  -------------------------------- */}
           <div className=" m-1 mt-2">



            {/*************************  youtube card  *****************************/}
              {type==='Youtube' && embededLink && <div className="aspect-video ">
                <iframe className="shadow-none rounded-md w-full h-full"
                  src={embededLink}
                  title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
               </div>}
               

{/*    GPT explanation --
+---------------------+
|  Your React Page    |
|---------------------|
| - You add a <Tweet> |
|   component         |
+---------+-----------+
          |
          v
+----------------------------+
|  TwitterCard component     |
|----------------------------|
| - Replaces x.com with      |
|   twitter.com              |
| - Checks: is twttr loaded? |
| - If not, create <script>  |
|   with widgets.js URL      |
+----------------------------+
          |
          v
+----------------------------+
|   Browser loads script     |
|   from Twitter             |
|----------------------------|
|  https://platform.twitter.com/widgets.js |
+----------------------------+
          |
          v
+----------------------------+
|  Twitter script runs       |
|----------------------------|
| - Finds <blockquote> tag   |
| - Converts to embedded     |
|   tweet with iframe        |
+----------------------------+
 */}








            {/************************  twitter card  *******************************/}
            
    {type==='Twitter' && 
                 <div>
                    {/* <div id="tweet-container" class="h-40 bg-gray-200 animate-pulse mb-4">
                    </div> */}
                    <blockquote className="twitter-tweet"> <a href={link.replace('x.com', 'twitter.com')} ></a> </blockquote>
                  </div> 
                }



                



            {/* ****************************     github card    ************************************ */}
                {type === "Github" && link && <GitHubCard repoUrl={link} />}









            {/* ********   docs link, links, others  --> preview using microlink.io API    **************/}
              {(type === 'Docs' || type === 'Link' || type === 'Others') && link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md border transition overflow-hidden"
                >
                  <img
                    src={`https://api.microlink.io?url=${encodeURIComponent(link)}&screenshot=true&embed=screenshot.url`}
                    alt="Link preview"
                    className="w-full h-40 object-cover"
                  />
                </a>
              )}






           </div>


           
           
            
        </div>



















    </div>
    
}