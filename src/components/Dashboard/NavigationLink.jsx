import { CgProfile } from "react-icons/cg"
import { FaBook, FaHome, FaUsers } from "react-icons/fa"
import { MdEventNote, MdOutlineBallot } from "react-icons/md"
import { Link, NavLink } from "react-router-dom"
import useAdmin from "../../hooks/useAdmin"
import { FaNoteSticky, FaRegNoteSticky } from "react-icons/fa6"
import { RiReservedLine } from "react-icons/ri"
import { IoMdAdd } from "react-icons/io"

const NavigationLink = () => {
    const {isAdmin} = useAdmin()
  return (
    <ul className="pt-2 pb-4 space-y-1 text-sm">
  <li className="rounded-sm hover:bg-slate-400">
      <Link to='/' className="flex items-center p-2 space-x-3 rounded-md">
          <FaHome className="text-2xl" />
          <span>Home</span>
      </Link>
  </li>

  <li className="rounded-sm hover:bg-slate-400">
      <NavLink  to='/dashboard' className="flex items-center p-2 space-x-3 rounded-md">
          <CgProfile className="text-2xl" />
          <span>My Profile</span>
      </NavLink>
  </li>

  <li className="rounded-sm hover:bg-slate-400">
      <NavLink  to='/dashboard/appointments' className="flex items-center p-2 space-x-3 rounded-md">
          <FaBook className="text-2xl" />
          <span>Upcoming appointments</span>
      </NavLink>
  </li>

  <li className="rounded-sm hover:bg-slate-400">
      <NavLink  to='/dashboard/test_results' className="flex items-center p-2 space-x-3 rounded-md">
          <MdEventNote className="text-2xl" />
          <span>Test results</span>
      </NavLink>
  </li>

  {isAdmin && <li className="rounded-sm hover:bg-slate-400">
      <NavLink  to='/dashboard/all_users' className="flex items-center p-2 space-x-3 rounded-md">
          <FaUsers className="text-2xl" />
          <span>All Users</span>
      </NavLink>
  </li>}

  {isAdmin && <li className="rounded-sm hover:bg-slate-400">
    <NavLink  to='/dashboard/add_test' className="flex items-center p-2 space-x-3 rounded-md">
        <FaRegNoteSticky className="text-2xl" />
        <span>Add a test</span>
    </NavLink>
  </li>}

  {isAdmin && <li className="rounded-sm hover:bg-slate-400">
    <NavLink  to='/dashboard/all_test' className="flex items-center p-2 space-x-3 rounded-md">
        <FaNoteSticky className="text-2xl" />
        <span>All test</span>
    </NavLink>
  </li>}

  {isAdmin && <li className="rounded-sm hover:bg-slate-400">
    <NavLink  to='/dashboard/reservation' className="flex items-center p-2 space-x-3 rounded-md">
        <RiReservedLine className="text-2xl" />
        <span>Reservation</span>
    </NavLink>
  </li>}

  {isAdmin && <li className="rounded-sm hover:bg-slate-400">
    <NavLink  to='/dashboard/add_banner' className="flex items-center p-2 space-x-3 rounded-md">
        <IoMdAdd className="text-2xl" />
        <span>Add banner</span>
    </NavLink>
  </li>}


  {isAdmin && <li className="rounded-sm hover:bg-slate-400">
    <NavLink  to='/dashboard/all_banners' className="flex items-center p-2 space-x-3 rounded-md">
        <MdOutlineBallot className="text-2xl" />
        <span>All banners</span>
    </NavLink>
  </li>}

  {isAdmin && <li className="rounded-sm hover:bg-slate-400">
    <NavLink  to='/dashboard/statistics' className="flex items-center p-2 space-x-3 rounded-md">
        <MdOutlineBallot className="text-2xl" />
        <span>Statistics</span>
    </NavLink>
  </li>}
  
</ul>
  )
}

export default NavigationLink