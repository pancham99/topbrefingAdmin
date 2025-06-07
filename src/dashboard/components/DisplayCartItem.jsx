
import { IoClose } from 'react-icons/io5'

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
import { PiFlagBannerFoldBold } from 'react-icons/pi';

const DisplayCartItem = ({ close }) => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const { store, dispatch } = useContext(storeContext)

    const logout = () => {
        localStorage.removeItem('newstoken')
        dispatch({ type: 'logout', payload: '' })
        navigate('/login')
    }
    return (
        <section className='bg-neutral-900 fixed top-0 bottom-0 right-0 left-0 bg-opacity-70 z-50'>
            <div className='bg-white w-36 max-w-sm min-h-screen max-h-screen ml-auto'>
                <div className='flex items-center shadow-md px-2 justify-between'>
                    <img className='w-12 h-12 bg-contain rounded-full' src='https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg' alt='' />

                    <button onClick={close} className=' lg:hidden'>
                        <IoClose size={25} />
                    </button>
                </div>

                <div className='min-h-[75vh] lg:min-h-[80vh] w-full h-full  bg-blue-50 p-2 flex flex-col'>

                    <div className='  lg:hidden'>
                        <div className='py-2 flex justify-center items-center'>
                            <Link to="/">
                                <h1><span className='text-sm text-slate-400 font-semibold'>Top</span><span className='text-sky-400'>Briefing</span></h1>
                            </Link>
                        </div>

                        <ul className='px-0 flex flex-col gap-y-1 font-medium'>
                            {
                                store.userInfo?.role === 'admin' ? <>
                                    <li>
                                        <Link to="/dashboard/admin" onClick={close} className={`px-3 ${pathname === "/dashboard/admin" ? "bg-indigo-500 text-white" : "bg-white text-[#4040f6]"} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-md flex gap-x-1 justify-start items-center hover:bg-indigo-500 hover:text-white`}>
                                            <span className='text-xl'><AiFillDashboard /></span>
                                            <span>Dashbord</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/dashboard/writer/add" onClick={close} className={`px-3 ${pathname === "/dashboard/writer/add" ? "bg-indigo-500 text-white" : "bg-white text-[#4040f6]"} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-md flex gap-x-1 justify-start items-center hover:bg-indigo-500 hover:text-white`}>
                                            <span className='text-xs'><AiOutlinePlus /></span>
                                            <span>Add writer</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/dashboard/writers" onClick={close} className={`px-3 ${pathname === "/dashboard/writers" ? "bg-indigo-500 text-white" : "bg-white text-[#4040f6]"} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-md flex gap-x-1 justify-start items-center hover:bg-indigo-500 hover:text-white`}>
                                            <span className='text-xs'><FiUsers /></span>
                                            <span>Writers</span>
                                        </Link>
                                    </li>


                                    <li>
                                        <Link to="/dashboard/createBanner" className={`px-3 ${pathname === "/dashboard/createBanner" ? "bg-indigo-500 text-white" : "bg-white text-[#4040f6]"} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-md flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white`}>
                                            <span className='text-xl'><AiOutlinePlus /></span>
                                            <span>Add Banner</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/dashboard/banner" className={`px-3 ${pathname === "/dashboard/banner" ? "bg-indigo-500 text-white" : "bg-white text-[#4040f6]"} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-md flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white`}>
                                            <span className='text-xl'><PiFlagBannerFoldBold /></span>
                                            <span>Banner</span>
                                        </Link>
                                    </li>
                                </> : <>

                                    <li>
                                        <Link to="/dashboard/writer" onClick={close} className={`px-3 ${pathname === "/dashboard/writer" ? "bg-indigo-500 text-white" : "bg-white text-[#4040f6]"} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-md flex gap-x-1 justify-start items-center hover:bg-indigo-500 hover:text-white`}>
                                            <span className='text-xs'><AiFillDashboard /></span>
                                            <span>Dashbord</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/news/create" onClick={close} className={`px-3 ${pathname === "/dashboard/news/create" ? "bg-indigo-500 text-white" : "bg-white text-[#4040f6]"} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-md flex gap-x-1 justify-start items-center hover:bg-indigo-500 hover:text-white`}>
                                            <span className='text-xs'><FaPlus /></span>
                                            <span>Add News</span>
                                        </Link>
                                    </li>
                                </>

                            }


                            <li>
                                <Link to="/dashboard/news" onClick={close} className={`px-3 ${pathname === "/dashboard/news" ? "bg-indigo-500 text-white" : "bg-white text-[#4040f6]"} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-md flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white`}>
                                    <span className='text-xs'><BiNews /></span>
                                    <span>News</span>
                                </Link>
                            </li>



                            <li>
                                <Link to="/dashboard/profile" onClick={close} className={`px-3 ${pathname === "/dashboard/profile" ? "bg-indigo-500 text-white" : "bg-white text-[#4040f6]"} py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-md flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white`}>
                                    <span className='text-xs'><ImProfile /></span>
                                    <span>Profile</span>
                                </Link>
                            </li>

                            <li>
                                <div onClick={logout} className={`px-3  py-2 hover:shadow-lg hover:shadow-red-500/20 w-full rounded-md flex gap-x-2 justify-start items-center hover:bg-red-500 hover:text-white cursor-pointer`}>
                                    <span className='text-xs'><IoLogOutOutline /></span>
                                    <span>Logout</span>
                                </div>
                            </li>


                        </ul>
                    </div>
                </div>



            </div>
        </section>
    )
}

export default DisplayCartItem