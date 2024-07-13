import { Outlet } from "react-router-dom"
import Navbar from "../pages/Shared/Navbar/Navbar"
import Footer from "../pages/Shared/Footer/Footer"

const Main = () => {
  return (
    <div>
        <Navbar />
        <div className="sm:m-10 m-2">
        <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default Main