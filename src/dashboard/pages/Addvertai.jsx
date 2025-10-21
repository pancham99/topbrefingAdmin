import  {  useContext} from 'react'
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

        </div>
    )
}

export default Addvertai