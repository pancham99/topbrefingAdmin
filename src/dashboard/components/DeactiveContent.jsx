import { useGetNews } from '../../hooks/api/useNewsQueries';

const DeactiveContent = () => {
  const { data, isLoading } = useGetNews('status=deactive');
  const deactiveNews = data?.news || [];

  return (
    <div className="p-4">
      {isLoading ? (
        <p className="text-gray-500">Loading deactivated content...</p>
      ) : deactiveNews.length === 0 ? (
        <p className="text-gray-500">No deactivated news found.</p>
      ) : (
        <div className="space-y-2">
          {deactiveNews.map((n) => (
            <div key={n._id} className="p-3 border rounded bg-white">
              <h3 className="font-semibold text-gray-800">{n.title}</h3>
              <p className="text-xs text-gray-500">{n.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeactiveContent;