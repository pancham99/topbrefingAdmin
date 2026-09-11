import { useContext } from 'react';
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import storeContext from '../../context/storeContext';
import { convert } from 'html-to-text';
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import {
  useGetBanners,
  useUpdateBannerStatusMutation,
  useDeleteBannerMutation,
} from '../../hooks/api/useBannerQueries';

const BannerContent = () => {
  const { store } = useContext(storeContext);
  const { data, isLoading } = useGetBanners();
  const news = data?.banners || [];

  const updateStatusMutation = useUpdateBannerStatusMutation({
    onSuccess: (resData) => {
      toast.success(resData?.message || "Banner status updated successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message || "Failed to update status");
    },
  });

  const deleteBannerMutation = useDeleteBannerMutation({
    onSuccess: (resData) => {
      toast.success(resData?.message || "Banner deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message || "Failed to delete banner");
    },
  });

  const update_status = ({ _id, status }) => {
    updateStatusMutation.mutate({ _id, status });
  };

  const delete_banner = (_id) => {
    if (!_id) return toast.error("Invalid banner ID");
    deleteBannerMutation.mutate(_id);
  };

  return (
    <div>
      <div className='relative overflow-x-auto p-4'>
        <table className='w-full text-sm text-left text-slate-600'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th className='px-7 py-3'>No</th>
              <th className='px-7 py-3'>Title</th>
              <th className='px-7 py-3'>Image</th>
              <th className='px-7 py-3'>Description</th>
              <th className='px-7 py-3'>Banner Type</th>
              <th className='px-7 py-3'>Device</th>
              <th className='px-7 py-3'>Status</th>
              <th className='px-7 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">Loading banners...</td>
              </tr>
            ) : news.length > 0 ? (
              news.map((n, i) => (
                <tr key={n._id || i} className='bg-white border-b'>
                  <td className='px-6 py-4'>{i + 1}</td>
                  <td className='px-6 py-4'>{n.title}...</td>
                  <td className='px-6 py-4'>
                    <img className='w-[40px] h-[40px] object-cover' src={n.image} alt={n.title} />
                  </td>

                  <td className='px-6 py-4'>{convert(n.description || "").slice(0, 15)}...</td>
                  <td className='px-6 py-4'>{n.bannertype}</td>

                  <td className='px-6 py-4'>{n.device}</td>
                  <td className='px-6 py-4'>
                    {n.status === 'pending' && (
                      <span
                        onClick={() => update_status({ _id: n._id, status: 'active' })}
                        className='px-2 py-[2px] bg-blue-100 text-blue-800 rounded-lg text-xs cursor-pointer'
                      >
                        {updateStatusMutation.isPending && updateStatusMutation.variables?._id === n._id ? 'Loading..' : n.status}
                      </span>
                    )}
                    {n.status === 'active' && (
                      <span
                        onClick={() => update_status({ _id: n._id, status: 'deactive' })}
                        className='px-2 py-[2px] bg-green-100 text-green-800 rounded-lg text-xs cursor-pointer'
                      >
                        {updateStatusMutation.isPending && updateStatusMutation.variables?._id === n._id ? 'Loading..' : n.status}
                      </span>
                    )}
                    {n.status === 'deactive' && (
                      <span
                        onClick={() => update_status({ _id: n._id, status: 'active' })}
                        className='px-2 py-[2px] bg-red-100 text-red-800 rounded-lg text-xs cursor-pointer'
                      >
                        {updateStatusMutation.isPending && updateStatusMutation.variables?._id === n._id ? 'Loading..' : n.status}
                      </span>
                    )}
                  </td>

                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-2'>
                      <button
                        disabled={deleteBannerMutation.isPending && deleteBannerMutation.variables === n._id}
                        onClick={() => delete_banner(n._id)}
                        className='p-[6px] rounded hover:shadow-lg hover:shadow-green-500/50'
                      >
                        <MdDelete className='text-red-600' size={24} />
                      </button>
                      {store?.userInfo?.role === 'writer' && (
                        <Link to={`/dashboard/news/edit/${n._id}`} className='p-[6px] bg-yellow-500 text-white rounded hover:shadow-lg hover:shadow-yellow-500/50'>
                          <FaEdit />
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">No banners found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BannerContent;