import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

import { FaChevronDown } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { MdLogout, MdOutlineLeaderboard } from "react-icons/md";

const Sidebar = ({ isSidebarOpen }) => {

  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});
  const [, setActiveMenu] = useState("");
  const [confirmOpen, setOpenConfirm] = useState(false);

  const navigate = useNavigate();

  const navigation = [
    {
      name: "Dashboard",
      href: "/app/dashboard",
      icon: RxDashboard,
      resource: "dashboard",
      action: "dashboard",
    },
    {
      name: "Manage Users",
      href: "/app/users",
      icon: MdOutlineLeaderboard,
    },
    {
      name: "Publish News",
      href: "/app/publish",
      icon: MdOutlineLeaderboard,
    },
  ];


  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-screen 
        bg-red-800
        border-t border-r rounded-tr-2xl text-white 
        transition-all duration-300 flex flex-col z-50 px-3 py-1 shadow-inner 
        ${isSidebarOpen ? "w-60 opacity-100" : "w-0 opacity-0"}`}
      >
        {/* Logo */}
        <div className="pt-6 px-2  pb-3 border-b-2 border-white w-full">
          <Link
            to="/"
            className="flex  items-center  gap-1 transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className={`transition-all duration-300 h-10  object-contain ${isSidebarOpen ? "" : ""
                }`}
            />
            <h2 className={`transition-all duration-300 h-10 font-semibold text-xl ${isSidebarOpen ? "" : "w-10"
              }`}>Top Brefing</h2>

          </Link>
        </div>

        {/* Scrollable Area */}
        <div className="flex-1 py-10 overflow-y-auto scrollbar-hide">
          <div className="space-y-3 px-3 pb-24">
            {navigation.map((item, idx) => {
              const isActive =
                location.pathname === item.href ||
                location.pathname.startsWith(item.href + "/") ||
                item.children?.some(
                  (child) =>
                    location.pathname === child.href ||
                    location.pathname.startsWith(child.href + "/")
                );

              const isSubmenuOpen = openMenus[item.name];

              return (
                <div key={idx}>
                  {/* If submenu */}
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.name)}
                        className={`w-full flex items-center justify-start gap-4 rounded-xl  py-3.5 
                        transition-all duration-300 group relative overflow-hidden transform hover:scale-[1.02]
                        ${isActive
                            ? "text-black bg-white backdrop-blur-lg shadow-[0_0_4px_0_#F16024] w-full"
                            : "text-white font-semibold bg-[#999999]/20 backdrop-blur-xl shadow-[0_0_2px_0_#CCCCCC] hover:bg-[#999999]/30 hover:shadow-[0_0_3px_0_#CCCCCC]"
                          }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <item.icon className="w-5 h-5 relative z-10" />
                        {isSidebarOpen && (
                          <>
                            <span className="flex-1 text-md font-medium tracking-wider relative z-10">
                              {item.name}
                            </span>
                            <FaChevronDown
                              className={`w-3 h-3 transition-transform duration-300 relative z-10 ${isSubmenuOpen ? "rotate-180" : "rotate-0"
                                }`}
                            />
                          </>
                        )}
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${isSidebarOpen && isSubmenuOpen
                            ? "max-h-96 opacity-100 mt-2"
                            : "max-h-0 opacity-0"
                          }`}
                      >
                        <div className="ml-6 pl-4 space-y-2 border-l-2 border-[#F16024]/30 relative">
                          {/* Animated border indicator */}
                          <div
                            className={`absolute left-0 top-0 w-0.5 bg-gradient-to-b from-[#F16024] to-transparent transition-all duration-500 ${isSubmenuOpen ? "h-full" : "h-0"
                              }`}
                          ></div>

                          {item.children.map((child, cidx) => {
                            const isChildActive =
                              location.pathname === child.href;
                            return (
                              <Link
                                key={cidx}
                                to={child.href}
                                className={`block text-sm rounded-lg py-2.5 px-5 transition-all duration-300 group relative overflow-hidden transform hover:translate-x-1
                                ${isChildActive
                                    ? "text-black bg-white backdrop-blur-lg shadow-[0_0_4px_0_#F16024] scale-[1.02]"
                                    : "text-white/90 font-medium bg-[#999999]/15 backdrop-blur-xl shadow-[0_0_1px_0_#CCCCCC] hover:bg-[#999999]/30 hover:text-white hover:shadow-[0_0_2px_0_#CCCCCC]"
                                  }`}
                                style={{
                                  transitionDelay: `${cidx * 50}ms`,
                                }}
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                <div className="flex items-center gap-2 relative z-10">
                                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50"></span>
                                  <span>{child.name}</span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Normal link */
                    <Link to={item.href}>
                      <div
                        className={`w-full flex justify-start items-center gap-2 rounded-xl px-5 py-3.5 
                        transition-all duration-300 group relative overflow-hidden transform hover:scale-[1.02]
                        ${isActive
                            ? "text-black bg-white backdrop-blur-lg shadow-[0_0_4px_0_#F16024]"
                            : "text-white font-semibold bg-[#999999]/20 backdrop-blur-xl shadow-[0_0_2px_0_#CCCCCC] hover:bg-[#999999]/30 hover:shadow-[0_0_3px_0_#CCCCCC]"
                          }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <item.icon className="w-5 h-5 relative z-10" />
                        {isSidebarOpen && (
                          <span className="text-md font-medium tracking-wider relative z-10">
                            {item.name}
                          </span>
                        )}
                      </div>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </aside>
    </>
  )
}

export default Sidebar