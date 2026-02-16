import { useEffect, useRef, useState } from "react";
import { FaBars, FaUser, FaSignOutAlt, FaBell } from "react-icons/fa";
import { RiArrowDownSFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { logout } from "../../store/slices/authSlice";

const Header = ({ setIsSidebarOpen }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const profileData = useSelector((state) => state.auth);
  const userData = profileData?.loginData?.user || [];
  const navigate = useNavigate();
  const location = useLocation();
    const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const handleProfile = () => navigate("/app/profile");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleLogout = async () => {
    await dispatch(logout());
    window.location.href = "/login";
  };

  const pageTitles = {
    "/app/dashboard": "Dashboard",
    "/app/users": "Users",
    "/app/publish": "Publish",
    "/app/profile": "Profile",
    "/app/roles": "Roles Management",


  };

  const title = pageTitles[location.pathname] || "";

  return (
    <header className="sticky top-0 flex w-full  z-50 py-2 bg-white">
      <div className="flex items-center justify-between w-full px-4 py-3 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleSidebar}
            className="p-2 rounded hover:bg-gray-100"
          >
            <FaBars className="md:w-5 md:h-5 h-4 w-4" />
          </button>

          <h1 className="hidden text-xl font-semibold text-gray-800 lg:block">
            {title || "Dashboard overview"}
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-end gap-3 w-2/3">
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-red-600 hover:text-white text-gray-800 transition-colors duration-200 "
          >
            {/* <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
              alt="profile"
              className="md:h-8 md:w-8 h-7 w-7 rounded-full object-cover shrink-0"
            /> */}
            <div className="hidden lg:block text-left">
              <p className="text-sm font-medium  hover:text-white whitespace-nowrap">
                {userData?.fullName}
              </p>
            </div>
            <RiArrowDownSFill className="hidden hover:text-white lg:block w-4 h-4 text-[#5041BC]" />
          </button>
          {/* PROFILE DROPDOWN */}
          {
            openDropdown && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-40 w-44 bg-white border border-gray-200 rounded-md shadow-md py-2"
              >
                <button
                  onClick={handleProfile}
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <FaUser className="w-4 h-4 mr-2" /> Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <FaSignOutAlt className="w-4 h-4 mr-2" /> Logout
                </button>
              </div>
            )}

        </div>
      </div>
    </header>
  );
};

export default Header;
