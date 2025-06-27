import { DeleteIcons } from "../icons/deleteIcons";
import { DocsIcon } from "../icons/docsIcons";
import { InstaIcon } from "../icons/instaIcons";
import { ShareIcons } from "../icons/ShareIcon";
import { TwitterIcon } from "../icons/twitterIcon";
import { YtIcons } from "../icons/ytIcons";


interface Cardprops{
    title:string;
    link:string;
    type:"twitter" | "youtube" | "docs" | "instagram" 
}






//------*** logic for converting the watch yt video in embeded formate to show that...---------
function convertLink(link:string) {
  const userLink = link;
  
  const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&?/]+)/;

  const match = userLink.match(regex);

  if (match && match[1]) {
    const videoId = match[1];
    return `https://www.youtube.com/embed/${videoId}`;
  } else {
    alert('Invalid YouTube link!');
    return;
  }
}


const TypeIcons=(type:string)=>{
    switch (type) {
        case "youtube":
            return <YtIcons/>
            break;

        case "instagram":
            return <InstaIcon/>
            break;

        case "docs":
            return <DocsIcon/>
            break;

        case "twitter":
            return <TwitterIcon/>
            break;
        
        
        default:
            return null;
            break;
    }
}







export function Card({title, link, type}:Cardprops) {

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


            {/* embedding video, tweets, docs, links */}
           <div className=" m-1 mt-6">


            {/* youtube card */}
              {type==='youtube' &&  <div className="aspect-video ">
                <iframe className="shadow-none rounded-md w-full h-full"
                  src={convertLink(link)}
                  title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
               </div>}



            {/* twitter card */}
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