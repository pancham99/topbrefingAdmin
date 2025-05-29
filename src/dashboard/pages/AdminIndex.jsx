import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { base_url } from '../../config/config';
import storeContext from '../../context/storeContext';
import axios from 'axios';

const AdminIndex = () => {
   const { store } = useContext(storeContext)
   const [all_news, set_all_news] = useState([])
   console.log(all_news, "hhall_newsh")

      const get_news = async () => {
          try {
              const { data } = await axios.get(`${base_url}/api/news`, {
                  headers: {
                      'Authorization': `Bearer ${store.token}`
                  }
              })
  
              set_all_news(data.news)
              
  
              console.log(data)
          } catch (error) {
              console.log(error.message)
          }
      }
  
      useEffect(() => {
          get_news()
      }, [])


      const pendingNews = all_news.filter(news => news.status === "pending");
      const activeNews = all_news.filter(news => news.status === "active");
      const deactiveNews = all_news.filter(news => news.status === "deactive");

  return (
    <div className='lg:mt-3 mt-0'>
      <div className='grid lg:grid-cols-5 lg:gap-x-4 gap-4 lg:gap-0'>

        <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700'>
          <span className='text-xl font-bold'>{all_news.length}</span>
          <span>Total News</span>
        </div>

        <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700'>
          <span className='text-xl font-bold'>{pendingNews.length}</span>
          <span>Pending News</span>
        </div>

        <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700'>
          <span className='text-xl font-bold'>{activeNews.length}</span>
          <span>Active News</span>
        </div>

        <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700'>
          <span className='text-xl font-bold'>{deactiveNews.length}</span>
          <span>Deactive News</span>
        </div>

        <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700'>
          <span className='text-xl font-bold'>50</span>
          <span>Writer</span>
        </div>
      </div>

      <div className='bg-white p-4 mt-5'>
        <div className='flex justify-between items-center pb-4'>
          <h2>Recent News</h2>
          <Link>View All</Link>
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
                            <th className='px-7 py-3'>Status</th>
                            <th className='px-7 py-3'>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                         [1,2,3,4,5,6,7].map((n,i)=><tr key={i} className='bg-white border-b'>
                         <td className='px-6 py-4'>1</td>
                         <td className='px-6 py-4'>India gets its longest glass b..</td>
                         <td className='px-6 py-4'>
                             <img className='w-[40px] h-[40px]' src='https://keralakaumudi.com/web-news/en/2023/09/NMAN0435859/image/vagamon.1694140764.jpg' alt=''/>
                         </td>
                         <td className='px-6 py-4'>Travel</td>
                         <td className='px-6 py-4'>You all must have Wa.</td>
                         <td className='px-6 py-4'>Jan 15, 2024</td>
                         <td className='px-6 py-4'>
                             <span className='px-2 py-[2px] bg-green-100 text-green-800 rounded-lg text-xs cursor-pointer'>active</span>
                         </td>
                         <td className='px-6 py-4'>
                             <div className='flex justify-start items-center gap-x-4 text-white'>
                                 <Link className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><FaEye/></Link>
                                 {/* <Link className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit/></Link>
                                 <div className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash/></div> */}
                             </div>
                         </td>
                     </tr>)
                       }
                    </tbody>
                </table>
            </div>
      </div>
    </div>
  )
}

export default AdminIndex