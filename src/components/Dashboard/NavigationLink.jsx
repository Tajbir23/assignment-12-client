import { CgProfile } from "react-icons/cg"
import { FaBook, FaHome, FaUsers } from "react-icons/fa"
import { MdEventNote, MdOutlineBallot } from "react-icons/md"
import { Link, NavLink } from "react-router-dom"
import useAdmin from "../../hooks/useAdmin"
import { FaNoteSticky, FaRegNoteSticky } from "react-icons/fa6"
import { IoMdAdd } from "react-icons/io"
import { FcStatistics } from "react-icons/fc";
import { MdOutlineRecommend } from "react-icons/md";

const NavigationLink = () => {
    const {isAdmin} = useAdmin()
  return (
    <ul className="pt-2 pb-4 text-sm grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-5">
  <li className="col-span-1 rounded-sm hover:bg-slate-400">
      <Link to='/' className="flex items-center p-2 space-x-3 rounded-md">
          <FaHome className="text-2xl" />
          <span>Home</span>
      </Link>
  </li>

  <li className="col-span-1 rounded-sm hover:bg-slate-400">
      <NavLink  to='/dashboard' className="flex items-center p-2 space-x-3 rounded-md">
          <CgProfile className="text-2xl" />
          <span>My Profile</span>
      </NavLink>
  </li>

  <li className="col-span-1 rounded-sm hover:bg-slate-400">
      <NavLink  to='/dashboard/appointments' className="flex items-center p-2 space-x-3 rounded-md">
          <FaBook className="text-2xl" />
          <span>Upcoming appointments</span>
      </NavLink>
  </li>

  <li className="col-span-1 rounded-sm hover:bg-slate-400">
      <NavLink  to='/dashboard/test_results' className="flex items-center p-2 space-x-3 rounded-md">
          <MdEventNote className="text-2xl" />
          <span>Test results</span>
      </NavLink>
  </li>

  {isAdmin && <li className="col-span-1 rounded-sm hover:bg-slate-400">
      <NavLink  to='/dashboard/all_users' className="flex items-center p-2 space-x-3 rounded-md">
          <FaUsers className="text-2xl" />
          <span>All Users</span>
      </NavLink>
  </li>}

  {isAdmin && <li className="col-span-1 rounded-sm hover:bg-slate-400">
    <NavLink  to='/dashboard/add_test' className="flex items-center p-2 space-x-3 rounded-md">
        <FaRegNoteSticky className="text-2xl" />
        <span>Add a test</span>
    </NavLink>
  </li>}

  {isAdmin && <li className="col-span-1 rounded-sm hover:bg-slate-400">
    <NavLink  to='/dashboard/all_test' className="flex items-center p-2 space-x-3 rounded-md">
        <FaNoteSticky className="text-2xl" />
        <span>All test</span>
    </NavLink>
  </li>}

  {isAdmin && <li className="col-span-1 rounded-sm hover:bg-slate-400">
    <NavLink  to='/dashboard/add_banner' className="flex items-center p-2 space-x-3 rounded-md">
        <IoMdAdd className="text-2xl" />
        <span>Add banner</span>
    </NavLink>
  </li>}


  {isAdmin && <li className="col-span-1 rounded-sm hover:bg-slate-400">
    <NavLink  to='/dashboard/all_banners' className="flex items-center p-2 space-x-3 rounded-md">
        <MdOutlineBallot className="text-2xl" />
        <span>All banners</span>
    </NavLink>
  </li>}

  {isAdmin && <li className="col-span-1 rounded-sm hover:bg-slate-400">
    <NavLink  to='/dashboard/recommendation' className="flex items-center p-2 space-x-3 rounded-md">
        <MdOutlineRecommend className="text-2xl" />
        <span>Recommendation</span>
    </NavLink>
  </li>}

  {isAdmin && <li className="col-span-1 rounded-sm hover:bg-slate-400">
    <NavLink  to='/dashboard/statistics' className="flex items-center p-2 space-x-3 rounded-md">
        <FcStatistics className="text-2xl" />
        <span>Statistics</span>
    </NavLink>
  </li>}
  
</ul>
  )
}

export default NavigationLink