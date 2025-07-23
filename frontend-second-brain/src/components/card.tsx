import { useEffect, useMemo } from "react";
import { DeleteIcons } from "../icons/deleteIcons";
import { DocsIcon } from "../icons/docsIcons";
import { InstaIcon } from "../icons/instaIcons";
import { ShareIcons } from "../icons/ShareIcon";
import { TwitterIcon } from "../icons/twitterIcon";
import { YtIcons } from "../icons/ytIcons";
import { useRef } from "react";

interface Cardprops{
    title:string;
    link:string;
    type:"twitter" | "youtube" | "docs" | "instagram" 
    //setTwitterScriptLoaded?: (value: boolean) => void;
    isTwitterScriptLoaded?: boolean;
    setTwitterScriptLoaded?: React.Dispatch<React.SetStateAction<boolean>>;   //$$$"This is a function that sets a boolean state."
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
        case "youtube":
            return <YtIcons/>
            

        case "instagram":
            return <InstaIcon/>
            

        case "docs":
            return <DocsIcon/>
            

        case "twitter":
            return <TwitterIcon/>
            
        
        
        default:
            return null;
            
    }
}






//#-------------------------------**** cards that accept all this three things ****-----------------------------------
export function Card({title, link, type, isTwitterScriptLoaded, setTwitterScriptLoaded}:Cardprops) {



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





const hasAlertedRef = useRef(false); // ✳️ Track alert state

const embededLink = useMemo(() => {
  if (type !== "youtube") return "";
  return convertLink(link);
}, [link, type]);

useEffect(() => {
  if (
    type !== "youtube" ||
    !link ||
    hasAlertedRef.current || // ✳️ Prevent repeat alerts
    embededLink === "" // ✳️ embededLink not ready yet
  ) return;

  const isLikelyYoutube = /youtube\.com|youtu\.be/.test(link);
  const isEmbedValid = embededLink.includes("youtube.com/embed");

  if (isLikelyYoutube && !isEmbedValid) {
    hasAlertedRef.current = true;
    alert("⚠️ Invalid YouTube link—please check your URL.");
  }
}, [type, link, embededLink]);





//.................. for the twitter card  ..........................
  useEffect(() => {
  if (type !== "twitter") return;

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







    //.................. for the github card  ..........................









    //.................. for the youtube card  ..........................











    //.................. for the youtube card  ..........................








    //.................. for the youtube card  ..........................

















    return <div>



        <div className="min-h-48 mt-4 p-2 min-w-80 max-w-80 shadow-lg rounded-lg border-slate-200 border">

           {/* --------------- header of the card  ------------------ */}
            <div className=" flex justify-between text-gray-500">  

                <div className="flex items-center justify-between text-md">
                    <div className=" text-gray-500 pr-4">
                        {TypeIcons(type)}
                         </div>
                        <span className="text-black">{title}</span>
                </div>


                <div className="flex items-center">
                    <div className="mr-3">
                        <ShareIcons/>
                    </div>
                    <div>
                        <DeleteIcons/>
                    </div>
                </div>

            </div>


    {/*----------------------------------- DASHBOARD -->  embedding video, tweets, docs, links  -------------------------------- */}
           <div className=" m-1 mt-6">



            {/*************************  youtube card  *****************************/}
              {type==='youtube' && embededLink && <div className="aspect-video ">
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
            {type==='twitter' && 
                 <div>
                    {/* <div id="tweet-container" class="h-40 bg-gray-200 animate-pulse mb-4">
                    </div> */}
                    <blockquote className="twitter-tweet"> <a href={link.replace('x.com', 'twitter.com')} ></a> </blockquote>
                  </div> 
                }
           </div>


           
           
            
        </div>



















    </div>
    
}