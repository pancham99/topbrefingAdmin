import React, { useContext, useState } from "react";
import { FaImage } from "react-icons/fa";
import storeContext from "../../context/storeContext";
import { MdCloudUpload } from "react-icons/md";
import axios from "axios";
import { base_url } from "../../config/config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tost from 'react-hot-toast'

const Profile = () => {
  const { store } = useContext(storeContext);
  const navigate = useNavigate()
  const [profile, serProfile] = useState([]);

  const [image, setImage] = useState("");
  const [img, setImg] = useState("");
  const [loader, setLoader] = useState("");

  const [state, setState] = useState({
    email: profile?.user?.email,
    old_password: '',
    new_password: ''
  })



  const imageHandle = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      setImg(URL.createObjectURL(files[0]));
      setImage(files[0]);
    }
  };

  const added = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoader("avatar");
      const { data } = await axios.put(
        `${base_url}/api/news/update_avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );

      setLoader("");
      console.log(data.user, "updated user");
      tost.success(data.message);
    } catch (error) {
      setLoader("");
      console.error(error);
      tost.error(error.response.data.message);
    }
  };

  const get_profile = async () => {
    try {
      const { data } = await axios.get(
        `${base_url}/api/news/get_user`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      serProfile(data);
    } catch (error) {
      console.log(error);
    }
  };






  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value

    })
  }




  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoader("password");
      const { data } = await axios.put(
        `${base_url}/api/news/rest_user_password`,
        state,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLoader("");
      tost.success(data.message || "Password changed successfully");

      navigate('/login');
    } catch (error) {
      console.error(error);
      tost.error(error.response.data.message)
      setLoader("");
    }
  };



  useEffect(() => {
    if (profile?.user?.email) {
      setState(prev => ({ ...prev, email: profile.user.email }));
    }
  }, [profile]);

  useEffect(() => {
    get_profile();
  }, []);



  // Assuming `profile.user.image` updates later
  useEffect(() => {
    if (profile?.user?.image) {
      setImage(profile?.user?.image);
      setImg(profile?.user?.image);
    }
  }, [profile?.user?.image]);

  return (
    <div className="w-full grid lg:grid-cols-2 gap-x-6 mt-5">
      <div className="bg-white gap-x-3 p-6 rounded lg:flex flex-cols justify-center items-center">
        <form onSubmit={added}>
          <label
            className={`lg:w-[150px] w-full lg:h-[150px] h-full flex rounded text-[#404040] justify-center items-center gap-2 cursor-pointer border-2 border-dashed `}
            htmlFor="img"
          >
            <div className="flex justify-center  items-center flex-col gap-y-2">
              {img ? (
                <img src={img} alt="" className="h-full w-full" />
              ) : (
                <div className="flex justify-center  items-center flex-col gap-y-2">
                  <span className="text-2xl">
                    <MdCloudUpload />
                  </span>
                  <span>Select Image</span>
                </div>
              )}
              {/* <span className='text-2xl'><FaImage /></span>
              <span>Select Image</span> */}
            </div>
          </label>
          <input
            disabled={loader}
            onChange={imageHandle}
            type="file"
            id="img"
            className="hidden"
          />

          <div className="mt-2">
            <button
              type="submit"
              disabled={loader === "avatar"}
              className="px-3 py-[6px] bg-purple-500 rounded-md text-white hover:bg-purple-600"
            >
              {loader === "avatar" ? "Loading..." : "Update Avatar"}
            </button>
          </div>
        </form>

        <div className="text-[#404040] flex flex-col gap-y-1 justify-center items-start">
          <span>Name: {profile?.user?.name}</span>
          <span>Email: {profile?.user?.email}</span>
          <span> Category: {profile?.user?.category}</span>
          <span> Role: {profile?.user?.role}</span>
        </div>
      </div>

      <div className="bg-white px-6 py-4 text-[#404040]">
        <h2 className="pb-3 text-center">Change password</h2>

        <form onSubmit={submit}>
          <div>
            <div className="flex flex-col gap-y-2 mb-5">
              <label
                className="text-md font-medium text-gray-600"
                htmlFor="old_password"
              >
                Old Password
              </label>
              <input
                type="password"
                placeholder="Old Password"
                onChange={inputHandle}
                value={state.old_password}
                name="old_password"
                className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
                id="old_password"
              />
            </div>

            <div className="flex flex-col gap-y-2 mb-5">
              <label
                className="text-md font-medium text-gray-600"
                htmlFor="new_password"
              >
                New Password
              </label>
              <input
                name="new_password"
                onChange={inputHandle}
                value={state.new_password}
                id="new_password"
                type="password"
                placeholder="New Password"
                className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
              />
            </div>

            <div className="mt-2">
              <button
                disabled={loader === "password"}
                type="submit"
                className="px-3 py-[6px] bg-purple-500 rounded-md text-white hover:bg-purple-600"
                to="/dashboard/writers"
              >
                {loader === "password" ? "Loading..." : "Change Password"}


              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
