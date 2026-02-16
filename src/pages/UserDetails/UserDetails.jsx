import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../store/slices/userSlice";
import {
  FaArrowLeft,
  FaCheck,
  FaEnvelope,
  FaPhone,
  FaUserShield,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaUser,
  FaGlobe,
  FaLock,
  FaShieldAlt,
  FaHistory
} from "react-icons/fa";
import {
  FiMail,
  FiSmartphone,
  FiGlobe,
  FiLock,
  FiUserCheck,
  FiUserX
} from "react-icons/fi";
import { MdLanguage, MdCake } from "react-icons/md";

const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedUser: user, loading, error } = useSelector(
    (state) => state.user
  );

  // 🔐 USER ROLE & PERMISSIONS (ONLY THIS USER)
  const userRoles = user?.roles || [];

  // all permissions user actually has (multi-role safe)
  const userPermissions = [
    ...new Set(
      userRoles.flatMap(r => r.role?.permissions || [])
    )
  ];



  // primary role (for display)
  const primaryRole = userRoles[0]?.role;


  useEffect(() => {
    if (userId) {
      dispatch(getUserById({ userId }));
    }
  }, [dispatch, userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="w-48 h-6 bg-gray-200 rounded"></div>
          <div className="w-64 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUserX className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading User</h3>
          <p className="text-red-500 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER WITH BACK BUTTON */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-x-1"
          >
            <FaArrowLeft className="text-gray-500 group-hover:text-gray-800 transition-colors" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              Back to Users
            </span>
          </button>

          <div className="text-xs text-gray-500 px-3 py-1.5 bg-white rounded-lg shadow-sm">
            User ID: <span className="font-mono font-semibold">{userId}</span>
          </div>
        </div>

        {/* USER PROFILE HEADER */}
        <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              {/* USER AVATAR & BASIC INFO */}
              <div className="flex items-start gap-5">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center text-3xl font-bold shadow-lg">
                    {user.fullName?.[0]}
                  </div>
                  {user.isActive && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <FaCheck className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{user.fullName}</h1>
                    <div className="flex gap-2">
                      <Badge color={user.isActive ? "green" : "red"}>
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                      {user.isEmailVerified && (
                        <Badge color="blue">Email Verified</Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-1">
                    <span className="font-semibold">@{user.username}</span>
                    <span className="mx-2">•</span>
                    {user.roles?.[0]?.role?.name || "No Role Assigned"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Last login: {user.loginHistory?.[0]?.loginAt ? formatDateTime(user.loginHistory[0].loginAt) : "Never"}
                  </p>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 flex-wrap">
                <ActionBtn
                  color="gray"
                  icon={<FaLock />}
                >
                  Reset Password
                </ActionBtn>
                <ActionBtn
                  color={user.isActive ? "red" : "green"}
                  icon={user.isActive ? <FiUserX /> : <FiUserCheck />}
                >
                  {user.isActive ? "Suspend User" : "Activate User"}
                </ActionBtn>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN - USER INFORMATION */}
          <div className="lg:col-span-2 space-y-6">
            {/* ACCOUNT INFORMATION */}
            <Card
              title="Account Information"
              icon={<FaUserShield className="w-5 h-5 text-red-600" />}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Info
                  icon={<FiMail />}
                  label="Email Address"
                  value={user.email}
                  verified={user.isEmailVerified}
                />
                <Info
                  icon={<FiSmartphone />}
                  label="Phone Number"
                  value={user.phone}
                />
                <Info
                  icon={<FaUser />}
                  label="User Role"
                  value={user.roles?.[0]?.role?.name}
                />
                <Info
                  icon={<MdLanguage />}
                  label="Preferred Language"
                  value={user.language}
                />
                <Info
                  icon={<FaShieldAlt />}
                  label="Two-Factor Authentication"
                  value={user.twoFactorEnabled ? "Enabled" : "Disabled"}
                  badgeColor={user.twoFactorEnabled ? "green" : "gray"}
                />
                <Info
                  icon={<FiGlobe />}
                  label="Account Status"
                  value={user.isActive ? "Active" : "Suspended"}
                  badgeColor={user.isActive ? "green" : "red"}
                />
              </div>
            </Card>

            {/* PERSONAL INFORMATION */}
            <Card
              title="Personal Information"
              icon={<FaUser className="w-5 h-5 text-blue-600" />}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Info
                  icon={<FaUser />}
                  label="Gender"
                  value={user.gender}
                />
                <Info
                  icon={<FaCalendarAlt />}
                  label="Date of Birth"
                  value={formatDate(user.dateOfBirth)}
                />
                <Info
                  icon={<FaMapMarkerAlt />}
                  label="Country"
                  value={user.country}
                />
                <Info
                  icon={<FaMapMarkerAlt />}
                  label="City"
                  value={user.city}
                />
                <div className="md:col-span-2">
                  <Info
                    icon={<FaInfoCircle />}
                    label="Bio"
                    value={user.bio}
                    isLongText
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN - ACTIVITY & STATS */}


          <div className="space-y-6">
            {/* LOGIN ACTIVITY */}
            <Card
              title="Recent Login Activity"
              icon={<FaHistory className="w-5 h-5 text-purple-600" />}
              className="h-[420px] flex flex-col"
            >
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                {!user.loginHistory?.length ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaHistory className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">No login activity found</p>
                  </div>
                ) : (
                  user.loginHistory
                    ?.slice(0, 8)
                    .map((log) => (
                      <div
                        key={log._id}
                        className="group bg-gray-50 hover:bg-white p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-200"
                      >
                        <div className="flex gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-100 to-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                            <FaCheck className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm mb-1">
                              {formatDateTime(log.loginAt)}
                            </p>
                            <p className="text-xs text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded inline-block mb-1">
                              IP: {log.ip || "Unknown"}
                            </p>
                            <p
                              className="text-xs text-gray-500 truncate group-hover:text-clip group-hover:whitespace-normal"
                              title={log.userAgent}
                            >
                              {log.userAgent}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
              {user.loginHistory?.length > 8 && (
                <div className="pt-4 border-t border-gray-100">
                  <button className="text-sm text-gray-600 hover:text-gray-900 font-medium w-full text-center py-2 hover:bg-gray-50 rounded-lg transition-colors">
                    View All Activity ({user.loginHistory.length} total)
                  </button>
                </div>
              )}
            </Card>



            {/* QUICK STATS */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
              <h3 className="font-semibold text-lg mb-4">Account Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Logins</span>
                  <span className="font-bold text-xl">{user.loginHistory?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Account Age</span>
                  <span className="font-bold">{getAccountAge(user.createdAt)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Security Level</span>
                  <Badge color={user.twoFactorEnabled ? "green" : "yellow"}>
                    {user.twoFactorEnabled ? "High" : "Medium"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <Card
          title="Role & Permissions"
          icon={<FaUserShield className="w-5 h-5 text-indigo-600" />}
        >
          {/* ROLE */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1">Assigned Role</p>
            <Badge color="purple">
              {userRoles.length === 0 ? (
                <p className="text-sm text-gray-400 italic">
                  No roles assigned to this user
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {userRoles.map((r) => (
                    <Badge key={r.role?._id} color="purple">
                      {r.role?.name}
                    </Badge>
                  ))}
                </div>
              )}
            </Badge>
          </div>

          {/* PERMISSIONS */}
          <div>
            <p className="text-xs text-gray-500 mb-3">Permissions</p>

            {userPermissions.length === 0 ? (
              <p className="text-sm text-gray-400 italic">
                No permissions assigned to this user
              </p>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {userPermissions.map((perm) => (
                  <div
                    key={perm}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-50 border rounded-lg"
                  >
                    <FaCheck className="text-green-600 text-xs" />
                    <span className="text-sm text-gray-800 capitalize">
                      {perm.replaceAll('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>

    </div>
  );
};

// COMPONENTS
const Card = ({ title, children, icon, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden ${className}`}>
    <div className="p-6 border-b border-gray-100">
      <div className="flex items-center gap-3">
        {icon}
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const Info = ({ label, value, icon, verified = false, badgeColor, isLongText = false }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2 text-sm text-gray-500">
      {icon}
      <span>{label}</span>
      {verified && (
        <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
          <FaCheck className="w-3 h-3" />
          Verified
        </span>
      )}
    </div>
    {badgeColor ? (
      <Badge color={badgeColor}>
        {value || "Not set"}
      </Badge>
    ) : (
      <p className={`font-medium text-gray-900 ${isLongText ? "text-sm leading-relaxed" : ""}`}>
        {value || (
          <span className="text-gray-400 italic">Not provided</span>
        )}
      </p>
    )}
  </div>
);

const Badge = ({ children, color }) => {
  const colorMap = {
    green: "bg-green-100 text-green-800 border border-green-200",
    red: "bg-red-100 text-red-800 border border-red-200",
    blue: "bg-blue-100 text-blue-800 border border-blue-200",
    yellow: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    purple: "bg-purple-100 text-purple-800 border border-purple-200",
    gray: "bg-gray-100 text-gray-800 border border-gray-200",
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colorMap[color] || colorMap.gray}`}>
      {children}
    </span>
  );
};

const ActionBtn = ({ children, color = "gray", icon }) => {
  const colorMap = {
    red: "bg-red-600 text-white hover:bg-red-700 shadow-red-200",
    green: "bg-green-600 text-white hover:bg-green-700 shadow-green-200",
    gray: "bg-gray-800 text-white hover:bg-gray-900 shadow-gray-200",
    blue: "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200",
  };

  return (
    <button
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-200 hover:shadow-lg ${colorMap[color]}`}
    >
      {icon}
      {children}
    </button>
  );
};

// UTILITY FUNCTIONS
const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}) : "Not set";

const formatDateTime = (d) => d ? new Date(d).toLocaleString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}) : "Never";

const getAccountAge = (createdAt) => {
  if (!createdAt) return "Unknown";
  const created = new Date(createdAt);
  const now = new Date();
  const diffTime = Math.abs(now - created);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 30) return `${diffDays} days`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months`;
  return `${Math.floor(diffDays / 365)} years`;
};

// Add to your global CSS
const customScrollbar = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
  }
`;

// Add this style tag to your component or global CSS
<style>{customScrollbar}</style>

export default UserDetails;