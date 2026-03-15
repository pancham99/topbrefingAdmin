import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ page, pages, parPage, setPage, setPerPage }) => {

  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (

    <div className="flex items-center justify-between px-10 py-4">

      {/* Per Page */}
      <div className="flex items-center gap-3">

        <p className="text-sm font-semibold"> Page No. {page}</p>

      </div>

      {/* Page Buttons */}
      <div className="flex items-center gap-2">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          <IoIosArrowBack />
        </button>

        {pageNumbers.map((p) => (

          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 rounded ${
              page === p
                ? "bg-green-500 text-white"
                : "bg-gray-100"
            }`}
          >
            {p}
          </button>

        ))}

        <button
          disabled={page === pages}
          onClick={() => setPage(page + 1)}
        >
          <IoIosArrowForward />
        </button>

      </div>

      <p className="text-sm font-semibold">
        Page {page} of {pages}
      </p>

    </div>

  );
};

export default Pagination;