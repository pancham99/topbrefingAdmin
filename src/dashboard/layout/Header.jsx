import { useState, useContext, useEffect } from 'react';
import storeContext from '../../context/storeContext';
import DisplayCartItem from '../components/DisplayCartItem';
import { useGetProfile } from '../../hooks/api/useAuthQueries';

const Header = () => {
  const { store } = useContext(storeContext);
  const { data: profile } = useGetProfile();

  const [openCartSection, setOpenCartSection] = useState(false);
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

  return (
    <div className='lg:pl-4 pl-0 lg:fixed lg:w-[calc(100vw-250px)] top-0 z-50 w-full bg-red-600 text-white'>
      <div className={`w-full lg:px-0 px-2 rounded h-[70px] flex justify-between items-center lg:p-4 transition-colors duration-300 ${isScrolled ? 'bg-red-600 ' : ''}`}>
        <input type='text' placeholder='search' className='px-3 py-2 ml-5 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' />

        <div className='lg:mr-4'>
          <div className='lg:flex items-center gap-x-2 hidden '>
            <div className='flex flex-col justify-center items-end'>
              <span>{profile?.user?.name || store?.userInfo?.name}</span>
              <span>{profile?.user?.role || store?.userInfo?.role}</span>
            </div>
            <img
              className='h-24  rounded-full object-cover'
              src={(profile?.user?.image && profile.user.image.trim() !== '') ? profile.user.image : (store?.userInfo?.image || '/topbrefing-mobile.png')}
              alt='ladmin-logo'
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/topbrefing-mobile.png';
              }}
            />
          </div>
        </div>
      </div>

      {openCartSection && (
        <DisplayCartItem close={() => setOpenCartSection(false)} />
      )}
    </div>
  );
};

export default Header;
