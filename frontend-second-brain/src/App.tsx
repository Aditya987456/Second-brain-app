import AddContentModal from "./components/modal"
import { Navbar } from "./components/Navbar"
import DashboardLayout from "./layout/DashboardLayout"
import NavbarLayout from "./layout/NavbarLayout"
import { Dashboard } from "./pages/dashboard"
import LandingPage from "./pages/landingPage"
import { Signin } from "./pages/signin"
import { Signup } from "./pages/signup"
import { BrowserRouter, Routes, Route } from "react-router-dom"




  
function App() {
  
  return (
    // <BrowserRouter>
    //     <Routes>
    //         <Route path="/d"  element={<Dashboard/>}/>
    //         <Route path="/signup" element={<Signup/>} />
    //         <Route path="/signin" element={<Signin/>} />
    //         <Route path="/" element={<LandingPage/>} />

    //         <Route path="/dashboard" element={<Dashboard/>} />

    //     </Routes>
    // </BrowserRouter>   
    
    <BrowserRouter>
    
  <Routes>

    {/* Layout with Navbar */}
    <Route element={<NavbarLayout />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Route>

    {/* Dashboard layout without Navbar */}
   <Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<Dashboard />} />
</Route>


  </Routes>
</BrowserRouter>

    

    )
}

export default App



