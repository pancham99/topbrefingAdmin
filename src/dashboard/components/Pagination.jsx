import PropTypes from "prop-types";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ page, totalItem, limit = 20, setPage }) => {
  // Calculate total pages from total items
  const pages = Math.ceil(totalItem / limit);

  const getPageNumbers = () => {
    const totalVisible = 5; // Show only 5 page buttons
    const pageNumbers = [];

    let start = Math.max(1, page - 2);
    let end = Math.min(pages, start + totalVisible - 1);

    // Adjust start if we're near the end
    if (end - start < totalVisible - 1) {
      start = Math.max(1, end - totalVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  if (pages <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {/* Previous */}
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          <IoIosArrowBack />
        </button>

        {/* First Page */}
        {pageNumbers[0] > 1 && (
          <>
            <button
              onClick={() => setPage(1)}
              className={`w-10 h-10 rounded-full font-semibold ${
                page === 1
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              1
            </button>

            {pageNumbers[0] > 2 && (
              <span className="text-gray-500">...</span>
            )}
          </>
        )}

        {/* Middle Pages */}
        {pageNumbers.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`w-10 h-10 rounded-full font-semibold transition-all ${
              page === p
                ? "bg-red-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {p}
          </button>
        ))}

        {/* Last Page */}
        {pageNumbers[pageNumbers.length - 1] < pages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < pages - 1 && (
              <span className="text-gray-500">...</span>
            )}

            <button
              onClick={() => setPage(pages)}
              className={`w-10 h-10 rounded-full font-semibold ${
                page === pages
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {pages}
            </button>
          </>
        )}

        {/* Next */}
        <button
          disabled={page === pages}
          onClick={() => setPage(page + 1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          <IoIosArrowForward />
        </button>
      <div className="text-sm text-gray-500">
        Showing page <strong>{page}</strong> of{" "}
        <strong>{pages}</strong> | Total Items:{" "}
        <strong>{totalItem}</strong>
      </div>
      </div>

      {/* Info */}
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalItem: PropTypes.number.isRequired,
  limit: PropTypes.number,
  setPage: PropTypes.func.isRequired,
};

export default Pagination;