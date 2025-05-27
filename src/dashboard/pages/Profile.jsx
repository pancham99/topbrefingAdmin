import React, { useContext, useState } from "react";
import { FaImage } from "react-icons/fa";
import storeContext from "../../context/storeContext";
import { MdCloudUpload } from "react-icons/md";
import axios from "axios";
import { base_url } from "../../config/config";
import { useEffect } from "react";

const Profile = () => {
  const { store } = useContext(storeContext);

  const [profile, serProfile] = useState([]);

  console.log(profile, "profile");

  const [image, setImage] = useState( "");
  const [img, setImg] = useState("");
  const [loader, setLoader] = useState(false);

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
      setLoader(true);
      const { data } = await axios.put(
        `http://localhost:5000/api/news/update_avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );

      setLoader(false);
      console.log(data.user, "updated user");
      // toast.success(data.message);
    } catch (error) {
      setLoader(false);
      console.error(error);
      // toast.error(error.response.data.message);
    }
  };

  const get_profile = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/news/get_user`,
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
    <div className="w-full grid grid-cols-2 gap-x-6 mt-5">
      <div className="bg-white gap-x-3 p-6 rounded flex justify-center items-center">
        <form onSubmit={added}>
          <label
            className={`w-[150px] h-[150px] flex rounded text-[#404040] justify-center items-center gap-2 cursor-pointer border-2 border-dashed `}
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
              disabled={loader}
              className="px-3 py-[6px] bg-purple-500 rounded-md text-white hover:bg-purple-600"
            >
              {loader ? "lodding.." : "Update Avatar"}
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

        <from>
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
                id="new_password"
                type="password"
                placeholder="New Password"
                className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
              />
            </div>

            <div className="mt-2">
              <button
                className="px-3 py-[6px] bg-purple-500 rounded-md text-white hover:bg-purple-600"
                to="/dashboard/writers"
              >
                Change Password
              </button>
            </div>
          </div>
        </from>
      </div>
    </div>
  );
};

export default Profile;
