import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const {logOut, loading, user} = useContext(AuthContext)

  const navigationLink = <>
  <li><NavLink to='/'>Home</NavLink></li>
  <li><NavLink to='/all_test'>All Test</NavLink></li>
  <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
  </>

  return (
    <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {navigationLink}
      </ul>
    </div>
    <img className="h-24 w-24" src="/1.png" alt="HealthDx" />
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {navigationLink}
    </ul>
  </div>
  <div className="navbar-end">
    {loading ? <span className="loading loading-spinner loading-xs">loading</span> : user ? <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="HealthDx" src={user?.photoURL} />
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            {user?.displayName}
          </a>
        </li>
        <li><a>Profile</a></li>
        <li onClick={() => logOut()}><a>Logout</a></li>
      </ul>
    </div> : <div className="flex gap-5">
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Signup</Link>
    </div>}
  </div>
</div>
  );
};

export default Navbar;
