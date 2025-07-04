
import { Link } from "react-router-dom"
import {useContext } from 'react'

import storeContext from '../../context/storeContext'
import VideoContent from '../components/VideoContents'

const Videos = () => {
    const { store } = useContext(storeContext)

    return (
        <div className='bg-white rounded-md'>
            <div className='flex justify-between p-4'>
                <h2 className='text-xl font-medium'>Video</h2>
                {
                    store.userInfo && store.userInfo.role === "admin" && <Link className='px-3 py-[6px] bg-red-500 rounded-md text-white hover:bg-red-600' to='/dashboard/createBanner'>Create Banner</Link>
                }
            </div>

            <VideoContent />


        </div>
    )
}

export default Videos