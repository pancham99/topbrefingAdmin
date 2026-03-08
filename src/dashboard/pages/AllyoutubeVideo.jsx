
import React, { useEffect, useState } from "react";
import { base_url } from '../../config/config'
export default function AllyoutubeVideo() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 9; // per page videos

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:5000/api/youtube/getall?page=${page}&limit=${limit}`
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        setVideos(data.data);
        setTotalPages(data.totalPages);

      } catch (err) {
        setError(err.message || "Failed to fetch videos");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [page]);

  return (
    <div className="min-h-screen bg-[#0B1120] px-6 py-10">

      <h1 className="text-3xl font-bold text-white mb-8">
        Latest Videos
      </h1>

      {loading && (
        <div className="text-center text-gray-400">Loading videos...</div>
      )}

      {/* {error && (
        <div className="text-center text-red-500">{error}</div>
      )} */}

      {!loading && !error && videos.length === 0 && (
        <div className="text-center text-gray-400">
          No videos available
        </div>
      )}

      {/* VIDEO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div
            key={video._id}
            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md hover:scale-[1.02] transition duration-300 shadow-lg"
          >
            <div className="aspect-video">
              <iframe
                src={video.videoUrl}
                title={video.title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>

            <div className="p-4">
              <h2 className="text-white font-semibold text-lg line-clamp-2">
                {video.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION CONTROLS */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-10">

          {/* Prev Button */}
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 hover:bg-gray-600"
          >
            Prev
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`px-4 py-2 rounded ${
                page === index + 1
                  ? "bg-red-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 hover:bg-gray-600"
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
}