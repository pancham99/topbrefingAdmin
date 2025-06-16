import React, { useRef, useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import NewContent from '../components/NewContent'

import storeContext from '../../context/storeContext'
import BannerContent from '../components/BannerContent'

const Banner = () => {
    const { store } = useContext(storeContext)

    return (
        <div className='bg-white rounded-md'>
            <div className='flex justify-between p-4'>
                <h2 className='text-xl font-medium'>Banner</h2>
                {
                    store.userInfo && store.userInfo.role === "admin" && <Link className='px-3 py-[6px] bg-red-500 rounded-md text-white hover:bg-red-600' to='/dashboard/createBanner'>Create Banner</Link>
                }
            </div>

            <BannerContent />


        </div>
    )
}

export default Banner