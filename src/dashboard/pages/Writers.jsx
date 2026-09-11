import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';
import {
  useGetWriters,
  useUpdateWriterStatusMutation,
  useDeleteWriterMutation,
} from '../../hooks/api/useAuthQueries';

const Writers = () => {
  const { data, isLoading } = useGetWriters();
  const writers = data?.writers || [];

  const updateStatusMutation = useUpdateWriterStatusMutation({
    onSuccess: (resData) => {
      toast.success(resData?.message || "Status updated successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message || "Action failed");
    },
  });

  const deleteWriterMutation = useDeleteWriterMutation({
    onSuccess: () => {
      toast.success("Writer deleted successfully!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete writer");
    },
  });

  const update_status = (status, user_id) => {
    updateStatusMutation.mutate({ id: user_id, status });
  };

  const delete_writers = (user_id) => {
    if (!user_id) return toast.error("Invalid writer ID");
    deleteWriterMutation.mutate(user_id);
  };

  return (
    <div className='bg-white rounded-md'>
      <div className='flex justify-between p-4'>
        <h2 className='text-xl font-medium'>Writers</h2>
        <Link className='px-3 py-[6px] bg-red-500 rounded-md text-white hover:bg-red-600' to='/dashboard/writer/add'>Add Writer</Link>
      </div>

      <div className='relative overflow-x-auto p-4'>
        <table className='w-full text-sm text-left text-slate-600'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th className='px-7 py-3'>No</th>
              <th className='px-7 py-3'>Reporter Name</th>
              <th className='px-7 py-3'>Category</th>
              <th className='px-7 py-3'>Role</th>
              <th className='px-7 py-3'>Image</th>
              <th className='px-7 py-3'>Email</th>
              <th className='px-7 py-3'>Active</th>
              <th className='px-7 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">Loading writers...</td>
              </tr>
            ) : writers.length > 0 ? (
              writers.map((r, i) => (
                <tr key={r._id || i} className='bg-white border-b'>
                  <td className='px-6 py-4'>{i + 1}</td>
                  <td className='px-6 py-4'>{r.name}</td>
                  <td className='px-6 py-4'>{r.category}</td>
                  <td className='px-6 py-4'>{r.role}</td>
                  <td className='px-6 py-4'>
                    <img className='w-[40px] h-[40px] rounded-full object-cover' src={r.image} alt={r.name} />
                  </td>
                  <td className='px-6 py-4'>{r.email}</td>
                  <td className='px-6 py-4'>
                    <div className='flex justify-start items-center gap-x-4 text-white'>
                      {r.status === 'active' && (
                        <span
                          onClick={() => update_status('deactive', r._id)}
                          className='px-2 py-[2px] bg-green-100 text-green-800 rounded-lg text-xs cursor-pointer'
                        >
                          {updateStatusMutation.isPending && updateStatusMutation.variables?.id === r._id ? 'Loading..' : r.status}
                        </span>
                      )}

                      {r.status === 'deactive' && (
                        <span
                          onClick={() => update_status('active', r._id)}
                          className='px-2 py-[2px] bg-red-100 text-red-800 rounded-lg text-xs cursor-pointer'
                        >
                          {updateStatusMutation.isPending && updateStatusMutation.variables?.id === r._id ? 'Loading..' : r.status}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className='px-6 py-4'>
                    <button
                      disabled={deleteWriterMutation.isPending && deleteWriterMutation.variables === r._id}
                      onClick={() => delete_writers(r._id)}
                      className='p-[6px] rounded hover:shadow-lg hover:shadow-green-500/50'
                    >
                      <MdDelete className='text-red-600' size={28} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">No writers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Writers;