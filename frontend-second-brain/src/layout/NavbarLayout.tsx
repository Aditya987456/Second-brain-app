
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";


export default function NavbarLayout() {
  return (
    <>
      <Navbar /> 
      <main > 
        <Outlet />  
      </main>
    </>
  );
}
