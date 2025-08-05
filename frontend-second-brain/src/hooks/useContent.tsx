import { useEffect, useState } from "react"
import { BACKEND_URL } from "../pages/config"
import axios from "axios"




//creating this custom hook----------------------------
export const useContent=(filterType = "")=>{
      const [allContents, setAllContents] = useState<ContentType[]>([]);   //it have all the content fetched from server
      const [contents, setContents] = useState<ContentType[]>([]);     //it has only filtered content like "", "Youtube", "Twitter"  etc.
      const [loading, setLoading] = useState(false);
     

    //---------------------   fetch the all contents.   ----------------
    async function fetchcontents() {
        setLoading(true)
        //console.log("Token being used:", localStorage.getItem("token"));   //for testing ,


        try {
            const response=await axios.get(`${BACKEND_URL}/api/v1/content`, {
                headers: {
                    authorization:localStorage.getItem("token")
                },
            })

            const AllFetchedContents=response.data.contents
            setAllContents(AllFetchedContents)
             
        } catch (error) {
              console.error("Error fetching content--->usecontent saar:", error);
        } finally {
            setLoading(false);
            }
    }


//runs when page loads.
    useEffect( ()=>{
        fetchcontents();
    }, [] )  
    
    

//**** filtering contents,,,,

  useEffect(() => {
    const filtered = filterType
      ? allContents.filter((item) => item.type === filterType)
      : allContents;

    setContents(filtered);
  }, [filterType, allContents]);





    


    return {contents, loading, setContents, fetchcontents, setLoading }

}














//$$$ Improvements -->  use re-filtering instead of refetching...