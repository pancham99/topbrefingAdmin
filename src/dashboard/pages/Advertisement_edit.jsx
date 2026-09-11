import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdCloudUpload } from "react-icons/md";
import toast from 'react-hot-toast';
import {
  useGetAdvertisementById,
  useUpdateAdvertisementMutation,
} from '../../hooks/api/useAdvertisementQueries';

const Advertisement_edit = () => {
  const navigate = useNavigate();
  const { _id } = useParams();

  const { data, isLoading } = useGetAdvertisementById(_id);

  const [preview, setPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    companyName: "",
    bannertype: "",
    deviceTarget: "",
    pageTarget: "",
    locationTarget: "",
    placementKey: "",
    link: "",
    priority: "",
    dayDuration: "",
    amount: "",
    image: "",
    video: ""
  });

  const updateMutation = useUpdateAdvertisementMutation({
    onSuccess: (resData) => {
      toast.success(resData?.message || "Advertisement updated successfully");
      navigate('/dashboard/advertisement');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message || "Failed to update advertisement");
    },
  });

  useEffect(() => {
    if (data) {
      const ad = data.advertisement || data;
      if (ad.title) {
        setFormData({
          title: ad.title || "",
          description: ad.description || "",
          companyName: ad.companyName || "",
          bannertype: ad.bannerType || "",
          deviceTarget: ad.deviceTarget || "",
          pageTarget: ad.pageTarget || "",
          locationTarget: ad.locationTarget || "",
          placementKey: ad.placementKey || "",
          link: ad.link || "",
          priority: ad.priority || "",
          dayDuration: ad.dayDuration || "",
          amount: ad.amount || "",
          image: '',
          video: ''
        });
        if (ad.image) setPreview(ad.image);
        if (ad.video) setVideoPreview(ad.video);
      }
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      if (name === "image" && files.length > 0) {
        setFormData({ ...formData, image: files[0] });
        setPreview(URL.createObjectURL(files[0]));
      } else if (name === "video" && files.length > 0) {
        setFormData({ ...formData, video: files[0] });
        setVideoPreview(URL.createObjectURL(files[0]));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("description", formData.description);
    fd.append("companyName", formData.companyName);
    fd.append("bannerType", formData.bannertype);
    fd.append("deviceTarget", formData.deviceTarget);
    fd.append("pageTarget", formData.pageTarget);
    fd.append("locationTarget", formData.locationTarget);
    fd.append("placementKey", formData.placementKey);
    fd.append("link", formData.link);
    fd.append("priority", formData.priority);
    fd.append("dayDuration", formData.dayDuration);
    fd.append("amount", formData.amount);

    if (formData.image) fd.append("image", formData.image);
    if (formData.video) fd.append("video", formData.video);

    updateMutation.mutate({ _id, formData: fd });
  };

  if (isLoading) {
    return <div className="text-center py-10 text-gray-500">Loading advertisement data...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold mb-4">Edit Advertisement</h2>
      <form onSubmit={submitHandler} className="space-y-4">
        <input type="text" name="title" placeholder="Banner Title" value={formData.title} onChange={handleChange} className="w-full border rounded p-2" required />

        <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className="w-full border rounded p-2" required />

        <textarea name="description" placeholder="Banner Description" value={formData.description} onChange={handleChange} className="w-full border rounded p-2" required />

        <div className='mb-6'>
          <label className="w-full h-[300px] flex rounded justify-center items-center gap-2 cursor-pointer border-2 border-dashed" htmlFor='img'>
            {preview ? <img src={preview} alt='' className='h-full w-full object-cover' /> : <div className='flex flex-col items-center gap-y-2'><MdCloudUpload className='text-2xl' /><span>Select Image</span></div>}
          </label>
          <input onChange={handleChange} type='file' accept="image/*" name="image" id='img' className='hidden' />
        </div>

        <div className='mb-6'>
          <label className="w-full h-[200px] flex rounded justify-center items-center gap-2 cursor-pointer border-2 border-dashed" htmlFor='video'>
            {videoPreview ? <video src={videoPreview} controls className='h-full w-full object-cover' /> : <div className='flex flex-col items-center gap-y-2'><MdCloudUpload className='text-2xl' /><span>Select Video (optional)</span></div>}
          </label>
          <input onChange={handleChange} type='file' accept="video/*" name="video" id='video' className='hidden' />
        </div>

        <select name="bannertype" value={formData.bannertype} onChange={handleChange} className="w-full border rounded p-2" required>
          <option value="">Select Banner Type</option>
          <option value="advertisement">Advertisement</option>
          <option value="promotion">Promotion</option>
          <option value="announcement">Announcement</option>
          <option value="custom">Custom</option>
        </select>

        <select name="deviceTarget" value={formData.deviceTarget} onChange={handleChange} className="w-full border rounded p-2" required>
          <option value="">Select Device Target</option>
          <option value="all">All</option>
          <option value="mobile">Mobile</option>
          <option value="desktop">Desktop</option>
        </select>

        <input type="text" name="pageTarget" placeholder="Page Target (e.g., homepage, sports)" value={formData.pageTarget} onChange={handleChange} className="w-full border rounded p-2" required />

        <input type="text" name="locationTarget" placeholder="Location Target (e.g., India, Global)" value={formData.locationTarget} onChange={handleChange} className="w-full border rounded p-2" required />

        <select name="placementKey" value={formData.placementKey} onChange={handleChange} className="w-full border rounded p-2" required>
          <option value="">Select Placement</option>
          <option value="top">Top</option>
          <option value="sidebar">Sidebar</option>
          <option value="bottom">Bottom</option>
          <option value="middle">Middle</option>
        </select>

        <input type="text" name="link" placeholder="Advertisement Link (optional)" value={formData.link} onChange={handleChange} className="w-full border rounded p-2" />

        <input type="number" name="priority" placeholder="Priority (1 highest)" value={formData.priority} onChange={handleChange} className="w-full border rounded p-2" min="0" />

        <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} className="w-full border rounded p-2" min="0" />

        <input type="number" name="dayDuration" placeholder="Display Duration in Days" value={formData.dayDuration} onChange={handleChange} className="w-full border rounded p-2" min="1" required />

        <button disabled={updateMutation.isPending} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50">
          {updateMutation.isPending ? "Submitting..." : "Update Advertisement"}
        </button>
      </form>
    </div>
  );
};

export default Advertisement_edit;
