import React, { useRef, useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import NewContent from '../components/NewContent'

import storeContext from '../../context/storeContext'
import DeactiveNewContent from '../components/DeactiveNewContent'

const Deactive = () => {
    const { store } = useContext(storeContext)

    return (
        <div className='bg-white rounded-md'>
            <div className='flex justify-between p-4'>
                <h2 className='text-xl font-medium'>Deactive</h2>
                {
                    store.userInfo && store.userInfo.role !== "admin" && <Link className='px-3 py-[6px] bg-purple-500 rounded-md text-white hover:bg-purple-600' to='/dashboard/news/create'>Create News</Link>
                }
            </div>

            <DeactiveNewContent />


        </div>
    )
}

export default Deactive