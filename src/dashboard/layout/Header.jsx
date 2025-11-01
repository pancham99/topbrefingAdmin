import { useState, useContext, useEffect } from 'react';
import storeContext from '../../context/storeContext'
import { MdMenu } from "react-icons/md";
import DisplayCartItem from '../components/DisplayCartItem';
import axios from 'axios';
import { base_url } from '../../config/config';

const Header = () => {
    const { store } = useContext(storeContext)

    const [profile, serProfile] = useState({});
  

    const get_profile = async () => {
        try {
            const { data } = await axios.get(
                `${base_url}/api/news/get_user`,
                {
                    headers: {
                        Authorization: `Bearer ${store.token}`,
                    },
                }
            );
            serProfile(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        get_profile();
    }, []);

    const [openCartSection, setOpenCartSection] = useState(false);
    // SCROLL DETECT LOGIC 
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    // 👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆

    return (
        <div className='lg:pl-4 pl-0  lg:fixed lg:w-[calc(100vw-250px)] top-0 z-50 w-full bg-red-600 text-white'>
            <div className={`w-full lg:px-0 px-2 rounded h-[70px] flex justify-between items-center lg:p-4 transition-colors duration-300 ${isScrolled ? 'bg-red-600 ' : ''}`}>
                <input type='text' placeholder='search' className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10 ml-5' />

                <div className='lg:mr-4'>
                    <div className='lg:flex gap-x-2 hidden '>
                        <div className='flex flex-col justify-center items-end'>
                            <span>{store.userInfo.name}</span>
                            <span>{store.userInfo.role}</span>
                        </div>
                        <img
                            className='w-12 h-12 bg-contain rounded-full'
                            src={profile?.user?.image || '/logo.png'}
                            alt=''
                        />
                    </div>
                    <button onClick={() => setOpenCartSection(true)} className='lg:hidden text-3xl text-gray-500 cursor-pointer'>
                        <MdMenu />
                    </button>
                </div>
            </div>

            {openCartSection && (
                <DisplayCartItem close={() => setOpenCartSection(false)}/>
            )}
        </div>
    )
}

export default Header;
