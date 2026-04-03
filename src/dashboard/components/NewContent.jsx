import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo
} from "react";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../config/config";
import storeContext from "../../context/storeContext";
import toast from "react-hot-toast";

import FillterStatus from "./fillter/FillterStatus";
import FillterCategory from "./fillter/FillterCategory";
import FillterWriters from "./fillter/FillterWriters";
import Pagination from "./Pagination";

import moment from "moment-timezone";
import FilterDate from "./fillter/FilterDate";
import FilterType from "./fillter/FilterType";


import {
  fetchNews,
  fetchWriters,
  deleteNews,
  updateNewsStatus,
  updateNewsType
} from "../../services/newsService";

const NewContent = () => {

  const { store } = useContext(storeContext);
  const [news, setNews] = useState([]);
  const [writers, setWriters] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [parPage, setPerPage] = useState(20);
  const [pages, setPages] = useState(0);

  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [writer, setWriter] = useState("");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");


  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Query Builder
  const query = useMemo(() => {

    return new URLSearchParams({
      page,
      limit: parPage,
      status,
      category,
      writerName: writer,
      search: debouncedSearch,
      startDate,
      endDate,
      type
    }).toString();

  }, [
    page,
    parPage,
    status,
    category,
    writer,
    debouncedSearch,
    startDate,
    endDate,
    type
  ]);

  // Fetch News
  const getNews = useCallback(async () => {

    try {

      setLoading(true);

      const { data } = await fetchNews(query, store.token);
      setNews(data.news);
      setPages(data.pages);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }, [query, store.token]);

  // Fetch Writers
  const getWriters = useCallback(async () => {

    try {

      const { data } = await fetchWriters(store.token);

      setWriters(data.writers);

    } catch (error) {

      console.log(error);

    }

  }, [store.token]);

  useEffect(() => {
    getNews();
  }, [getNews]);

  useEffect(() => {
    getWriters();
  }, [getWriters]);

  // Format Date
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Kolkata"
    }).format(new Date(date));
  };

  // Format Time
  const formatTime = (date) => {
    return new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    }).format(new Date(date));
  };

  const getCurrentType = (n) => {
    if (n.isBreaking) return "breaking";
    if (n.isTrending) return "trending";
    if (n.isFeatured) return "featured";
    if (n.isPopular) return "popular";
    return "none";
  };

  // Delete News
  const handleDelete = async (id) => {

    try {

      await deleteNews(id, store.token);

      toast.success("News deleted");

      setNews((prev) => prev.filter((n) => n._id !== id));

    } catch (error) {

      toast.error("Delete failed");

    }

  };

  // Update Status
  const handleStatus = async (status, id) => {

    try {

      const { data } = await updateNewsStatus(id, status, store.token);

      toast.success(data.message);

      setNews((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, status } : n
        )
      );

    } catch (error) {

      toast.error("Status update failed");

    }

  };

  // Update Type
  const handleType = async (type, id) => {

    const payload = {
      isBreaking: false,
      isTrending: false,
      isFeatured: false,
      isPopular: false
    };

    if (type === "breaking") payload.isBreaking = true;
    if (type === "trending") payload.isTrending = true;
    if (type === "featured") payload.isFeatured = true;
    if (type === "popular") payload.isPopular = true;

    try {

      const { data } = await updateNewsType(id, payload, store.token);

      toast.success(data.message);

      setNews((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, ...payload } : n
        )
      );

    } catch (error) {

      toast.error("Type update failed");

    }

  };




  return (

    <div>
      <div className="w-full px-4">
        <span className='text-gray-800 font-semibold text-sm'>Search</span>
        <input
          type="text"
          placeholder="Search news"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="lg:px-3 w-full py-2 rounded-md border border-gray-300 focus:border-green-500 outline-0"
        />
      </div>

      {/* Filters */}
      <div className="px-4 py-3 lg:flex gap-x-3 space-y-3 lg:space-y-0">

        <FillterStatus setStatus={setStatus} />

        <FillterCategory setCategory={setCategory} />

        <FilterType setType={setType} />

        <FillterWriters writers={writers} setWriter={setWriter} />

        <FilterDate

          value={startDate}
          onChange={setStartDate}
          placeholder="Start Date"
        />

        <FilterDate
          value={endDate}
          onChange={setEndDate}
          placeholder="End Date"
        />




      </div>

      {/* Table */}
      <div className="relative overflow-x-auto p-4">

        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : (

          <table className="w-full text-sm text-left text-slate-600">

            <thead className="text-xs uppercase bg-gray-50">
              <tr>
                <th className="px-7 py-3">No</th>
                {/* <th className="px-7 py-3">Writer</th> */}
                <th className="px-7 py-3">Title</th>
                <th className="px-7 py-3">Image</th>
                <th className="px-7 py-3">Category</th>
                <th className="px-7 py-3">Date</th>
                <th className="px-7 py-3">Time</th>
                <th className="px-7 py-3">Status</th>
                <th className="px-7 py-3">Type</th>
                <th className="px-7 py-3">Action</th>
              </tr>
            </thead>

            <tbody>

              {news.map((n, i) => (

                <tr key={n._id} className="border-b text-xs">

                  <td className="px-6 py-4">
                    {(page - 1) * parPage + i + 1}
                  </td>

                  <td className="px-6 py-4">
                    {n.title?.slice(0, 20)}...
                  </td>

                  {/* <td className="px-6 py-4">
                    {n.writerName}
                  </td> */}

                  <td className="px-6 py-4">
                    <img
                      src={n.image}
                      loading="lazy"
                      className="w-[40px] h-[40px] object-cover"
                    />
                  </td>

                  <td className="px-6 py-4">{n.category}</td>

                  <td className="px-6 py-4">
                    {moment
                      .utc(n?.createdAt)
                      .tz("Asia/Kolkata")
                      .format("DD MMM YYYY")}
                  </td>

                  <td className="px-6 py-4">
                    {formatTime(n.createdAt)}
                  </td>

                  <td className="px-6 py-4">

                    {store?.userInfo?.role === "admin" ? (

                      <span
                        onClick={() =>
                          handleStatus(
                            n.status === "active" ? "deactive" : "active",
                            n._id
                          )
                        }
                        className="px-2 py-[2px] bg-green-100 rounded cursor-pointer"
                      >
                        {n.status}
                      </span>

                    ) : (
                      <span>{n.status}</span>
                    )}

                  </td>

                  <td className="px-6 py-4">

                    <select
                      className="border border-gray-300 bg-white rounded-md px-3 py-1 text-xs
                      focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                      value={getCurrentType(n)}
                      onChange={(e) => handleType(e.target.value, n._id)}
                    >

                      <option value="none">None</option>
                      <option value="breaking">Breaking</option>
                      <option value="trending">Trending</option>
                      <option value="featured">Featured</option>
                      <option value="popular">Popular</option>

                    </select>

                  </td>

                  <td className="px-6 py-4 flex gap-2">

                    {store?.userInfo?.role === "admin" && (
                      <button onClick={() => handleDelete(n._id)}>
                        <MdDelete className="text-red-600" size={24} />
                      </button>
                    )}

                    {store?.userInfo?.role === "writer" && (
                      <Link to={`/dashboard/news/edit/${n._id}`}>
                        <FaEdit />
                      </Link>
                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

      <div className="flex items-center justify-end px-4 py-2 mx-auto max-w-2xl">
        <Pagination
          parPage={parPage}
          page={page}
          pages={pages}
          setPerPage={setPerPage}
          setPage={setPage}
        />
      </div>

    </div>

  );
};

export default NewContent;























// import React, { useContext, useState, useEffect } from "react";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { base_url } from "../../config/config";
// import storeContext from "../../context/storeContext";
// import toast from "react-hot-toast";

// import FillterStatus from "./fillter/FillterStatus";
// import FillterCategory from "./fillter/FillterCategory";
// import FillterWriters from "./fillter/FillterWriters";
// import Pagination from "./Pagination";

// import moment from "moment-timezone";
// import FilterDate from "./fillter/FilterDate";
// import FilterType from "./fillter/FilterType";

// const NewContent = () => {

//   const { store } = useContext(storeContext);

//   const [news, setNews] = useState([]);
//   const [writers, setWriters] = useState([]);
//   const [parPage, setPerPage] = useState(20);
//   const [pages, setPages] = useState(0);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // 🔥 Filters State
//   const [status, setStatus] = useState("");
//   const [category, setCategory] = useState("");
//   const [writer, setWriter] = useState("");
//   const [search, setSearch] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [type, setType] = useState("");


//   const getCurrentType = (n) => {
//     if (n.isBreaking) return "breaking";
//     if (n.isTrending) return "trending";
//     if (n.isFeatured) return "featured";
//     if (n.isPopular) return "popular";
//     return "none";
//   };




//   const get_news = async () => {

//     try {

//       setLoading(true);

//       const query = new URLSearchParams({
//         page,
//         limit: parPage,
//         status,
//         category,
//         writerName: writer,
//         search,
//         startDate,
//         endDate,
//         type
//       });

//       const { data } = await axios.get(
//         `${base_url}/api/news?${query.toString()}`,
//         {
//           headers: {
//             Authorization: `Bearer ${store.token}`
//           }
//         }
//       );

//       setNews(data.news);
//       setPages(data.pages);

//       setLoading(false);

//     } catch (error) {
//       setLoading(false);
//       console.log(error.message);
//     }
//   };

//   // 🔥 Fetch Writers
//   const get_writers = async () => {

//     try {

//       const { data } = await axios.get(`${base_url}/api/news/writers`, {
//         headers: {
//           Authorization: `Bearer ${store.token}`
//         }
//       });

//       setWriters(data.writers);

//     } catch (error) {
//       console.log(error);
//     }

//   };

//   useEffect(() => {
//     get_news();
//   }, [page, parPage, status, category, writer, startDate, endDate, search, type]);

//   useEffect(() => {
//     get_writers();
//   }, []);

//   // Format Time
//   const formatTime = (date) => {
//     return new Date(date).toLocaleTimeString("en-IN", {
//       hour: "2-digit",
//       minute: "2-digit"
//     });
//   };

//   // Delete News
//   const delete_news = async (id) => {

//     try {

//       await axios.delete(`${base_url}/api/news/delete/${id}`, {
//         headers: {
//           Authorization: `Bearer ${store.token}`
//         }
//       });

//       toast.success("News deleted");

//       setNews(prev => prev.filter(n => n._id !== id));

//     } catch (error) {
//       console.log(error);
//     }

//   };

//   // Update Status
//   const update_status = async (status, id) => {

//     try {

//       const { data } = await axios.put(
//         `${base_url}/api/news/status-update/${id}`,
//         { status },
//         {
//           headers: {
//             Authorization: `Bearer ${store.token}`
//           }
//         }
//       );

//       toast.success(data.message);

//       setNews(prev =>
//         prev.map(n =>
//           n._id === id ? { ...n, status } : n
//         )
//       );

//     } catch (error) {
//       toast.error(error.response?.data?.message);
//     }

//   };

//   // Update Types
//   const update_types = async (type, id) => {

//     try {

//       const payload = {
//         isBreaking: false,
//         isTrending: false,
//         isFeatured: false,
//         isPopular: false
//       };

//       if (type === "breaking") payload.isBreaking = true;
//       if (type === "trending") payload.isTrending = true;
//       if (type === "featured") payload.isFeatured = true;
//       if (type === "popular") payload.isPopular = true;

//       const { data } = await axios.put(
//         `${base_url}/api/news/types-update/${id}`,
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${store.token}`
//           }
//         }
//       );

//       toast.success(data.message);

//       setNews(prev =>
//         prev.map(n =>
//           n._id === id ? { ...n, ...payload } : n
//         )
//       );

//     } catch (error) {
//       toast.error(error.response?.data?.message);
//     }

//   };

//   return (

//     <div>
//       <div className="w-full px-4">
//         <span className='text-gray-800 font-semibold text-sm'>Search</span>
//         <input
//           type="text"
//           placeholder="Search news"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="lg:px-3 w-full py-2 rounded-md border border-gray-300 focus:border-green-500 outline-0"
//         />
//       </div>

//       {/* Filters */}
//       <div className="px-4 py-3 lg:flex gap-x-3 space-y-3 lg:space-y-0">

//         <FillterStatus setStatus={setStatus} />

//         <FillterCategory setCategory={setCategory} />

//         <FilterType setType={setType} />

//         <FillterWriters writers={writers} setWriter={setWriter} />

//         <FilterDate

//           value={startDate}
//           onChange={setStartDate}
//           placeholder="Start Date"
//         />

//         <FilterDate
//           value={endDate}
//           onChange={setEndDate}
//           placeholder="End Date"
//         />




//       </div>

//       {/* Table */}
//       <div className="relative overflow-x-auto p-4">

//         {loading ? (
//           <p className="text-center py-10">Loading...</p>
//         ) : (

//           <table className="w-full text-sm text-left text-slate-600">

//             <thead className="text-xs uppercase bg-gray-50">
//               <tr>
//                 <th className="px-7 py-3">No</th>
//                 {/* <th className="px-7 py-3">Writer</th> */}
//                 <th className="px-7 py-3">Title</th>
//                 <th className="px-7 py-3">Image</th>
//                 <th className="px-7 py-3">Category</th>
//                 <th className="px-7 py-3">Date</th>
//                 <th className="px-7 py-3">Time</th>
//                 <th className="px-7 py-3">Status</th>
//                 <th className="px-7 py-3">Type</th>
//                 <th className="px-7 py-3">Action</th>
//               </tr>
//             </thead>

//             <tbody>

//               {news.map((n, i) => (

//                 <tr key={n._id} className="border-b text-xs">

//                   <td className="px-6 py-4">
//                     {(page - 1) * parPage + i + 1}
//                   </td>

//                   <td className="px-6 py-4">
//                     {n.title?.slice(0, 20)}...
//                   </td>

//                   {/* <td className="px-6 py-4">
//                     {n.writerName}
//                   </td> */}

//                   <td className="px-6 py-4">
//                     <img
//                       src={n.image}
//                       loading="lazy"
//                       className="w-[40px] h-[40px] object-cover"
//                     />
//                   </td>

//                   <td className="px-6 py-4">{n.category}</td>

//                   <td className="px-6 py-4">
//                     {moment
//                       .utc(n?.createdAt)
//                       .tz("Asia/Kolkata")
//                       .format("DD MMM YYYY")}
//                   </td>

//                   <td className="px-6 py-4">
//                     {formatTime(n.createdAt)}
//                   </td>

//                   <td className="px-6 py-4">

//                     {store?.userInfo?.role === "admin" ? (

//                       <span
//                         onClick={() =>
//                           update_status(
//                             n.status === "active" ? "deactive" : "active",
//                             n._id
//                           )
//                         }
//                         className="px-2 py-[2px] bg-green-100 rounded cursor-pointer"
//                       >
//                         {n.status}
//                       </span>

//                     ) : (
//                       <span>{n.status}</span>
//                     )}

//                   </td>

//                   <td className="px-6 py-4">

//                     <select
//                       className="border border-gray-300 bg-white rounded-md px-3 py-1 text-xs
//                       focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
//                       value={getCurrentType(n)}
//                       onChange={(e) => update_types(e.target.value, n._id)}
//                     >

//                       <option value="none">None</option>
//                       <option value="breaking">Breaking</option>
//                       <option value="trending">Trending</option>
//                       <option value="featured">Featured</option>
//                       <option value="popular">Popular</option>

//                     </select>

//                   </td>

//                   <td className="px-6 py-4 flex gap-2">

//                     {store?.userInfo?.role === "admin" && (
//                       <button onClick={() => delete_news(n._id)}>
//                         <MdDelete className="text-red-600" size={24} />
//                       </button>
//                     )}

//                     {store?.userInfo?.role === "writer" && (
//                       <Link to={`/dashboard/news/edit/${n._id}`}>
//                         <FaEdit />
//                       </Link>
//                     )}

//                   </td>

//                 </tr>

//               ))}

//             </tbody>

//           </table>

//         )}

//       </div>

//       <Pagination
//         parPage={parPage}
//         page={page}
//         pages={pages}
//         setPerPage={setPerPage}
//         setPage={setPage}
//       />

//     </div>

//   );
// };

// export default NewContent;