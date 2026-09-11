import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { useGetSubscribers, useDeleteSubscriberMutation } from "../../hooks/api/useSubscriberQueries";

const Subscribers = () => {
  const { data, isLoading } = useGetSubscribers();
  const subscribers = data?.subscribers || [];
  const pushCount = data?.pushSubscriberCount || 0;
  const emailCount = data?.emailSubscriberCount || 0;

  const deleteSubscriberMutation = useDeleteSubscriberMutation({
    onSuccess: () => {
      toast.success("Subscriber deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message || "Delete failed");
    },
  });

  const deleteSubscriber = (id) => {
    if (!id) return toast.error("Invalid subscriber ID");
    deleteSubscriberMutation.mutate(id);
  };

  const parseUserAgent = (ua, platform) => {
    if (!ua) return platform || "Unknown Device";
    
    let browser = "";
    if (/edg/i.test(ua)) browser = "Edge";
    else if (/chrome|crios/i.test(ua) && !/opr|opera/i.test(ua)) browser = "Chrome";
    else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) browser = "Safari";
    else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
    else if (/opr|opera/i.test(ua)) browser = "Opera";
    else browser = "Browser";

    let os = "";
    const androidMatch = ua.match(/Android\s+([0-9\.]+)/i);
    const iosMatch = ua.match(/(iPhone|iPad|iPod).*?OS\s+([0-9_]+)/i);
    const winMatch = ua.match(/Windows NT\s+([0-9\.]+)/i);
    const macMatch = ua.match(/Mac OS X\s+([0-9_]+)/i);

    if (androidMatch) {
      os = `Android ${androidMatch[1]}`;
    } else if (iosMatch) {
      os = `iOS ${iosMatch[2].replace(/_/g, ".")}`;
    } else if (winMatch) {
      const winVerMap = { "10.0": "10/11", "6.3": "8.1", "6.2": "8", "6.1": "7" };
      os = `Windows ${winVerMap[winMatch[1]] || winMatch[1]}`;
    } else if (macMatch) {
      os = `macOS ${macMatch[1].replace(/_/g, ".")}`;
    } else if (/Linux/i.test(ua)) {
      os = "Linux";
    } else {
      os = platform || "PC";
    }

    return `${browser} on ${os}`.trim();
  };

  const getDeviceBadge = (deviceInfo) => {
    if (!deviceInfo?.platform && !deviceInfo?.userAgent) return null;
    const platform = deviceInfo.platform || "";
    const ua = deviceInfo.userAgent || "";
    const isMobile = deviceInfo.isMobile || /Mobi|Android|iPhone|iPad|iPod|armv|aarch/i.test(platform + " " + ua);
    const exactInfo = parseUserAgent(ua, platform);

    if (isMobile) {
      return (
        <span 
          title={ua || platform}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 mt-1 shadow-sm cursor-help"
        >
          📱 Mobile • {exactInfo}
        </span>
      );
    }
    return (
      <span 
        title={ua || platform}
        className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200 mt-1 shadow-sm cursor-help"
      >
        💻 Desktop • {exactInfo}
      </span>
    );
  };

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
              <th className="px-5 py-3">No</th>
              <th className="px-5 py-3">Subscriber / Device</th>
              <th className="px-5 py-3">OS & Browser</th>
              <th className="px-5 py-3">IP & Location</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Subscribed Date</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  Loading subscribers...
                </td>
              </tr>
            ) : subscribers.length > 0 ? (
              subscribers.map((s, i) => (
                <tr key={s._id} className="bg-white border-b hover:bg-slate-50/50 transition">
                  <td className="px-5 py-4 font-medium text-slate-400">{i + 1}</td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-gray-800">
                      {s.email || s.deviceInfo?.deviceName || "Browser Device"}
                    </p>
                    {s.email && s.deviceInfo?.deviceName && (
                      <p className="text-xs text-slate-500 mt-0.5">{s.deviceInfo.deviceName}</p>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {getDeviceBadge(s.deviceInfo)}
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-xs font-mono text-slate-700 font-medium">
                      {s.ip || "—"}
                    </p>
                    {(s.location || s.city || s.country) && (
                      <p className="text-[11px] text-emerald-700 font-medium mt-0.5 flex items-center gap-1">
                        📍 {s.location || [s.city, s.region, s.country].filter(Boolean).join(", ")}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      {s.email && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                          Email
                        </span>
                      )}
                      {s.fcmToken && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-700 border border-amber-200">
                          Web Push
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-500">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      disabled={deleteSubscriberMutation.isPending && deleteSubscriberMutation.variables === s._id}
                      onClick={() => deleteSubscriber(s._id)}
                      className="p-[6px] rounded hover:bg-red-50 text-red-600 hover:text-red-700 transition"
                      title="Delete Subscriber"
                    >
                      <MdDelete size={22} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
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
