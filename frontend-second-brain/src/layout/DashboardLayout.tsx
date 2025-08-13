import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";





export default function DashboardLayout() {



 

    const [ isSidebarOpen, setIsSidebarOpen ]=useState(true)   //so that both (sidebar + dashboard) can access usestate var from here simple.
    const [filter, setFilter] = useState("");

    //console.log("Current filter:", filter);   // for testing purpose.




  return (
    <div className="flex h-screen">
  <Sidebar setFilter={setFilter} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
  
  {/* Main content area */}
  <div className="flex-1 overflow-y-auto p-4">
    <Outlet context={{isSidebarOpen, filter}}  />
  </div>

  {/* Toast notification container */}
  <Toaster position="top-right" reverseOrder={false} />



</div>

  );
}
