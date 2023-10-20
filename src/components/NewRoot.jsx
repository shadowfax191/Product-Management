import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";
import DarkModeToggle from "react-dark-mode-toggle";
const NewRoot = () => {
    window.scrollTo(0, 0)

    const [theme, setTheme] = useState('light')

    const handleChange = () => {

        if (theme === 'light') {
            return setTheme('dark')
        }
        else {
            return setTheme('light')
        }
    }
    const [dark,setDark]=useState(false)
    console.log(theme);
    return (
        <div data-theme={`${theme}`}>
            <Navbar></Navbar>


            <div className=" flex justify-end">
                <label className="cursor-pointer label space-x-4 px-5 lg:px-20">


                    <p onClick={handleChange}>
                        <DarkModeToggle
                          onChange={setDark}
                          checked={dark}
                        ></DarkModeToggle>
                    </p>
                </label>

            </div>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default NewRoot;