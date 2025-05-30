import { Outlet, NavLink } from "react-router-dom";
import { LuHouse } from "react-icons/lu";
import { HiSparkles } from "react-icons/hi";
import { MdOutlineHistoryToggleOff } from "react-icons/md";
import {faHouse} from '@fortawesome/free-solid-svg-icons';
import { CiSettings } from "react-icons/ci";



const Navbar = () => {
  return (
    <nav className='absolute bottom-0 w-full px-6 py-2'>
        <ul className="flex justify-between items-center">
            <li>
                <NavLink className={({isActive}) => isActive ? "text-blue-500 text-4xl md:text-6xl" : "text-gray-600 text-2xl md:text-4xl"} to="/"><LuHouse className="text-2xl md:text-4xl" /></NavLink></li>
            <li>
                <NavLink className={({isActive}) => isActive ? "text-blue-500 text-4xl md:text-6xl" : "text-gray-600 text-2xl md:text-4xl"} to="/doctor"><HiSparkles className="text-2xl md:text-5xl" /></NavLink></li>
            <li>
                <NavLink className={({isActive}) => isActive ? "text-blue-500 text-4xl md:text-6xl" : "text-gray-600 text-2xl md:text-4xl"} to="/ola"><MdOutlineHistoryToggleOff className="text-2xl md:text-5xl" /></NavLink></li>
            <li>
                <NavLink className={({isActive}) => isActive ? "text-blue-500 text-4xl md:text-6xl" : "text-gray-600 text-2xl md:text-4xl"} to="/th"><CiSettings className="text-2xl md:text-5xl" /></NavLink></li>
        </ul>
    </nav>
  )
}

export default Navbar
