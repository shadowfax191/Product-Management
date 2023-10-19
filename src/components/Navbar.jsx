import { useContext} from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./AuthProvider/AuthProdiver";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)
    console.log(user?.photoURL);
    const handleLogOut = () => {
        logOut()
            .then(res => {
                console.log(res);
                {
                    if (user.uid) { toast.success('Logout Successfully') }

                }
            })


    }


    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/addProduct'>Add Product</NavLink></li>
        <li><NavLink to='/myCart'>My Cart</NavLink></li>

    </>

    return (
        <div>
            <div className="navbar bg-primary text-primary-content p-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="  text-black menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links

                            }
                            {
                                user ? <div className="justify-center items-center p-5"><li> <img className="w-20 rounded-full mx-auto" src={user.photoURL} alt="" /></li>
                                    <li> <p className="text-lg font-bold capitalize text-center text-primary">{user.displayName}</p></li>
                                    </div> 
                                    : ''
                            }
                        </ul>
                    </div>
                    <img className="w-24 rounded-full" src="https://i.ibb.co/fNtnpGX/1918.png" alt="" />
                    <p className="text-3xl hidden md:flex font-semibold pl-4">Happy Hour Delights</p>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-lg">
                        {links}
                    </ul>
                </div>
                {
                    user ?
                        <div className="navbar-end">
                            <div className="pr-5 space-x-4 items-center hidden md:flex">
                                <img className="w-14 h-14 rounded-full" src={user.photoURL} alt="" />
                                <p className="text-xl capitalize">{user.displayName}</p>

                            </div>
                            <button onClick={handleLogOut} className="btn">Log out</button>
                        </div>
                        :
                        <div className="navbar-end">
                            <NavLink to='/login' className="btn">Log in</NavLink>
                        </div>
                }
            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default Navbar;