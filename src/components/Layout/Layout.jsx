import React, { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const audioRef = useRef(null);

    return (
        <div className="min-h-screen  my-scroll flex bg-white">
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

            <div
                className={`transition-all duration-300 w-full ease-in-out ${isSidebarOpen ? "md:ml-60" : "ml-0"
                    }`}
            >
                <Header
                    // title={title}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />


                <main className="md:p-6 bg-[rgb(246,246,246)] w-full h-full ">
                    <div className="w-full mx-auto">

                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
