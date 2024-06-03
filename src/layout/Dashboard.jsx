import { Outlet } from "react-router-dom"
import Sidebar from "../pages/Dashboard/Sidebar"



const Dashboard = () => {
  
  
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default Dashboard