import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base_url } from '../../config/config';
import storeContext from '../../context/storeContext';
import axios from 'axios';
import DashboardGraph from '../components/DashboardGraph';
import SkeletonBox from '../components/SkeletonBox';  

const AdminIndex = () => {
  const { store } = useContext(storeContext);
  const [loading, setLoading] = useState(true);  
  const [total, setTotalNews] = useState({});

   const get_total = async () => {
    try {

      setLoading(true);

      const { data } = await axios.get(`${base_url}/api/dashboard`, {
        headers: {
          Authorization: `Bearer ${store.token}`
        }
      });
console.log(data, "API", data);
      setTotalNews(data);

    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
     get_total();
  }, []);





  return (
    <div className='lg:mt-3 mt-0'>
      {loading ? <SkeletonBox /> :
        <div className='grid lg:grid-cols-5 lg:gap-x-4 gap-4 lg:gap-0 space-y-2 items-center'>
          {/* Total News */}
          <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700 shadow-md border'>
            <span className='text-xl font-bold'>{total?.totalNews}</span>
            <span>Total News</span>
          </div>

          {/* Pending News */}
          <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700 shadow-md border'>
            <span className='text-xl font-bold'>{total?.pendingNews}</span>
            <span>Pending News</span>
          </div>

          {/* Active News */}
          <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700 shadow-md border'>
            <span className='text-xl font-bold'>{total?.activeNews}</span>
            <span>Active News</span>
          </div>

          {/* Deactive News */}
          <Link to="/dashboard/deactive" className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700 shadow-md border'>
            <span className='text-xl font-bold'>{total?.deactiveNews}</span>
            <span>Deactive News</span>
          </Link>

          {/* Total Writer */}
          <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700 shadow-md border'>
            <span className='text-xl font-bold'>{total?.totalWriter}</span>
            <span>Writer</span>
          </div>

          {/* Active Writer */}

          <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700 shadow-md border'>
            <span className='text-xl font-bold'>{total?.activeWriter}</span>
            <span>Active Writer</span>
          </div>

          {/* Deactive Writer */}
          <div className='w-full p-8 flex justify-center flex-col rounded-md items-center gap-y-2 bg-white text-slate-700 shadow-md border'>
            <span className='text-xl font-bold'>{total?.deactiveWriter}</span>
            <span>Deactive Writer</span>
          </div>
        </div>
      }
      
        <DashboardGraph item={total} loading={loading}/>
    
    </div>
  );
}

export default AdminIndex;
