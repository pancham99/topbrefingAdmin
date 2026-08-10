import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { base_url } from "../../config/config";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import storeContext from "../../context/storeContext";

const Subscribers = () => {
  const { store } = useContext(storeContext);
  const [subscribers, setSubscribers] = useState([]);
  const [pushCount, setPushCount] = useState(0);
  const [emailCount, setEmailCount] = useState(0);

  // ✅ Get all subscribers
  const getSubscribers = async () => {
    try {
      const { data } = await axios.get(`${base_url}/get/subscribers`, {
        headers: {
          Authorization: `Bearer ${store?.token}`,
        },
      });

      setSubscribers(data.subscribers || []);
      setPushCount(data.pushSubscriberCount || 0);
      setEmailCount(data.emailSubscriberCount || 0);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      toast.error("Failed to fetch subscribers");
    }
  };

  // ✅ Delete subscriber
  const deleteSubscriber = async (id) => {
    try {
      if (!id) return toast.error("Invalid subscriber ID");

      await axios.delete(`${base_url}/api/subscribers/${id}`, {
        headers: {
          Authorization: `Bearer ${store?.token}`,
        },
      });

      toast.success("Subscriber deleted successfully");
      getSubscribers();
    } catch (error) {
      console.error("Delete failed:", error?.response?.data?.message || error.message);
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    getSubscribers();
  }, []);

  return (
    <div className="bg-white rounded-md space-y-3">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-gray-100 gap-3">
        <div>
          <h2 className="text-xl font-medium">Subscribers</h2>
          <p className="text-xs text-gray-500">Manage email & web push subscribers</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200 font-semibold">
            Email: {emailCount}
          </span>
          <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200 font-semibold">
            Web Push: {pushCount}
          </span>
        </div>
      </div>

      <div className="relative overflow-x-auto p-4">
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-7 py-3">No</th>
              <th className="px-7 py-3">Email / Device</th>
              <th className="px-7 py-3">Subscription Type</th>
              <th className="px-7 py-3">Subscribed Date</th>
              <th className="px-7 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.length > 0 ? (
              subscribers.map((s, i) => (
                <tr key={s._id} className="bg-white border-b">
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{s.email || "Browser Device Subscriber"}</p>
                    {s.deviceInfo?.platform && (
                      <p className="text-[11px] text-gray-400">{s.deviceInfo.platform}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {s.email && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-700">
                          Email
                        </span>
                      )}
                      {s.fcmToken && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-700">
                          Web Push
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteSubscriber(s._id)}
                      className="p-[6px] rounded hover:shadow-lg hover:shadow-red-500/50"
                    >
                      <MdDelete className="text-red-600" size={24} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No subscribers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subscribers;
