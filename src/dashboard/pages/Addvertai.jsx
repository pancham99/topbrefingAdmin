import React, { useRef, useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import storeContext from '../../context/storeContext'
import AdvertisementContent from '../components/AdvertisementContent'

const Addvertai = () => {
    const { store } = useContext(storeContext)

    return (
        <div className='bg-white rounded-md'>
            <div className='flex justify-between p-4'>
                <h2 className='text-xl font-medium'>Advertisement</h2>
                {
                    store.userInfo && store.userInfo.role === "admin" && <Link className='px-3 py-[6px] bg-red-500 rounded-md text-white hover:bg-red-600' to='/dashboard/createAdvertisement'>Create Advertisement</Link>
                }
            </div>

            <AdvertisementContent />


            <div>
                <div className='p-4'>
                    <h3 className='text-lg font-semibold'>Dear Admin</h3>
                    <p className='text-gray-500'>
                        The system is currently under development, so certain functionalities may not be working as expected. We appreciate your understanding.</p>
                </div>
            </div>


        </div>
    )
}

export default Addvertai