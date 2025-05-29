import React, {useContext} from 'react'
import storeContext from '../../context/storeContext'
import { MdMenu } from "react-icons/md";
import DisplayCartItem from '../components/DisplayCartItem';
import { useState } from 'react';

const Header = () => {
    const {store} = useContext(storeContext)

     const [openCartSection,setOpenCartSection] = useState(false)
    return (
        <div className='lg:pl-4 pl-0  lg:fixed lg:w-[calc(100vw-250px)] top-4 z-50 w-full'>
            <div className='w-full lg:px-0 px-2 rounded h-[70px] flex justify-between items-center lg:p-4 bg-white'>
                <input type='text' placeholder='search' className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' />

                <div className='lg:mr-4'>
                    <div className='lg:flex gap-x-2 hidden '>
                        <div className='flex flex-col justify-center items-end'>
                            <span>{store.userInfo.name}</span>
                            <span>{store.userInfo.role}</span>

                        </div>
                        <img className='w-[70px] h-[70px] rounded-full' src='https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg' alt=''/>
                    </div>
                    <button onClick={()=>setOpenCartSection(true)} className='lg:hidden text-3xl text-gray-500 cursor-pointer'>
                        <MdMenu/>
                    </button>
                </div>
            </div>

            {
            openCartSection && (
                <DisplayCartItem close={()=>setOpenCartSection(false)}/>
            )
        }
        </div>
    )
}

export default Header