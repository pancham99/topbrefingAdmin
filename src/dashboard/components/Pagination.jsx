import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// const name = "MADHUSUDAN".split("");
const name = "TOPBREFING".split("");

const Pagination = ({ page, pages, setPage }) => {

  const getPageNumbers = () => {
    const totalVisible = name.length; // 10 letters
    const pagesArr = [];

    let start = Math.max(1, page - Math.floor(totalVisible / 2));
    let end = start + totalVisible - 1;

    if (end > pages) {
      end = pages;
      start = Math.max(1, end - totalVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pagesArr.push(i);
    }

    return pagesArr;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 py-6 flex-wrap">

      {/* Prev */}
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="p-2 rounded bg-gray-100 disabled:opacity-50"
      >
        <IoIosArrowBack />
      </button>

      {/* First page */}
      {pageNumbers[0] > 1 && (
        <>
          <button
            onClick={() => setPage(1)}
            className="px-3 py-1 bg-gray-100 rounded"
          >
            1
          </button>

          {pageNumbers[0] > 2 && (
            <span className="px-2 text-gray-500">...</span>
          )}
        </>
      )}

      {/* Letters (Mapped Pages) */}
      {pageNumbers.map((p, index) => {
        const letter = name[index % name.length];

        return (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 rounded-full font-bold ${
              page === p
                ? "bg-red-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {letter}
          </button>
        );
      })}

      {/* Last page */}
      {pageNumbers[pageNumbers.length - 1] < pages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < pages - 1 && (
            <span className="px-2 text-red-500">...</span>
          )}

          <button
            onClick={() => setPage(pages)}
            className="px-3 py-1 text-white bg-red-600 rounded"
          >
            {pages}
          </button>
        </>
      )}

      {/* Next */}
      <button
        disabled={page === pages}
        onClick={() => setPage(page + 1)}
        className="p-2 rounded bg-gray-100 disabled:opacity-50"
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;