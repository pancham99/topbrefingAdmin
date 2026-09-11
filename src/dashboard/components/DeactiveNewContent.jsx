import { useContext, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import storeContext from '../../context/storeContext';
import { convert } from 'html-to-text';
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import {
  useGetNews,
  useDeleteNewsMutation,
  useUpdateNewsStatusMutation,
} from '../../hooks/api/useNewsQueries';
import { useGetWriters } from '../../hooks/api/useAuthQueries';

const DeactiveNewContent = () => {
  const { store } = useContext(storeContext);
  const [parPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const { data: newsData, isLoading } = useGetNews(`status=deactive&page=${page}&limit=${parPage}`);
  const Deactives = newsData?.news || [];
  const totalPages = newsData?.pages || 1;
  const totalItems = newsData?.total || 0;

  const { data: writersData } = useGetWriters();
  const writers = writersData?.writers || [];

  const deleteNewsMutation = useDeleteNewsMutation({
    onSuccess: () => {
      toast.success('News deleted');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Delete failed');
    },
  });

  const updateStatusMutation = useUpdateNewsStatusMutation({
    onSuccess: (data) => {
      toast.success(data?.message || 'Status updated');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Status update failed');
    },
  });

  const delete_news = (news_id) => {
    if (!news_id) return;
    deleteNewsMutation.mutate(news_id);
  };

  const update_status = (status, news_id) => {
    updateStatusMutation.mutate({ id: news_id, status });
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
              <th className='px-7 py-3'>Category</th>
              <th className='px-7 py-3'>Description</th>
              <th className='px-7 py-3'>Date</th>
              <th className='px-7 py-3'>Status</th>
              <th className='px-7 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">Loading deactivated news...</td>
              </tr>
            ) : Deactives.length > 0 ? (
              Deactives.map((n, i) => (
                <tr key={n._id || i} className='bg-white border-b'>
                  <td className='px-6 py-4'>{(page - 1) * parPage + i + 1}</td>
                  <td className='px-6 py-4'>{n.title?.slice(0, 15)}...</td>
                  <td className='px-6 py-4'>
                    <img className='w-[40px] h-[40px] object-cover rounded' src={n.image} alt='' />
                  </td>
                  <td className='px-6 py-4'>{n.category}</td>
                  <td className='px-6 py-4'>{convert(n.description || "").slice(0, 15)}...</td>
                  <td className='px-6 py-4'>{n.date || new Date(n.createdAt).toLocaleDateString()}</td>
                  <td className='px-6 py-4'>
                    {store?.userInfo?.role === 'admin' ? (
                      <span
                        onClick={() => update_status(n.status === 'active' ? 'deactive' : 'active', n._id)}
                        className='px-2 py-[2px] bg-red-100 text-red-800 rounded-lg text-xs cursor-pointer'
                      >
                        {updateStatusMutation.isPending && updateStatusMutation.variables?.id === n._id ? 'Loading..' : n.status}
                      </span>
                    ) : (
                      <span className='px-2 py-[2px] bg-red-100 text-red-800 rounded-lg text-xs cursor-pointer'>{n.status}</span>
                    )}
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-2'>
                      <button
                        disabled={deleteNewsMutation.isPending && deleteNewsMutation.variables === n._id}
                        onClick={() => delete_news(n._id)}
                        className='p-[6px] rounded hover:shadow-lg hover:shadow-red-500/50'
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
                <td colSpan="8" className="text-center py-6 text-gray-500">No deactivated news found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeactiveNewContent;