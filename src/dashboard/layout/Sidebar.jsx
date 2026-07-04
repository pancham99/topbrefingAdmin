import { useState, useContext, useMemo, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AiFillDashboard,
} from "react-icons/ai";
import { BiNews } from "react-icons/bi";
import {
  FiUsers, FiChevronDown, FiChevronRight,
  FiPlus, FiUser, FiLogOut, FiX,
} from "react-icons/fi";
import { PiFlagBannerFoldBold } from "react-icons/pi";
import { MdOutlineSubscriptions, MdVideoLibrary, MdMenu } from "react-icons/md";
import { RiVideoAddLine } from "react-icons/ri";
import { SiYoutube } from "react-icons/si";
import { HiOutlineNewspaper } from "react-icons/hi2";

import { BsMegaphone } from "react-icons/bs";
import storeContext from "../../context/storeContext";

/* ─── nav data ──────────────────────────────────────────────── */
const buildNav = (isAdmin) => [
  {
    id: "dashboard",
    label: "Dashboard",
    to: isAdmin ? "/dashboard/admin" : "/dashboard/writer",
    icon: AiFillDashboard,
  },
  {
    id: "news",
    label: "News",
    icon: HiOutlineNewspaper,
    children: isAdmin
      ? [
          { id: "news-list", label: "All News",  to: "/dashboard/news",        icon: BiNews },
        ]
      : [
          { id: "news-list",   label: "All News",  to: "/dashboard/news",        icon: BiNews },
          { id: "news-create", label: "Add News",  to: "/dashboard/news/create", icon: FiPlus },
          { id: "news-edit",   label: "Edit News", to: "/dashboard/news/edit",   icon: HiOutlineNewspaper, hidden: true },
        ],
  },
  isAdmin && {
    id: "writers",
    label: "Writers",
    icon: FiUsers,
    children: [
      { id: "add-writer", label: "Add Writer", to: "/dashboard/writer/add", icon: FiPlus },
      { id: "all-writers", label: "All Writers", to: "/dashboard/writers",   icon: FiUsers },
    ],
  },
  isAdmin && {
    id: "media",
    label: "Media & Videos",
    icon: MdVideoLibrary,
    children: [
      { id: "add-video",    label: "Add Video",        to: "/dashboard/addVideoContent", icon: RiVideoAddLine },
      { id: "all-videos",   label: "All Videos",       to: "/dashboard/videos",          icon: MdVideoLibrary },
      { id: "add-yt",       label: "Add YouTube",      to: "/dashboard/addyoutubeVideo", icon: FiPlus },
      { id: "all-yt",       label: "YouTube Videos",   to: "/dashboard/allyoutubeVideo", icon: SiYoutube },
    ],
  },
  isAdmin && {
    id: "banners",
    label: "Banners",
    icon: PiFlagBannerFoldBold,
    children: [
      { id: "add-banner", label: "Add Banner",  to: "/dashboard/createBanner", icon: FiPlus },
      { id: "all-banners", label: "All Banners", to: "/dashboard/banner",       icon: PiFlagBannerFoldBold },
    ],
  },
  isAdmin && {
    id: "ads",
    label: "Advertisements",
    icon: BsMegaphone,
    children: [
      { id: "add-ad",  label: "Add Ad",        to: "/dashboard/createAdvertisement", icon: FiPlus },
      { id: "all-ads", label: "All Ads",        to: "/dashboard/advertisement",       icon: BsMegaphone },
    ],
  },
  isAdmin && {
    id: "subscribers",
    label: "Subscribers",
    to: "/dashboard/subscribe",
    icon: MdOutlineSubscriptions,
  },
  {
    id: "profile",
    label: "Profile",
    to: "/dashboard/profile",
    icon: FiUser,
  },
].filter(Boolean);

/* ─── helpers ───────────────────────────────────────────────── */
const isChildActive = (children = [], pathname) =>
  children.some((c) => pathname === c.to || pathname.startsWith(c.to + "/"));

/* ─── NavItem ────────────────────────────────────────────────── */
const NavItem = ({ to, icon: Icon, label, active, onClick, indent }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`
      flex items-center gap-3 rounded-lg transition-all duration-150 group
      ${indent ? "px-3 py-2 ml-3 text-sm" : "px-3 py-2.5 text-sm font-medium"}
      ${active
        ? "bg-white/10 text-white"
        : "text-slate-400 hover:bg-white/5 hover:text-slate-200"}
    `}
  >
    {indent && (
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50 shrink-0" />
    )}
    {!indent && Icon && (
      <Icon
        size={17}
        className={`shrink-0 transition-colors ${active ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`}
      />
    )}
    <span className="truncate">{label}</span>
    {active && !indent && (
      <span className="ml-auto w-1 h-5 rounded-full bg-red-400 shrink-0" />
    )}
  </Link>
);

