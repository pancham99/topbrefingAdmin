import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { FaEye } from "react-icons/fa";
import axios from 'axios'
import { base_url } from '../../config/config'
import storeContext from '../../context/storeContext'
import toast from 'react-hot-toast'
import { MdDelete } from 'react-icons/md';

const Writers = () => {
    const { store } = useContext(storeContext)
    const [writers, setWriters] = useState([])

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

    useEffect(() => {
        get_writers()
    }, [])
    const [res, setRes] = useState({
        id: '',
        loader: false,

    })

    const update_status = async (status, user_id) => {
        try {

            setRes({
                id: user_id,
                loader: true
            })
            const { data } = await axios.put(`${base_url}/api/news/writer_status-update/${user_id}`, { status }, {
                headers: {
                    'Authorization': `Bearer ${store.token}`
                }
            })
            setRes({
                id: user_id,
                loader: false
            })
            toast.success(data.message)
            get_writers()

            console.log(data)
        } catch (error) {
            console.log(error.message)
            toast.error(error.response.data.message)
        }
    }


    const delete_writers = async (user_id) => {
        try {
            if (!user_id) {
                console.error("Invalid news ID");
                return;
            }

            const response = await axios.delete(`${base_url}/api/news/writer/delete/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${store?.token}`,
                },
            });

           get_writers()
        } catch (error) {
            console.error("Delete failed:", error?.response?.data?.message || error.message);
        }
    };



    return (
        <div className='bg-white rounded-md'>
            <div className='flex justify-between p-4'>
                <h2 className='text-xl font-medium'>Writers</h2>
                <Link className='px-3 py-[6px] bg-purple-500 rounded-md text-white hover:bg-purple-600' to='/dashboard/writer/add'>Add Writer</Link>
            </div>

            <div className='relative overflow-x-auto p-4'>
                <table className='w-full text-sm text-left text-slate-600'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                        <tr>
                            <th className='px-7 py-3'>No</th>
                            <th className='px-7 py-3'>Reporter Name</th>
                            <th className='px-7 py-3'>Category</th>
                            <th className='px-7 py-3'>Role</th>
                            <th className='px-7 py-3'>Image</th>
                            <th className='px-7 py-3'>Email</th>
                            <th className='px-7 py-3'>Active</th>
                            <th className='px-7 py-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            writers?.map((r, i) => <tr key={i} className='bg-white border-b'>
                                <td className='px-6 py-4'>{i + 1}</td>
                                <td className='px-6 py-4'>{r.name}</td>
                                <td className='px-6 py-4'>{r.category}</td>
                                <td className='px-6 py-4'>{r.role}</td>
                                <td className='px-6 py-4'>
                                    <img className='w-[40px] h-[40px]' src={r.image} alt='' />
                                </td>



                                <td className='px-6 py-4'>{r.email}</td>
                                {/* <td className='px-6 py-4'>Jan 15, 2024</td>*/}

                                <td className='px-6 py-4'>
                                    <div className='flex justify-start items-center gap-x-4 text-white'>

                                        {
                                            r.status === 'active' && <span onClick={() => update_status('deactive', r._id)} className='px-2 py-[2px] bg-green-100 text-green-800 rounded-lg text-xs cursor-pointer'>{res.loader && res.id === r._id ? 'Loading..' : r.status}</span>
                                        }

                                        {
                                            r.status === 'deactive' && <span onClick={() => update_status('active', r._id)} className='px-2 py-[2px] bg-red-100 text-red-800 rounded-lg text-xs cursor-pointer'>{res.loader && res.id === r._id ? 'Loading..' : r.status}</span>
                                        }

                                        {/* <Link to={`/dashboard/writer/${r._id}`} className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><FaEye /></Link> */}
                                        {/* <Link className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit/></Link>
                                 <div className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash/></div> */}

                                    </div>
                                </td>

                                <td className='px-6 py-4'>
                                    <button onClick={() => delete_writers(r._id)} className='p-[6px]  rounded hover:shadow-lg hover:shadow-green-500/50'><MdDelete className='text-red-600 ' size={28} /></button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Writers