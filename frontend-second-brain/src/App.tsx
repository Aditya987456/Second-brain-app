
import DashboardLayout from "./layout/DashboardLayout"
import NavbarLayout from "./layout/NavbarLayout"
import { Dashboard } from "./pages/dashboard"
import LandingPage from "./pages/landingPage"
import { Signin } from "./pages/signin"
import { Signup } from "./pages/signup"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./context/themeContext"
import { SupportPage } from "./pages/supportme"
import { About } from "./pages/about"
import { Contact } from "./pages/contact"

import { Toaster } from 'react-hot-toast';
  
function App() {
  
  return (
 
//  here theme is provided so it works on both pages landing+dashboard
<ThemeProvider>     
    <BrowserRouter>
    <Toaster position="top-center" reverseOrder={false} />
  <Routes>

    {/* Layout with Navbar */}
    <Route element={<NavbarLayout />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/support" element={<SupportPage/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
    </Route>

    {/* Dashboard layout without Navbar */}
   <Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<Dashboard />} />
</Route>


  </Routes>
</BrowserRouter>


</ThemeProvider>  

    )
}

export default App