/* ─── GroupItem (collapsible) ───────────────────────────────── */
const GroupItem = ({ id, label, icon: Icon, children, openKeys, toggleKey, pathname, closeSidebar }) => {
  const open = !!openKeys[id];
  const active = isChildActive(children, pathname);

  return (
    <div>
      <button
        onClick={() => toggleKey(id)}
        aria-expanded={open}
        className={`
          w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
          transition-all duration-150 group
          ${active ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-slate-200"}
        `}
      >
        {Icon && (
          <Icon
            size={17}
            className={`shrink-0 transition-colors ${active ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`}
          />
        )}
        <span className="truncate flex-1 text-left">{label}</span>
        {open
          ? <FiChevronDown size={14} className="shrink-0 text-slate-500" />
          : <FiChevronRight size={14} className="shrink-0 text-slate-500" />}
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? `${children.length * 44}px` : "0px" }}
      >
        <div className="mt-0.5 flex flex-col gap-0.5 border-l border-white/10 ml-5 pl-2">
          {children
            .filter((c) => !c.hidden)
            .map((child) => (
              <NavItem
                key={child.id}
                to={child.to}
                icon={child.icon}
                label={child.label}
                active={pathname === child.to}
                onClick={closeSidebar}
                indent
              />
            ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Section label ─────────────────────────────────────────── */
const SectionLabel = ({ label }) => (
  <p className="px-3 pt-5 pb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-600 select-none">
    {label}
  </p>
);

/* ════════════════════════════════════════════════════════════ */
const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { store, dispatch } = useContext(storeContext);
  const isAdmin = store.userInfo?.role === "admin";

  /* mobile open state — lifted into Sidebar so Header can toggle via context or event */
  const [mobileOpen, setMobileOpen] = useState(false);

  /* auto-open groups that contain the active route */
  const nav = useMemo(() => buildNav(isAdmin), [isAdmin]);

  const defaultOpen = useMemo(() => {
    const result = {};
    nav.forEach((item) => {
      if (item.children && isChildActive(item.children, pathname)) {
        result[item.id] = true;
      }
    });
    return result;
  }, []);                             // eslint-disable-line

  const [openKeys, setOpenKeys] = useState(defaultOpen);
  const toggleKey = (key) => setOpenKeys((s) => ({ ...s, [key]: !s[key] }));

  /* expose mobile toggle via custom event so Header can call it */
  useEffect(() => {
    const handler = () => setMobileOpen((v) => !v);
    window.addEventListener("sidebar:toggle", handler);
    return () => window.removeEventListener("sidebar:toggle", handler);
  }, []);

  /* close on route change (mobile) */
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const closeSidebar = () => setMobileOpen(false);

  const logout = () => {
    localStorage.removeItem("newstoken");
    dispatch({ type: "logout", payload: "" });
    navigate("/login");
  };

  /* split nav into sections */
  const coreItems  = nav.filter((i) => ["dashboard", "news"].includes(i.id));
  const adminItems = nav.filter((i) => ["writers", "media", "banners", "ads", "subscribers"].includes(i.id));
  const bottomItems = nav.filter((i) => ["profile"].includes(i.id));

  const renderItem = (item) => {
    const active = item.to
      ? pathname === item.to || pathname.startsWith(item.to + "/")
      : false;

    if (item.children) {
      return (
        <GroupItem
          key={item.id}
          {...item}
          openKeys={openKeys}
          toggleKey={toggleKey}
          pathname={pathname}
          closeSidebar={closeSidebar}
        />
      );
    }
    return (
      <NavItem
        key={item.id}
        to={item.to}
        icon={item.icon}
        label={item.label}
        active={active}
        onClick={closeSidebar}
      />
    );
  };

  /* ── sidebar panel ── */
  const panel = (
    <aside className="flex flex-col w-[240px] h-screen bg-[#0f1117] border-r border-white/5">

      {/* logo */}
      <div className="flex items-center justify-between px-4 h-[64px] border-b border-white/5 shrink-0">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-red-500 rounded-md flex items-center justify-center shrink-0">
            <HiOutlineNewspaper size={15} className="text-white" />
          </div>
          <span className="text-white font-semibold text-sm tracking-tight">Top Briefing</span>
        </Link>
        {/* mobile close */}
        <button
          onClick={closeSidebar}
          className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10"
        >
          <FiX size={18} />
        </button>
      </div>

      {/* nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">

        {/* core */}
        <div className="flex flex-col gap-0.5">
          {coreItems.map(renderItem)}
        </div>

        {/* admin section */}
        {isAdmin && adminItems.length > 0 && (
          <>
            <SectionLabel label="Admin" />
            <div className="flex flex-col gap-0.5">
              {adminItems.map(renderItem)}
            </div>
          </>
        )}

        {/* general */}
        <SectionLabel label="Account" />
        <div className="flex flex-col gap-0.5">
          {bottomItems.map(renderItem)}
        </div>
      </nav>

      {/* user footer */}
      <div className="shrink-0 border-t border-white/5 p-3">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 transition group">
          <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0">
            <FiUser size={14} className="text-red-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-200 truncate">
              {store.userInfo?.name || "User"}
            </p>
            <p className="text-[10px] text-slate-500 capitalize truncate">
              {store.userInfo?.role || "writer"}
            </p>
          </div>
          <button
            onClick={logout}
            title="Logout"
            className="shrink-0 p-1.5 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition"
          >
            <FiLogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* ── Desktop ── */}
      <div className="hidden lg:block fixed left-0 top-0 z-30 h-screen">
        {panel}
      </div>

      {/* ── Mobile hamburger button ── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-[#0f1117] rounded-lg border border-white/10 text-slate-300 hover:text-white"
        aria-label="Open menu"
      >
        <MdMenu size={20} />
      </button>

      {/* ── Mobile overlay + drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeSidebar}
          />
          {/* drawer */}
          <div className="relative z-10 animate-slide-in">
            {panel}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
