import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { HiOutlineNewspaper } from 'react-icons/hi2';
import NewContent from '../components/NewContent';
import storeContext from '../../context/storeContext';

const News = () => {
  const { store } = useContext(storeContext);
  const isWriter = store.userInfo?.role !== 'admin';

  return (
    <div className="space-y-4">

      {/* page header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <HiOutlineNewspaper className="text-blue-600" size={18} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">All Articles</h1>
            <p className="text-xs text-gray-400">Manage, filter and update news</p>
          </div>
        </div>

        {isWriter && (
          <Link
            to="/dashboard/news/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white
                       text-sm font-medium rounded-lg hover:bg-purple-700 transition"
          >
            <FiPlus size={16} />
            Create Article
          </Link>
        )}
      </div>

      {/* table card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <NewContent />
      </div>

    </div>
  );
};

export default News;
