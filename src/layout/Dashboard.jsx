import { Outlet } from "react-router-dom"
import Sidebar from "../pages/Dashboard/Sidebar"




const Dashboard = () => {
  
  
  return (
    <div className="flex flex-col md:flex-row overflow-hidden">
      <Sidebar />
      <div className="m-2 md:m-10 w-auto md:w-full overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard