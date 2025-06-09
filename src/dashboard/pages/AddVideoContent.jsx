import { base_url } from '../../config/config'
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import storeContext from "../../context/storeContext";
import { MdCloudUpload } from "react-icons/md";
import toast from 'react-hot-toast'

const AddVideoContent = () => {

  const navigate = useNavigate()
  const { store } = useContext(storeContext)
  const [loader, setLoader] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    videos: "",
    videotype: "",
    // videourl: "",
  });

  console.log(formData, "formData");
  const [videoPreview, setVideoPreview] = useState(null);

    const handleChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && name === "videos") {
      const file = files[0];
      setVideoPreview(URL.createObjectURL(file));
      setUploading(true);

      try {
        const cloudData = new FormData();
        cloudData.append("file", file);
        cloudData.append("upload_preset", "video_uploads"); // 🔁 Replace
        cloudData.append("cloud_name", "donkxeytk"); // 🔁 Replace
        cloudData.append("resource_type", "video");

        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/donkxeytk/video/upload", // 🔁 Replace
          cloudData
        );

        setFormData({ ...formData, videos: res.data.secure_url });
        toast.success("Video uploaded successfully");
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Failed to upload video");
      } finally {
        setUploading(false);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // const handleChange = (e) => {
  //   const { name, value, type, files } = e.target;

  //   if (type === "file") {

  //     if (name === "videos") {
  //       setFormData({ ...formData, videos: files[0] });
  //       setVideoPreview(URL.createObjectURL(files[0]));
  //     }
  //   } else {
  //     setFormData({ ...formData, [name]: value });
  //   }
  // };

  const added = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("videos", formData.videos);
      // fd.append("videourl", formData.videourl);
      fd.append("videotype", formData.videotype);

      const { data } = await axios.post(`${base_url}/api/video/add`, fd, {
        headers: {
          'Authorization': `Bearer ${store.token}`,
          'Content-Type': 'multipart/form-data' // very important
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
          <label className={`w-full h-[180px] flex rounded text-[#404040] justify-center items-center gap-2 cursor-pointer border-2 border-dashed `} htmlFor='video'>
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

        >
          <option value="">Select Banner Type</option>
          <option value="advertisement">advertisement</option>
          <option value="announcement">announcement</option>
          <option value="promotion">promotion</option>
          <option value="custom">custom</option>
        </select>

        {/* Submit */}
        <button

          disabled={loader}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loader ? "Submitting..." : "Add Banner"}
        </button>
      </form>
    </div>
  );
}

export default AddVideoContent
