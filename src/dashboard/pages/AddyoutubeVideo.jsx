import { useState } from "react";
import toast from 'react-hot-toast';
import { useAddYoutubeVideoMutation } from "../../hooks/api/useVideoQueries";

export default function AddVideo() {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [message, setMessage] = useState("");

  const addYoutubeVideoMutation = useAddYoutubeVideoMutation({
    onSuccess: () => {
      setMessage("Video added successfully ✅");
      toast.success("YouTube video added successfully");
      setTitle("");
      setVideoUrl("");
    },
    onError: (error) => {
      const errMsg = error.response?.data?.message || error.message || "Something went wrong";
      setMessage(errMsg);
      toast.error(errMsg);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !videoUrl) {
      setMessage("All fields are required");
      return;
    }

    setMessage("");
    addYoutubeVideoMutation.mutate({ title, videoUrl });
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
            disabled={addYoutubeVideoMutation.isPending}
            className="w-full bg-red-600 hover:bg-red-700 transition duration-300 text-white font-semibold py-3 rounded-lg"
          >
            {addYoutubeVideoMutation.isPending ? "Adding..." : "Add Video"}
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