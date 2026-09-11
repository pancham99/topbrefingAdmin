import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { convert } from 'html-to-text';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  useGetAdvertisements,
  useUpdateAdvertisementStatusMutation,
  useDeleteAdvertisementMutation,
} from '../../hooks/api/useAdvertisementQueries';

const AdvertisementContent = () => {
  const { data: advertisementsData, isLoading } = useGetAdvertisements();
  const advertisements = Array.isArray(advertisementsData) ? advertisementsData : advertisementsData?.advertisements || [];

  const updateStatusMutation = useUpdateAdvertisementStatusMutation({
    onSuccess: () => {
      toast.success("Status updated successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message || "Status update failed");
    },
  });

  const deleteMutation = useDeleteAdvertisementMutation({
    onSuccess: () => {
      toast.success("Advertisement deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message || "Delete failed");
    },
  });

  const deleteHandler = (_id) => {
    if (!_id) return;
    deleteMutation.mutate(_id);
  };

  const update_status = ({ _id, status }) => {
    updateStatusMutation.mutate({ _id, status });
  };

  return (
    <div className="p-4">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Video</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Banner Type</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">Expire Date</th>
              <th className="px-4 py-2">Page Target</th>
              <th className="px-4 py-2">Priority</th>
              <th className="px-4 py-2">Device</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="16" className="text-center py-6 text-gray-500">
                  Loading advertisements...
                </td>
              </tr>
            ) : advertisements.length > 0 ? (
              advertisements.map((n, i) => (
                <tr key={n._id || i} className="bg-white border-b text-xs items-center text-center hover:bg-gray-50">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{n.companyName}</td>
                  <td className="px-4 py-2">{n.title}</td>
                  <td className="px-4 py-2">{n.amount} ₹</td>
                  <td className="px-4 py-2">{n.locationTarget}</td>
                  <td className="px-4 py-2">
                    {n.image && <img src={n.image} alt="ad" className="w-8 h-8 object-cover rounded" />}
                  </td>
                  <td className="px-4 py-2">
                    {n.video ? <a href={n.video} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View</a> : 'N/A'}
                  </td>
                  <td className="px-4 py-2">{convert(n.description || "").slice(0, 20)}...</td>
                  <td className="px-4 py-2">{n.bannerType}</td>
                  <td className="px-4 py-2">{n.startDate ? moment(n.startDate).tz("Asia/Kolkata").format("D/M/YYYY") : '—'}</td>
                  <td className="px-4 py-2">{n.expireAt ? moment(n.expireAt).tz("Asia/Kolkata").format("D/M/YYYY") : '—'}</td>
                  <td className="px-4 py-2">{n.pageTarget}</td>
                  <td className="px-4 py-2">{n.priority}</td>
                  <td className="px-4 py-2">{n.deviceTarget}</td>
                  <td className="px-4 py-2">
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
                  <td className="px-4 py-2">
                    <div className="flex justify-center items-center gap-2">
                      <Link to={`/dashboard/advertisement_edit/${n._id}`} className="text-yellow-600 hover:text-yellow-800">
                        <FaEdit size={18} />
                      </Link>
                      <button
                        disabled={deleteMutation.isPending && deleteMutation.variables === n._id}
                        onClick={() => deleteHandler(n._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="16" className="text-center py-6 text-gray-500">
                  No advertisements found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvertisementContent;
