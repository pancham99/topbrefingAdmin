import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import {
  useGetVideos,
  useUpdateVideoStatusMutation,
  useDeleteVideoMutation,
} from '../../hooks/api/useVideoQueries';

const VideoContents = () => {
  const { data, isLoading } = useGetVideos();
  const video = data?.data || [];

  const updateStatusMutation = useUpdateVideoStatusMutation({
    onSuccess: (resData) => {
      toast.success(resData?.message || "Status updated successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message || "Failed to update status");
    },
  });

  const deleteVideoMutation = useDeleteVideoMutation({
    onSuccess: (resData) => {
      toast.success(resData?.message || "Video deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message || "Failed to delete video");
    },
  });

  const update_status = ({ _id, status }) => {
    updateStatusMutation.mutate({ _id, status });
  };

  const delete_video = (_id) => {
    if (!_id) return toast.error("Invalid video ID");
    deleteVideoMutation.mutate(_id);
  };

  return (
    <div>
      <div className='relative overflow-x-auto p-4'>
        <table className='w-full text-sm text-left text-slate-600'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th className='px-7 py-3'>No</th>
              <th className='px-7 py-3'>Title</th>
              <th className='px-7 py-3'>Video</th>
              <th className='px-7 py-3'>Videotype</th>
              <th className='px-7 py-3'>Status</th>
              <th className='px-7 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">Loading videos...</td>
              </tr>
            ) : video.length > 0 ? (
              video.map((n, i) => (
                <tr key={n._id || i} className='bg-white border-b'>
                  <td className='px-6 py-4'>{i + 1}</td>
                  <td className='px-6 py-4'>{n.title}...</td>
                  <td className='px-6 py-4'>
                    <video
                      className="w-[40px] h-[40px] object-cover rounded"
                      src={n.videos}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </td>
                  <td className='px-6 py-4'>{n.videotype}</td>
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
                    <button
                      disabled={deleteVideoMutation.isPending && deleteVideoMutation.variables === n._id}
                      onClick={() => delete_video(n._id)}
                      className='p-[6px] rounded hover:shadow-lg hover:shadow-green-500/50'
                    >
                      <MdDelete className='text-red-600' size={28} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">No videos found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VideoContents;