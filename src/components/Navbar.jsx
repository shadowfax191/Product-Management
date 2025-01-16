import { useContext} from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./AuthProvider/AuthProdiver";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)
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
        <li><NavLink to='/invoice'>Make Invoice</NavLink></li>
        <li><NavLink to='/products'>All Product</NavLink></li>
        <li><NavLink to='/clients'>All Clients</NavLink></li>
        <li><NavLink to='/invoicehistory'>Invoice History</NavLink></li>
        <li><NavLink to='/overview'>Sales Overview</NavLink></li>
       

    </>

    return (
        <div>
        <div className="navbar bg-slate-300 text-primary-content p-4">
          {/* Drawer/Sidebar Section */}
          <div className="navbar-start">
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                {/* Page content */}
                <label
                  htmlFor="my-drawer"
                  className="btn btn-ghost btn-circle text-black"
                >
                  {/* 3-Bar Menu Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </label>
              </div>
  
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 z-50">
                  {/* Sidebar Links */}
                  {links}
                </ul>
              </div>
            </div>
          </div>
  
          {/* Logo in the Center */}
          <div className="navbar-center">
            <NavLink to="/">
              <img
                className="w-24"
                src="https://i.ibb.co/Ry5s6x5/7e82bec4-66a6-4bdf-b1b2-6612f913aa0d-removebg-preview.png"
                alt="logo"
              />
            </NavLink>
          </div>
  
          {/* User Authentication Section */}
          {user ? (
            <div className="navbar-end">
              <div className="pr-5 space-x-4 items-center hidden md:flex">
                <img
                  className="w-14 h-14 rounded-full"
                  src={user.photoURL}
                  alt={user.displayName}
                />
                <p className="text-xl capitalize">{user.displayName}</p>
              </div>
              <button onClick={handleLogOut} className="btn">
                Log out
              </button>
            </div>
          ) : (
            <div className="navbar-end">
              <NavLink to="/login" className="btn">
                Log in
              </NavLink>
            </div>
          )}
        </div>
      </div>
    );
  };
  
export default Navbar;