import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { base_url } from '../../config/config';
import storeContext from '../../context/storeContext';
import axios from 'axios';

import NewContent from '../components/NewContent'



const WriterIndex = () => {
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
 <div className='mt-3'>
      <div className='grid grid-cols-4 gap-x-4'>

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

        {/* <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700'>
          <span className='text-xl font-bold'>50</span>
          <span>Writer</span>
        </div> */}
      </div>

        <NewContent />
    </div>
  )
}

export default WriterIndex