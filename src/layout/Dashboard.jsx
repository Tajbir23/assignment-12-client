import { Outlet } from "react-router-dom"
import Sidebar from "../pages/Dashboard/Sidebar"




const Dashboard = () => {
  
  
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="m-10 w-full">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard