import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import NavigationLink from "../../components/Dashboard/NavigationLink";



const Sidebar = () => {
    const {user, logOut} = useContext(AuthContext)
  const [show, setShow] = useState(true)

  const toggleSidebar = () => {
    setShow(!show)
  }

    return (
        <div className={`flex flex-col items-center justify-center h-full p-3 w-full ${!show ? '!w-14' : 'md:max-w-60'}  dark:bg-gray-50 dark:text-gray-800`}>
        <button className={`p-2 hidden w-5 ${show ? 'hidden' : 'md:block'}`} onClick={() => toggleSidebar()}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-800">
                        <rect width="352" height="32" x="80" y="96"></rect>
                        <rect width="352" height="32" x="80" y="240"></rect>
                        <rect width="352" height="32" x="80" y="384"></rect>
                    </svg>
                </button>
        {show &&<> <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h2>Dashboard</h2>
                <button className="p-2 hidden md:block" onClick={() => toggleSidebar()}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-800">
                        <rect width="352" height="32" x="80" y="96"></rect>
                        <rect width="352" height="32" x="80" y="240"></rect>
                        <rect width="352" height="32" x="80" y="384"></rect>
                    </svg>
                </button>
            </div>
            
            <div className="flex-1">
                <NavigationLink />
            </div>
        </div>
        <div className="flex items-center p-2 mt-12 space-x-4 justify-self-end">
            <img src={user?.photoURL} alt="" className="w-12 h-12 rounded-lg dark:bg-gray-500" />
            <div>
                <h2 className="text-lg font-semibold">{user?.displayName}</h2>
                <span className="flex items-center space-x-1">
                    <Link to='/dashboard' className="text-xs hover:underline dark:text-gray-600">View profile</Link>
                </span>
            </div>
        </div>
        <div>
            <button onClick={logOut} className="btn btn-primary w-full mt-5">Logout</button>
        </div>
         </>}
    </div>
    );
  };
  


export default Sidebar