import React, { useState, useEffect } from "react";
import { MdCloudUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import {
  useGetProfile,
  useUpdateAvatarMutation,
  useResetPasswordMutation,
} from "../../hooks/api/useAuthQueries";

const Profile = () => {
  const navigate = useNavigate();
  const { data: profile } = useGetProfile();

  const [image, setImage] = useState("");
  const [img, setImg] = useState("");

  const [state, setState] = useState({
    email: '',
    old_password: '',
    new_password: ''
  });

  const updateAvatarMutation = useUpdateAvatarMutation({
    onSuccess: (data) => {
      toast.success(data?.message || "Avatar updated successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message || "Failed to update image");
    },
  });

  const resetPasswordMutation = useResetPasswordMutation({
    onSuccess: (data) => {
      toast.success(data?.message || "Password changed successfully");
      navigate('/login');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message || "Failed to reset password");
    },
  });

  useEffect(() => {
    if (profile?.user?.email) {
      setState((prev) => ({ ...prev, email: profile.user.email }));
    }
    if (profile?.user?.image) {
      setImage(profile.user.image);
      setImg(profile.user.image);
    }
  }, [profile]);

  const imageHandle = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      setImg(URL.createObjectURL(files[0]));
      setImage(files[0]);
    }
  };

  const added = (e) => {
    e.preventDefault();
    if (!image || typeof image === "string") {
      return toast.error("Please select a new image first");
    }
    const formData = new FormData();
    formData.append("image", image);
    updateAvatarMutation.mutate(formData);
  };

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const submit = (e) => {
    e.preventDefault();
    resetPasswordMutation.mutate(state);
  };

  return (
    <div className="w-full grid lg:grid-cols-2 gap-x-6 mt-5">
      <div className="bg-white gap-x-3 p-6 rounded lg:flex flex-cols justify-center items-center">
        <form onSubmit={added}>
          <label
            className="lg:w-[150px] w-full lg:h-[150px] h-full flex rounded text-[#404040] justify-center items-center gap-2 cursor-pointer border-2 border-dashed"
            htmlFor="img"
          >
            <div className="flex justify-center items-center flex-col gap-y-2">
              {img ? (
                <img src={img} alt="Avatar" className="h-full w-full object-cover rounded" />
              ) : (
                <div className="flex justify-center items-center flex-col gap-y-2">
                  <span className="text-2xl">
                    <MdCloudUpload />
                  </span>
                  <span>Select Image</span>
                </div>
              )}
            </div>
          </label>
          <input
            disabled={updateAvatarMutation.isPending}
            onChange={imageHandle}
            type="file"
            id="img"
            className="hidden"
          />

          <div className="mt-2">
            <button
              type="submit"
              disabled={updateAvatarMutation.isPending}
              className="px-3 py-[6px] bg-red-500 rounded-md text-white hover:bg-red-600"
            >
              {updateAvatarMutation.isPending ? "Loading..." : "Update Avatar"}
            </button>
          </div>
        </form>

        <div className="text-[#404040] flex flex-col gap-y-1 justify-center items-start">
          <span>Name: {profile?.user?.name}</span>
          <span>Email: {profile?.user?.email}</span>
          <span>Category: {profile?.user?.category}</span>
          <span>Role: {profile?.user?.role}</span>
        </div>
      </div>

      <div className="bg-white px-6 py-4 text-[#404040]">
        <h2 className="pb-3 text-center font-semibold">Change password</h2>

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
                required
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
                required
                placeholder="New Password"
                className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
              />
            </div>

            <div className="mt-2">
              <button
                disabled={resetPasswordMutation.isPending}
                type="submit"
                className="px-3 py-[6px] bg-red-500 rounded-md text-white hover:bg-red-600"
              >
                {resetPasswordMutation.isPending ? "Loading..." : "Change Password"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
