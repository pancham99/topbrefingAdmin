
import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiFillDashboard } from "react-icons/ai";
import { BiNews } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { ImProfile } from "react-icons/im";
import { FaPlus } from "react-icons/fa";
import storeContext from '../../context/storeContext'
import { IoLogOutOutline } from "react-icons/io5";
import { PiFlagBannerFoldBold } from "react-icons/pi";
import { IoIosVideocam } from "react-icons/io";

const Sidebar = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const { store, dispatch } = useContext(storeContext)

    const logout = () => {
        localStorage.removeItem('newstoken')
        dispatch({ type: 'logout', payload: '' })
        navigate('/login')
    }

    return (
        <div className='w-[250px] h-screen fixed left-0 top-0 bg-white hidden lg:block'>
            <div className='h-[70px] flex justify-center items-center'>
                <Link to="/">

                    <div className="flex flex-col justify-center items-center md:items-start mt-8">
                        <img src="/logo.png" alt="bgimage" className='w-36 h-28 bg-contain'/>
                    </div>
                    {/* <h1><span className='text-3xl text-red-600 font-semibold'>Top</span><span className='text-red-400'>Briefing</span></h1> */}
                </Link>
            </div>

            <ul className='px-3 flex flex-col gap-y-1 font-medium'>
                {
                    store.userInfo?.role === 'admin' ? <>
                        <li>
                            <Link to="/dashboard/admin" className={`px-3 ${pathname === "/dashboard/admin" ? "bg-red-500 text-white" : "bg-white text-[#4040f6]"} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-md flex gap-x-2 justify-start items-center hover:bg-red-400 hover:text-white`}>
                                <span className='text-xl'><AiFillDashboard /></span>
                                <span>Dashbord</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/dashboard/writer/add" className={`px-3 ${pathname === "/dashboard/writer/add" ? "bg-red-500 text-white" : "bg-white text-[#4040f6]"} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-md flex gap-x-2 justify-start items-center hover:bg-red-400 hover:text-white`}>
                                <span className='text-xl'><AiOutlinePlus /></span>
                                <span>Add writer</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/dashboard/writers" className={`px-3 ${pathname === "/dashboard/writers" ? "bg-red-500 text-white" : "bg-white text-[#4040f6]"} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-md flex gap-x-2 justify-start items-center hover:bg-red-400 hover:text-white`}>
                                <span className='text-xl'><FiUsers /></span>
                                <span>Writers</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/dashboard/createBanner" className={`px-3 ${pathname === "/dashboard/createBanner" ? "bg-red-500 text-white" : "bg-white text-[#4040f6]"} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-md flex gap-x-2 justify-start items-center hover:bg-red-400 hover:text-white`}>
                                <span className='text-xl'><AiOutlinePlus /></span>
                                <span>Add Banner</span>
                            </Link>
                        </li>



                        <li>
                            <Link to="/dashboard/banner" className={`px-3 ${pathname === "/dashboard/banner" ? "bg-red-500 text-white" : "bg-white text-[#4040f6]"} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-md flex gap-x-2 justify-start items-center hover:bg-red-400 hover:text-white`}>
                                <span className='text-xl'><PiFlagBannerFoldBold /></span>
                                <span>Banner</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/dashboard/addVideoContent" className={`px-3 ${pathname === "/dashboard/addVideoContent" ? "bg-red-500 text-white" : "bg-white text-[#4040f6]"} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-md flex gap-x-2 justify-start items-center hover:bg-red-400 hover:text-white`}>
                                <span className='text-xl'><AiOutlinePlus /></span>
                                <span>Add Video</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/dashboard/video" className={`px-3 ${pathname === "/dashboard/video" ? "bg-red-500 text-white" : "bg-white text-[#4040f6]"} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-md flex gap-x-2 justify-start items-center hover:bg-red-400 hover:text-white`}>
                                <span className='text-xl'><IoIosVideocam /></span>
                                <span>Video</span>
                            </Link>
                        </li>
                    </> : <>

                        <li>
                            <Link to="/dashboard/writer" className={`px-3 ${pathname === "/dashboard/writer" ? "bg-red-500 text-white" : "bg-white text-[#4040f6]"} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-md flex gap-x-2 justify-start items-center hover:bg-red-400 hover:text-white`}>
                                <span className='text-xl'><AiFillDashboard /></span>
                                <span>Dashbord</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/news/create" className={`px-3 ${pathname === "/dashboard/news/create" ? "bg-red-500 text-white" : "bg-white text-[#4040f6]"} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-md flex gap-x-2 justify-start items-center hover:bg-red-400 hover:text-white`}>
                                <span className='text-xl'><FaPlus /></span>
                                <span>Add News</span>
                            </Link>
                        </li>
                    </>

                }


                <li>
                    <Link to="/dashboard/news" className={`px-3 ${pathname === "/dashboard/news" ? "bg-red-500 text-white" : "bg-white text-[#4040f6]"} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-md flex gap-x-2 justify-start items-center hover:bg-red-400 hover:text-white`}>
                        <span className='text-xl'><BiNews /></span>
                        <span>News</span>
                    </Link>
                </li>



                <li>
                    <Link to="/dashboard/profile" className={`px-3 ${pathname === "/dashboard/profile" ? "bg-red-500 text-white" : "bg-white text-[#4040f6]"} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-md flex gap-x-2 justify-start items-center hover:bg-red-400 hover:text-white`}>
                        <span className='text-xl'><ImProfile /></span>
                        <span>Profile</span>
                    </Link>
                </li>

                <li>
                    <div onClick={logout} className={`px-3  py-2 hover:shadow-lg hover:shadow-red-500/20 w-full rounded-md flex gap-x-2 justify-start items-center hover:bg-red-500 hover:text-white cursor-pointer`}>
                        <span className='text-xl'><IoLogOutOutline /></span>
                        <span>Logout</span>
                    </div>
                </li>


            </ul>
        </div>
    )
}

export default Sidebar