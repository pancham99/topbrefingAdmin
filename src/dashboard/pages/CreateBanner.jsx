import { base_url } from '../../config/config'
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import storeContext from "../../context/storeContext";
import { MdCloudUpload } from "react-icons/md";
import toast from 'react-hot-toast'

const CreateBanner = () => {

  const navigate = useNavigate()
  const { store } = useContext(storeContext)
  const [loader, setLoader] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    // videos: "",
    device: "",
    bannertype: "",
    // isActive: true,
  });

  console.log(formData, "formData");

  const [preview, setPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      if (name === "image") {
        setFormData({ ...formData, image: files[0] });
        setPreview(URL.createObjectURL(files[0]));
      } 
      // else if (name === "videos") {
      //   setFormData({ ...formData, videos: files[0] });
      //   setVideoPreview(URL.createObjectURL(files[0]));
      // }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const added = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("description", formData.description);
      fd.append("image", formData.image); // file object
      // fd.append("videos", formData.videos);
      fd.append("device", formData.device);
      fd.append("bannertype", formData.bannertype);

      const { data } = await axios.post(`${base_url}/api/banner/add`, fd, {
        headers: {
          'Authorization': `Bearer ${store.token}`,
          'Content-Type': 'multipart/form-data' // very important
        }
      });

      setLoader(false);
      toast.success(data.message);
      navigate("/dashboard/banner");

    } catch (error) {
      setLoader(false);
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold mb-4">Add New Banner</h2>
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

        {/* Description */}
        <textarea
          name="description"
          placeholder="Banner Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />

        {/* Image Upload */}

        <div className='mb-6'>
          <label className={`w-full h-[320px] flex rounded text-[#404040] justify-center items-center gap-2 cursor-pointer border-2 border-dashed `} htmlFor='img'>
            {
              preview ? <img src={preview} alt='' className='h-full w-full' /> : <div className='flex justify-center  items-center flex-col gap-y-2'>
                <span className='text-2xl'><MdCloudUpload /></span>
                <span>Select Image</span>
              </div>
            }
          </label>
          <input required onChange={handleChange} type='file' accept="image/*" name="image" id='img' className='hidden' />
        </div>


        {/* Video Upload */}
        {/* <div className='mb-6'>
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
        </div> */}


        {/* Link */}
        {/* <input
          type="url"
          name="link"
          placeholder="https://example.com"
          value={formData.link}
          onChange={handleChange}
          className="w-full border rounded p-2"
        /> */}

        {/* Device Type */}
        <select
          name="device"
          value={formData.device}
          onChange={handleChange}
          className="w-full border rounded p-2"

        >
          <option value="">Select Device Type</option>
          <option value="mobile">Mobile</option>
          <option value="desktop">Desktop</option>
        </select>

        {/* Banner Type */}
        <select
          name="bannertype"
          value={formData.bannertype}
          onChange={handleChange}
          className="w-full border rounded p-2"

        >
          <option value="">Select Banner Type</option>
          <option value="advertisement">advertisement</option>
          <option value="announcement">announcement</option>
          <option value="promotion">promotion</option>
          <option value="custom">custom</option>
          <option value="Banner">Banner</option>


        </select>

        {/* Active Checkbox */}
        {/* <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          <span>Active</span>
        </label> */}

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

export default CreateBanner
