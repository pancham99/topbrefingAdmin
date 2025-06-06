
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
    link: "",
    deviceType: "",
    bannerType: "",
    isActive: true,
  });

  const [preview, setPreview] = useState(null);


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const added = async (e) => {
    e.preventDefault()

    try {
      setLoader(true)
      const { data } = await axios.post(`http://localhost:5000/api/v1/banner/add`, formData, {
        headers: {
          'Authorization': `Bearer ${store.token}`
        }
      })
      setLoader(false)
      console.log(data)
      toast.success(data.message)

    } catch (error) {
      setLoader(false)
      toast.error(error.response.data.message)

    }
  }

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
          <input required onChange={handleChange} type='file'  accept="image/*"  name="image" id='img' className='hidden'/>
        </div>
      

        {/* Link */}
        <input
          type="url"
          name="link"
          placeholder="https://example.com"
          value={formData.link}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        {/* Device Type */}
        <select
          name="deviceType"
          value={formData.deviceType}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        >
          <option value="">Select Device Type</option>
          <option value="mobile">Mobile</option>
          <option value="desktop">Desktop</option>
        </select>

        {/* Banner Type */}
        <select
          name="bannerType"
          value={formData.bannerType}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        >
          <option value="">Select Banner Type</option>
          <option value="advertisement">advertisement</option>
          <option value="announcement">announcement</option>
          <option value="promotion">promotion</option>
          <option value="custom">custom</option>


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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loader ? "Submitting..." : "Add Banner"}
        </button>
      </form>
    </div>
  );
}

export default CreateBanner
