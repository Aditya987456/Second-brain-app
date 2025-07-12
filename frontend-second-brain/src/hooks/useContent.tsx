import { useEffect, useState } from "react"
import { BACKEND_URL } from "../pages/config"
import axios from "axios"





export const useContent=(filterType="")=>{
    const [ contents, setContents] = useState([])
    const [ loading, setLoading ] = useState(false)

    //-----  fetch the all contents. -----
    async function fetchcontents() {
        setLoading(true)
                    console.log("Token being used:", localStorage.getItem("token"));


        try {
            const response=await axios.get(`${BACKEND_URL}/api/v1/content`, {
                headers: {
                    authorization:localStorage.getItem("token")
                },
            })

            const allContents=response.data.contents
            const filteredcontents=filterType? allContents.filter(items =>items.type=== filterType) : allContents
            setContents(filteredcontents)
             
        } catch (error) {
              console.error("Error fetching content-usecontent saar:", error);
        } finally {
            setLoading(false);
            }
    }



    useEffect( ()=>{
        fetchcontents();
    }, [filterType] )   //agar kuch filter nahi hai fir bhi refresh hoga becz filter is "" is passing




    


    return {contents, loading, setContents, fetchcontents, setLoading }

}