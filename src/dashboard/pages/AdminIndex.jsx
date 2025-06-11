import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { base_url } from '../../config/config';
import storeContext from '../../context/storeContext';
import axios from 'axios';
import DashboardGraph from '../components/DashboardGraph';

const AdminIndex = () => {
   const { store } = useContext(storeContext)
   const [all_news, set_all_news] = useState([])
   const [all_writes, set_all_writes] = useState([])
   console.log(all_writes, "all_writes")
  

      const get_news = async () => {
          try {
              const { data } = await axios.get(`${base_url}/api/news`, {
                  headers: {
                      'Authorization': `Bearer ${store.token}`
                  }
              })
  
              set_all_news(data.news)
              
          } catch (error) {
              console.log(error.message)
          }
      }

       const get_writes = async () => {
          try {
              const { data } = await axios.get(`${base_url}/api/news/writers`, {
                  headers: {
                      'Authorization': `Bearer ${store.token}`
                  }
              })
  
              set_all_writes(data.writers)
              
          } catch (error) {
              console.log(error.message)
          }
      }
  
      useEffect(() => {
          get_news()
          get_writes()
      }, [])


      const pendingNews = all_news.filter(news => news.status === "pending");
      const activeNews = all_news.filter(news => news.status === "active");
      const deactiveNews = all_news.filter(news => news.status === "deactive");

      
      const activeWriter = all_writes.filter(writer => writer.status === "active");
      const deactiveWriter = all_writes.filter(writer => writer.status === "deactive");

  return (
    <div className='lg:mt-3 mt-0 '>
      <div className='grid lg:grid-cols-5 lg:gap-x-4 gap-4 lg:gap-0 space-y-2 p-4'>

        <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700'>
          <span className='text-xl font-bold'>{all_news?.length}</span>
          <span>Total News</span>
        </div>

        <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700'>
          <span className='text-xl font-bold'>{pendingNews?.length}</span>
          <span>Pending News</span>
        </div>

        <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700'>
          <span className='text-xl font-bold'>{activeNews?.length}</span>
          <span>Active News</span>
        </div>

        <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700'>
          <span className='text-xl font-bold'>{deactiveNews?.length}</span>
          <span>Deactive News</span>
        </div>

        <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700'>
          <span className='text-xl font-bold'>{all_writes?.length}</span>
          <span>Writer</span>
        </div>

        <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700'>
          <span className='text-xl font-bold'>{activeWriter?.length}</span>
          <span>Active Writer</span>
        </div>


        <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700'>
          <span className='text-xl font-bold'>{deactiveWriter?.length}</span>
          <span>Deactive Writer</span>
        </div>
      </div>

      <DashboardGraph/>

    
    </div>
  )
}

export default AdminIndex