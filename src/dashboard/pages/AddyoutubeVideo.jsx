
import React, { useState } from "react";
import { base_url } from "../../config/config";
export default function AddVideo() {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !videoUrl) {
      setMessage("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(`${base_url}/api/youtube/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, videoUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setMessage("Video added successfully ✅");
      setTitle("");
      setVideoUrl("");

    } catch (error) {
      setMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">

        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Add New Video
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* TITLE */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Video Title
            </label>
            <input
              type="text"
              placeholder="Enter video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#111827] border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* VIDEO URL */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              YouTube Embed URL
            </label>
            <input
              type="text"
              placeholder="https://www.youtube.com/embed/..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full bg-[#111827] border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 transition duration-300 text-white font-semibold py-3 rounded-lg"
          >
            {loading ? "Adding..." : "Add Video"}
          </button>

          {/* MESSAGE */}
          {message && (
            <p className="text-center text-sm text-gray-300 mt-3">
              {message}
            </p>
          )}

        </form>
      </div>
    </div>
  );
}