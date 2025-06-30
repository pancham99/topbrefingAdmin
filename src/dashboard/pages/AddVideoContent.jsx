import { base_url } from '../../config/config'
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import storeContext from "../../context/storeContext";
import { MdCloudUpload } from "react-icons/md";
import toast from 'react-hot-toast'

const CLOUD_NAME = "donkxeytk";
const UPLOAD_PRESET = "ml_default"; // Make sure this preset exists and is unsigned

const AddVideoContent = () => {
  const navigate = useNavigate();
  const { store } = useContext(storeContext);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    videos: "",
    videotype: "",
  });

  const [videoPreview, setVideoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && name === "videos") {
      const file = files[0];
      if (!file) return;
      setVideoPreview(URL.createObjectURL(file));
      setUploading(true);

      try {
        const cloudData = new FormData();
        cloudData.append("file", file);
        cloudData.append("upload_preset", UPLOAD_PRESET);

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
          cloudData
        );

        if (res.data && res.data.secure_url) {
          setFormData((prev) => ({ ...prev, videos: res.data.secure_url }));
          toast.success("Video uploaded successfully");
        } else {
          throw new Error("No secure_url returned from Cloudinary");
        }
      } catch (error) {
        console.error("Upload error:", error);
        toast.error(
          error.response?.data?.error?.message ||
          error.message ||
          "Failed to upload video"
        );
        setFormData((prev) => ({ ...prev, videos: "" }));
      } finally {
        setUploading(false);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const added = async (e) => {
    e.preventDefault();

    if (uploading) {
      toast.error("Please wait for the video to finish uploading.");
      return;
    }
    if (videoPreview && !formData.videos) {
      toast.error("Please wait for the video to finish uploading.");
      return;
    }
    if (!formData.title || !formData.videotype) {
      toast.error("Please fill all required fields.");
      return;
    }
    setLoader(true);

    try {
      // Send as JSON, not FormData
      const payload = {
        title: formData.title,
        videos: formData.videos, // This is the Cloudinary URL
        videotype: formData.videotype
      };

      const { data } = await axios.post(`${base_url}/api/video/add`, payload, {
        headers: {
          'Authorization': `Bearer ${store.token}`,
          'Content-Type': 'application/json'
        }
      });

      setLoader(false);
      toast.success(data.message);
      navigate("/dashboard/video");
    } catch (error) {
      setLoader(false);
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold mb-4">Add Video Content</h2>
      <form onSubmit={added} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Banner Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />

        {/* Video Upload */}
        <div className='mb-6'>
          <label className={`w-full h-[180px] flex rounded text-[#404040] justify-center items-center gap-2 cursor-pointer border-2 border-dashed`} htmlFor='video'>
            {
              videoPreview ? (
                <video src={videoPreview} controls className='h-full w-full' />
              ) : (
                <div className='flex justify-center items-center flex-col gap-y-2'>
                  <span className='text-2xl'><MdCloudUpload /></span>
                  <span>Select Video (optional)</span>
                </div>
              )
            }
          </label>
          <input onChange={handleChange} type='file' accept="video/*" name="videos" id='video' className='hidden' />
        </div>

        {/* Banner Type */}
        <select
          name="videotype"
          value={formData.videotype}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        >
          <option value="">Select Banner Type</option>
          <option value="advertisement">advertisement</option>
          <option value="announcement">announcement</option>
          <option value="promotion">promotion</option>
          <option value="news">news</option>
        </select>

        {/* Submit */}
        <button
          type="submit"
          disabled={
            loader ||
            uploading ||
            (videoPreview && !formData.videos)
          }
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
        >
          {loader
            ? "Submitting..."
            : uploading
              ? "Uploading Video..."
              : "Add Video"}
        </button>
      </form>
    </div>
  );
}

export default AddVideoContent