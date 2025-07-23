import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar";
import { useState } from "react";





export default function DashboardLayout() {


    const [ isSidebarOpen, setIsSidebarOpen ]=useState(true)   //so that both (sidebar + dashboard) can access usestate var from here simple.




  return (
    <div className="flex h-screen">
  <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
  
  {/* Main content area */}
  <div className="flex-1 overflow-y-auto p-4">
    <Outlet context={isSidebarOpen} />
  </div>
</div>

  );
}
