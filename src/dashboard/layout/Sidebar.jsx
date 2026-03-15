import React, { useState, useContext, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillDashboard, AiOutlinePlus } from "react-icons/ai";
import { BiNews } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { ImProfile } from "react-icons/im";
import { FaPlus } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { PiFlagBannerFoldBold } from "react-icons/pi";
import { FcAdvertising } from "react-icons/fc";
import storeContext from "../../context/storeContext";
import { RiVideoAddFill } from "react-icons/ri";
import { CiYoutube } from "react-icons/ci";



const NavItem = ({ to, icon, label, active, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`px-3 py-2 rounded-md flex gap-x-2 items-center w-full
      ${active ? "bg-red-500 text-white" : "text-[#4040f6] bg-white"}
      hover:bg-red-400 hover:text-white transition-colors`}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-[14px] font-semibold">{label}</span>
  </Link>
);

const TreeToggle = ({ label, icon, open, onToggle, children, active }) => {
  // measure maxHeight via ref? We'll animate max-height with fixed large value for simplicity
  return (
    <div className="w-full">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className={`w-full px-3 py-2 rounded-md flex justify-between items-center gap-x-2
          ${active ? "bg-red-500 text-white" : "text-[#4040f6] bg-white"}
          hover:bg-red-400 hover:text-white transition-colors`}
      >
        <div className="flex items-center gap-x-2">
          <span className="text-xl">{icon}</span>
          <span className="text-[14px] font-semibold">{label}</span>
        </div>

        <span
          className={`transform transition-transform duration-200 ${open ? "rotate-90" : "rotate-0"
            }`}
        >
          ▶
        </span>
      </button>

      {/* animated panel */}
      <div
        className={`overflow-hidden transition-all duration-300`}
        style={{
          maxHeight: open ? "500px" : "0px",
        }}
      >
        <div className="pl-6 py-2 flex flex-col gap-y-1">{children}</div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { store, dispatch } = useContext(storeContext);

  const [openKeys, setOpenKeys] = useState({
    news: pathname.startsWith("/dashboard/news"),
    manage: pathname.startsWith("/dashboard/writer") || pathname.startsWith("/dashboard/banner") || pathname.startsWith("/dashboard/advertisement"),
  });

  const toggleKey = (key) =>
    setOpenKeys((s) => ({ ...s, [key]: !s[key] }));

  const logout = () => {
    localStorage.removeItem("newstoken");
    dispatch({ type: "logout", payload: "" });
    navigate("/login");
  };

  // Build nav structure (easily extendable)
  const navStructure = useMemo(() => {
    const isAdmin = store.userInfo?.role === "admin";
    return [
      {
        id: "dashboard",
        label: "Dashboard",
        to: isAdmin ? "/dashboard/admin" : "/dashboard/writer",
        icon: <AiFillDashboard />,
      },
      isAdmin && {
        id: "manage",
        label: "Manage",
        icon: <FiUsers />,
        children: [
          { id: "add-writer", label: "Add Writer", to: "/dashboard/writer/add", icon: <AiOutlinePlus /> },
          { id: "writers", label: "Writers", to: "/dashboard/writers", icon: <FiUsers /> },
          { id: "subscribe", label: "Subscribe", to: "/dashboard/subscribe", icon: <FiUsers /> },
          { id: "banner-create", label: "Add Banner", to: "/dashboard/createBanner", icon: <AiOutlinePlus /> },
          { id: "banner", label: "Banner", to: "/dashboard/banner", icon: <PiFlagBannerFoldBold /> },
          { id: "ads-create", label: "Add Advertisement", to: "/dashboard/createAdvertisement", icon: <AiOutlinePlus /> },
          { id: "ads", label: "Advertisement", to: "/dashboard/advertisement", icon: <FcAdvertising /> },
          { id: "aadvideo", label: "Add Video", to: "/dashboard/addVideoContent", icon: <AiOutlinePlus /> },
          { id: "video", label: " Video", to: "/dashboard/videos", icon: <RiVideoAddFill /> },
          { id: "addyoutubeVideo", label: "Add Youtube Video", to: "/dashboard/addyoutubeVideo", icon: <AiOutlinePlus /> },
          { id: "allyoutubeVideo", label: "All Youtube Video", to: "/dashboard/allyoutubeVideo", icon: <CiYoutube /> },
        ],
      },
      {
        id: "news",
        label: "News",
        icon: <BiNews />,
        children: isAdmin
          ? [
            { id: "news-list", label: "All News", to: "/dashboard/news", icon: <BiNews /> },
              // { id: "news-create", label: "Add News", to: "/dashboard/news/create", icon: <FaPlus /> },
          ]
          : [
            { id: "news-list", label: "All News", to: "/dashboard/news", icon: <BiNews /> },
            { id: "news-create", label: "Add News", to: "/dashboard/news/create", icon: <FaPlus /> },
          ],
      },
      {
        id: "profile",
        label: "Profile",
        to: "/dashboard/profile",
        icon: <ImProfile />,
      },
    ].filter(Boolean);
  }, [store.userInfo]);

  return (
    <aside className="w-[250px] h-screen fixed left-0 top-0 bg-white hidden lg:block border-r">
      <div className="h-[70px] flex justify-center items-center">
        <Link to="/">
          <div className="flex flex-col justify-center items-center md:items-start mt-8">
            <img src="/logo.png" alt="logo" className="w-36 h-28 object-contain" />
          </div>
        </Link>
      </div>

      <nav className="px-3 py-4 overflow-auto h-[calc(100vh-70px)]">
        <ul className="flex flex-col gap-y-1">
          {navStructure.map((item) => {
            const active =
              item.to
                ? pathname === item.to
                : item.children
                  ? item.children.some((c) => pathname.startsWith(c.to))
                  : false;

            if (item.children) {
              return (
                <li key={item.id}>
                  <TreeToggle
                    label={item.label}
                    icon={item.icon}
                    open={!!openKeys[item.id]}
                    onToggle={() => toggleKey(item.id)}
                    active={active}
                  >
                    {item.children.map((child) => (
                      <NavItem
                        key={child.id}
                        to={child.to}
                        icon={child.icon}
                        label={child.label}
                        active={pathname === child.to}
                        onClick={() => {
                          // close sidebar on mobile if needed (not implemented here)
                        }}
                      />
                    ))}
                  </TreeToggle>
                </li>
              );
            }

            return (
              <li key={item.id}>
                <NavItem to={item.to} icon={item.icon} label={item.label} active={active} />
              </li>
            );
          })}

          <li>
            <div
              onClick={logout}
              className="px-3 py-2 rounded-md flex gap-x-2 items-center w-full text-[#4040f6] bg-white hover:bg-red-500 hover:text-white cursor-pointer transition-colors"
            >
              <span className="text-xl">
                <IoLogOutOutline />
              </span>
              <span>Logout</span>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;


