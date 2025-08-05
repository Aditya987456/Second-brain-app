import axios from "axios";

import { BACKEND_URL } from "./config";


export const HandleDemo=async (navigate: (path: string) => void)=>{
    
    try { 

      const res = await axios.post(BACKEND_URL+"/api/v1/demo-login");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("isDemo", res.data.isDemo);

      navigate("/dashboard");
        
    } catch (error) {
        console.error("Failed to start demo session", error);
    }

}