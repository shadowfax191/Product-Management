import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";


const NewRoot = () => {
    window.scrollTo(0, 0)



   
   
    return (
        <div >
            <Navbar></Navbar>

            <Outlet></Outlet>
           
        </div>
    );
};

export default NewRoot;