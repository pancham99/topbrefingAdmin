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


const DeactiveContent = () => {

    const { store } = useContext(storeContext)
    const [news, setNews] = useState([])
    console.log(news, "news")


     const get_video = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/news/deactive_news`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            setNews(data?.data || []);
            // console.log(data.data, "video data")
        } catch (error) {
            console.log(error.message)
        }
    }





    useEffect(() => {
        get_video()


    }, [])




 

    




    return (
        <div>
            henws

        </div>
    )
}

export default DeactiveContent