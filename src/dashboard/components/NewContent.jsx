import React, { useContext, useState, useEffect } from "react";
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

const NewContent = () => {

  const { store } = useContext(storeContext);

  const [news, setNews] = useState([]);
  const [writers, setWriters] = useState([]);

  const [parPage, setPerPage] = useState(20);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  // Fetch News
  const get_news = async () => {
    try {

      setLoading(true);

      const { data } = await axios.get(
        `${base_url}/api/news?page=${page}&limit=${parPage}`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`
          }
        }
      );

      setNews(data.news);
      setPages(data.pages);

      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  // Fetch Writers
  const get_writers = async () => {
    try {

      const { data } = await axios.get(`${base_url}/api/news/writers`, {
        headers: {
          Authorization: `Bearer ${store.token}`
        }
      });

      setWriters(data.writers);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_news();
  }, [page, parPage]);

  useEffect(() => {
    get_writers();
  }, []);

  // Fast time format
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Remove HTML tags
  const stripHTML = (html) => {
    return html?.replace(/<[^>]+>/g, "");
  };

  // Delete News
  const delete_news = async (id) => {

    try {

      await axios.delete(`${base_url}/api/news/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${store.token}`
        }
      });

      toast.success("News deleted");

      setNews(prev => prev.filter(n => n._id !== id));

    } catch (error) {
      console.log(error);
    }
  };

  // Update Status
  const update_status = async (status, id) => {

    try {

      const { data } = await axios.put(
        `${base_url}/api/news/status-update/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${store.token}`
          }
        }
      );

      toast.success(data.message);

      setNews(prev =>
        prev.map(n =>
          n._id === id ? { ...n, status } : n
        )
      );

    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (

    <div>

      {/* Filters */}
      <div className="px-4 py-3 lg:flex gap-x-3 space-y-3 lg:space-y-0">
        <FillterStatus />
        <FillterCategory />
        <FillterWriters writers={writers} />

        <input
          type="text"
          placeholder="Search news"
          className="lg:px-3 w-full py-2 rounded-md border border-gray-300 focus:border-green-500 outline-0"
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
                <th className="px-7 py-3">Title</th>
                <th className="px-7 py-3">Image</th>
                <th className="px-7 py-3">Category</th>
                <th className="px-7 py-3">Description</th>
                <th className="px-7 py-3">Date</th>
                <th className="px-7 py-3">Time</th>
                <th className="px-7 py-3">Status</th>
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

                  <td className="px-6 py-4">
                    <img
                      src={n.image}
                      loading="lazy"
                      className="w-[40px] h-[40px] object-cover"
                    />
                  </td>

                  <td className="px-6 py-4">{n.category}</td>

                  <td className="px-6 py-4">
                    {stripHTML(n.description)?.slice(0, 30)}...
                  </td>

                  <td className="px-6 py-4">{n.date}</td>

                  <td className="px-6 py-4">
                    {formatTime(n.createdAt)}
                  </td>

                  <td className="px-6 py-4">

                    {store?.userInfo?.role === "admin" ? (

                      <span
                        onClick={() =>
                          update_status(
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

                  <td className="px-6 py-4 flex gap-2">

                    {store?.userInfo?.role === "admin" && (
                      <button onClick={() => delete_news(n._id)}>
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

      <Pagination
        parPage={parPage}
        page={page}
        pages={pages}
        setPerPage={setPerPage}
        setPage={setPage}
      />

    </div>

  );
};

export default NewContent;