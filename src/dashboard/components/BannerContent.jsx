import React, { useRef, useContext, useState, useEffect } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from 'axios'
import { base_url } from '../../config/config'
import storeContext from '../../context/storeContext'
import { convert } from 'html-to-text'
import toast from 'react-hot-toast'
import { MdDelete } from "react-icons/md";


const BannerContent = () => {
    const { store } = useContext(storeContext)
    const [news, setNews] = useState([])

    console.log(news, "banners")



    const get_news = async () => {
        try {
            const { data } = await axios.get(`${base_url}/api/banner/getall`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            setNews(data?.banners || []);
            console.log(data.banners)
        } catch (error) {
            console.log(error.message)
        }
    }


    const [res, setRes] = useState({
        id: '',
        loader: false,

    })

    const update_status = async ({ _id, status }) => {

        console.log(_id, status, "status update")
        try {

            setRes({
                id: _id,
                loader: true
            })

            const { data } = await axios.put(`${base_url}/api/banner/status/${_id}`, { status }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            setRes({
                id: _id,
                loader: false
            })
            toast.success(data.message)
            get_news()

        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

     const delete_banner = async (_id) => {
        console.log(_id, "delete banner")

        try {

            const { data } = await axios.delete(`${base_url}/api/banner/delete/${_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            toast.success(data.message)
            get_news()

        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        get_news()
    }, [])





    return (
        <div>
            <div className='relative overflow-x-auto p-4'>
                <table className='w-full text-sm text-left text-slate-600'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                        <tr>
                            <th className='px-7 py-3'>No</th>
                            <th className='px-7 py-3'>Title</th>
                            <th className='px-7 py-3'>Image</th>
                            <th className='px-7 py-3'>Description</th>
                            <th className='px-7 py-3'>Banner Type</th>
                            <th className='px-7 py-3'>Device</th>
                            <th className='px-7 py-3'>Status</th>
                            <th className='px-7 py-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            news?.map((n, i) =>
                                <tr key={i} className='bg-white border-b'>
                                    <td className='px-6 py-4'>{i + 1}</td>
                                    <td className='px-6 py-4'>{n.title}...</td>
                                    <td className='px-6 py-4'>
                                        <img className='w-[40px] h-[40px]' src={n.image} alt='' />
                                    </td>

                                    <td className='px-6 py-4'>{convert(n.description).slice(0, 15)}...</td>
                                    <td className='px-6 py-4'>{n.bannertype}</td>

                                    <td className='px-6 py-4'>{n.device}</td>
                                    <td className='px-6 py-4'>
                                        {/* <span className='px-2 py-[2px] bg-blue-100 text-blue-800 rounded-lg text-xs cursor-pointer'>{n.status}</span> */}


                                        {
                                            n.status === 'pending' && <span onClick={() => update_status({ _id: n._id, status: 'active' })} className='px-2 py-[2px] bg-blue-100 text-blue-800 rounded-lg text-xs cursor-pointer'>{res.loader && res.id === n._id ? 'Loading..' : n.status}</span>
                                        }
                                        {
                                            n.status === 'active' && <span onClick={() => update_status({ _id: n._id, status: 'deactive' })} className='px-2 py-[2px] bg-green-100 text-green-800 rounded-lg text-xs cursor-pointer'>{res.loader && res.id === n._id ? 'Loading..' : n.status}</span>
                                        }
                                        {
                                            n.status === 'deactive' && <span onClick={() => update_status({ _id: n._id, status: 'active' })} className='px-2 py-[2px] bg-red-100 text-red-800 rounded-lg text-xs cursor-pointer'>{res.loader && res.id === n._id ? 'Loading..' : n.status}</span>
                                        }
                                    </td>

                                    <td className='px-6 py-4'>
                                        <div className='px-6 py-4'>
                                            <button className='p-[6px]  rounded hover:shadow-lg hover:shadow-green-500/50'><MdDelete  onClick={() => delete_banner(n._id)} className='text-red-600 ' size={28} /></button>
                                            {
                                                store?.userInfo?.role === 'writer' && <>
                                                    <Link to={`/dashboard/news/edit/${n._id}`} className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit /></Link>
                                                    {/* <div className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash /></div> */}
                                                </>
                                            }
                                        </div>
                                    </td>
                                    {/* <td className='px-6 py-4'>
                                                   <button onClick={() => delete_news(n._id)} className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><MdDelete /></button>
                                               </td> */}


                                </tr>
                            )
                        }


                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default BannerContent