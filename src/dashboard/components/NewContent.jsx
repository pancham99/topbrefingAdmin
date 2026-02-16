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
import moment from "moment-timezone";
import FillterStatus from './fillter/FillterStatus';
import FillterCategory from './fillter/FillterCategory';
import FillterWriters from './fillter/FillterWriters';
import Pagination from './Pagination';


const NewContent = () => {

    const { store } = useContext(storeContext)
    const [news, setNews] = useState([])
    console.log(news, "news gg")
    const [all_news, set_all_news] = useState([])
    const [writers, setWriters] = useState([])

    const [parPage, setPerPage] = useState(100)
    const [pages, setPages] = useState(0)
    const [page, setPage] = useState(1)


    const get_news = async () => {
        try {
            const { data } = await axios.get(`${base_url}/api/news`, {
                headers: {
                    'Authorization': `Bearer ${store.token}`
                }
            })

            set_all_news(data.news)
            setNews(data.news)

            console.log(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    const formattedTime = moment(news?.createdAt).tz("Asia/Kolkata").format('hh:mm A');

    const onlyTime = new Date(news?.createdAt).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // AM/PM format
    });

    console.log(onlyTime, "only time")
    const delete_news = async (news_id) => {

        try {
            if (!news_id) {
                console.error("Invalid news ID");
                return;
            }

            const response = await axios.delete(`${base_url}/api/news/delete/${news_id}`, {
                headers: {
                    Authorization: `Bearer ${store?.token}`,
                },
            });

            // Refetch the news list
            get_news();
        } catch (error) {
            console.error("Delete failed:", error?.response?.data?.message || error.message);
        }
    };

    const get_writers = async () => {
        try {

            const { data } = await axios.get(`${base_url}/api/news/writers`, {
                headers: {
                    'Authorization': `Bearer ${store.token}`
                }
            })

            setWriters(data.writers)
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {

    // }, [])

    useEffect(() => {
        get_news()

        get_writers()
    }, [])

    useEffect(() => {
        if (news.length > 0) {
            const claculate_pages = Math.ceil(news.length / parPage)
            setPages(claculate_pages)

        }
    }, [news, parPage])

    const type_fillter = (e) => {
        if (e.target.value === '') {
            setNews(all_news)
            setPage(1)
            setPerPage(5)
        } else {
            const tempNews = all_news.filter(n => n.status === e.target.value)
            setNews(tempNews)
            setPage(1)
            setPerPage(5)
        }
    }

    const type_fillter_category = (e) => {
        console.log(e.target.value)
        if (e.target.value === '') {
            setNews(all_news)
            setPage(1)
            setPerPage(10)
        } else {
            const tempNews = all_news.filter(n => n.category === e.target.value)
            setNews(tempNews)
            setPage(1)
            setPerPage(10)
        }
    }

    const type_fillter_writer = (e) => {
        if (e.target.value === '') {
            setNews(all_news)
            setPage(1)
            setPerPage(5)
        } else {
            const tempNews = all_news.filter(n => n.writerName === e.target.value)
            setNews(tempNews)
            setPage(1)
            setPerPage(5)
        }
    }

    const serach_news = (e) => {
        const tempNews = all_news.filter(n => n.title.toLowerCase().indexOf(e.target.value.toLowerCase()) > - 1)
        setNews(tempNews)
        setPage(1)
        setPerPage(5)
    }
    const [res, setRes] = useState({
        id: '',
        loader: false,

    })
    const update_status = async (status, news_id) => {
        try {

            setRes({
                id: news_id,
                loader: true
            })
            const { data } = await axios.put(`${base_url}/api/news/status-update/${news_id}`, { status }, {
                headers: {
                    'Authorization': `Bearer ${store.token}`
                }
            })
            setRes({
                id: news_id,
                loader: false
            })
            toast.success(data.message)
            get_news()

            console.log(data)
        } catch (error) {
            console.log(error.message)
            toast.error(error.response.data.message)
        }
    }

    return (
        <div>
            <div className='px-4 py-3 lg:flex flex-cols lg:gap-x-3  space-y-3 lg:space-y-0'>
                <FillterStatus type_fillter={type_fillter} />
                <FillterCategory type_fillter_category={type_fillter_category} />
                <FillterWriters type_fillter_writer={type_fillter_writer} writers={writers} />
                <input onChange={serach_news} type='text' placeholder='search news' className='lg:px-3 w-full  py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' />
            </div>
            <div className='relative overflow-x-auto p-4'>
                <table className='w-full text-sm text-left text-slate-600'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                        <tr>
                            <th className='px-7 py-3'>No</th>
                            <th className='px-7 py-3'>Title</th>
                            <th className='px-7 py-3'>Image</th>
                            <th className='px-7 py-3'>Category</th>
                            <th className='px-7 py-3'>Description</th>
                            <th className='px-7 py-3'>Date</th>
                            <th className='px-7 py-3'>Time</th>
                            <th className='px-7 py-3'>Status</th>
                            {/* <th className='px-7 py-3'>Active</th> */}
                            <th className='px-7 py-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            news.length > 0 && news.slice((page - 1) * parPage, page * parPage).map((n, i) =>
                                <tr key={i} className='bg-white border-b text-xs'>
                                    <td className='px-6 py-4'>{i + 1}</td>
                                    <td className='px-6 py-4'>{n.title.slice(0, 15)}...</td>
                                    <td className='px-6 py-4'>
                                        <img className='w-[40px] h-[40px]' src={n.image} alt='' />
                                    </td>
                                    <td className='px-6 py-4'>{n.category}</td>
                                    <td className='px-6 py-4'>{convert(n.description).slice(0, 15)}...</td>
                                    <td className='px-6 py-4'>{n.date}</td>
                                    <td className='px-6 py-4'>{moment(n.createdAt).tz("Asia/Kolkata").format("hh:mm A")}</td>
                                    {
                                        store?.userInfo?.role === 'admin' ? <td className='px-6 py-4'>

                                            {
                                                n.status === 'pending' && <span onClick={() => update_status('active', n._id)} className='px-2 py-[2px] bg-blue-100 text-blue-800 rounded-lg text-xs cursor-pointer'>{res.loader && res.id === n._id ? 'Loading..' : n.status}</span>
                                            }
                                            {
                                                n.status === 'active' && <span onClick={() => update_status('deactive', n._id)} className='px-2 py-[2px] bg-green-100 text-green-800 rounded-lg text-xs cursor-pointer'>{res.loader && res.id === n._id ? 'Loading..' : n.status}</span>
                                            }
                                            {
                                                n.status === 'deactive' && <span onClick={() => update_status('active', n._id)} className='px-2 py-[2px] bg-red-100 text-red-800 rounded-lg text-xs cursor-pointer'>{res.loader && res.id === n._id ? 'Loading..' : n.status}</span>
                                            }


                                        </td> : <td className='px-6 py-4'>

                                            {
                                                n.status === 'pending' && <span className='px-2 py-[2px] bg-blue-100 text-blue-800 rounded-lg text-xs cursor-pointer'>{n.status}</span>
                                            }
                                            {
                                                n.status === 'active' && <span className='px-2 py-[2px] bg-green-100 text-green-800 rounded-lg text-xs cursor-pointer'>{n.status}</span>
                                            }
                                            {
                                                n.status === 'deactive' && <span className='px-2 py-[2px] bg-red-100 text-red-800 rounded-lg text-xs cursor-pointer'>{n.status}</span>
                                            }


                                        </td>
                                    }
                                    <td className='px-6 py-4'>
                                        <div className='px-6 py-4'>
                                            {
                                                store?.userInfo?.role === 'admin' && <>
                                                    <button onClick={() => delete_news(n._id)} className='p-[6px]  rounded hover:shadow-lg hover:shadow-green-500/50'><MdDelete className='text-red-600 ' size={28} /></button>
                                                </>
                                            }
                                            {
                                                store?.userInfo?.role === 'writer' && <>
                                                    <Link to={`/dashboard/news/edit/${n._id}`} className='p-[4px] rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit className='w-4 h-4' /></Link>
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


            <Pagination parPage={parPage} news={news} page={page} pages={pages} setPerPage={setPerPage} setPage={setPage} />

        </div>
    )
}

export default NewContent