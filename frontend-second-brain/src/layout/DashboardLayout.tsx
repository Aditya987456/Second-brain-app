// import { Outlet } from "react-router-dom";
// import { Sidebar } from "../components/sidebar";
// import { useState, useEffect } from "react";
// import { Toaster } from "react-hot-toast";


// /*
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// to many props are passing so we should use recoil like things -->  i vill add this in v2 of second brain

// */




// export default function DashboardLayout() {



 
//     const [ query, setQuery ]=useState("")
//     const [ isSidebarOpen, setIsSidebarOpen ]=useState(true)   //so that both (sidebar + dashboard) can access usestate var from here simple.
//     const [filter, setFilter] = useState("");
//     const [showResults, setShowResults] = useState(false);   //to show search result on the dashboard and hide content
   
//     //console.log("Current filter:", filter);   // for testing purpose.





// //--------------- Load the Twitter script only once and only create the tweet once per card.-------
// //  const [isTwitterScriptLoaded, setIsTwitterScriptLoaded] = useState(false);
// //  useEffect(() => {
// //   if (!document.querySelector('script[src*="twitter.com/widgets.js"]')) {
// //     const script = document.createElement("script");
// //     script.src = "https://platform.twitter.com/widgets.js";
// //     script.async = true;
// //     script.onload = () => console.log("Twitter widgets.js loaded");
// //     document.body.appendChild(script);
// //   } else {
// //     (window as any).twttr?.widgets?.load();
// //   }
// // }, []);








//   return (
//     <div className="flex h-screen">
    
//   <Sidebar setQuery={setQuery} query={query} filter={filter}  showResults={showResults} setShowResults={setShowResults} setFilter={setFilter} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
  
//   {/* Main content area */}
//   <div className="flex-1 overflow-y-auto p-4">
//     <Outlet context={{isSidebarOpen, setQuery, query,  filter, showResults,setShowResults }}  />
//   </div>

//   {/* Toast notification container */}
//   <Toaster position="top-center" reverseOrder={false} />



// </div>

//   );
// }



















//----------------------- new using react context  --> no more props drilling  ----------------
// layouts/DashboardLayout.tsx
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar";



import { DashboardProvider } from "../pages/DashboardContext";   //it imports all the props
export default function DashboardLayout() {
  return (
    <DashboardProvider>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
        {/* <Toaster position="top-center" reverseOrder={false} /> */}
      </div>
    </DashboardProvider>
  );
}

