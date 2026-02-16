import React, { useEffect, useState } from 'react';
import { FaCalendar, FaCheckCircle, FaMailchimp, FaPhone, FaShieldAlt } from 'react-icons/fa';
import { FaUser, FaGlobe, FaLanguage, FaClock } from 'react-icons/fa';

import { IoSettings } from 'react-icons/io5';

import { useDispatch, useSelector } from 'react-redux';
import DetailRow from '../../components/DetailRow/DetailRow';
import StatusCard from '../../components/StatusCard/StatusCard';

import { updateProfile } from '../../store/slices/userSlice';
import {getProfile} from '../../store/slices/userSlice';
import UpdateProfileModal from '../../components/UI/UpdateProfileModal';



const formatDateTime = (date) => {
  if (!date) return 'Never';
  return new Date(date).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
};

const timeAgo = (date) => {
  if (!date) return '';
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hrs ago`;
  return `${Math.floor(hrs / 24)} days ago`;
};

const maskIP = (ip) => {
  if (!ip) return 'Unknown';
  const parts = ip.split('.');
  return parts.length === 4
    ? `${parts[0]}.xxx.xxx.${parts[3]}`
    : 'Unknown';
};



const Profile = () => {

  const profileData = useSelector((state) => state.user);
  console.log(profileData,"profileData")
  const userData = profileData?.profile || [];
  const dispatch = useDispatch();

  console.log(userData,"profile")

  const [activeTab, setActiveTab] = useState('overview');
  const [showEdit, setShowEdit] = useState(false);

  const getInitials = (name) => {
    return name?.split('_').map(n => n[0]).join('').slice(0, 2) || 'SA';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const groupPermissions = (permissions) => {
    const groups = {};
    permissions?.forEach(permission => {
      const [module, action] = permission.split('.');
      if (!groups[module]) {
        groups[module] = [];
      }
      groups[module].push(action);
    });
    return groups;
  };

  const handleUpdate = (data) => {
    
    dispatch(updateProfile(data)).then(() => setShowEdit(false));
  };



useEffect(() => {
  dispatch(getProfile());
}, [dispatch]);

  const permissionGroups = groupPermissions(userData?.role_id?.permissions);

  return (
    <div className="">
      <div className="">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-red-600 to-red-900"></div>
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-16">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl border-4 border-white">
                  {getInitials(userData.fullName)}
                </div>
                {userData.isActive ? (
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                ) : (


                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-red-500 rounded-full border-4 border-white"></div>

                )}

                {/* {userData.isActive && (
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                )} */}

              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 sm:mt-0">
                  <div>
                    <h1 className="text-3xl font-bold text-white">{userData?.fullName}</h1>
                    <p className="text-white mt-1">@{userData?.username}</p>
                    <button
                      onClick={() => setShowEdit(true)}
                      className="px-4 py-2 bg-white text-red-600 rounded-lg font-medium"
                    >
                      Edit Profile
                    </button>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        <FaShieldAlt className="w-4 h-4" />
                        {userData?.roles?.id}
                      </span>
                      {userData?.is_owner && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                          <FaCheckCircle className="w-4 h-4" />
                          Owner
                        </span>
                      )}
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${userData?.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                        {userData?.status ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  {/* <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 font-medium transition-colors ${activeTab === 'overview'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('permissions')}
              className={`px-6 py-4 font-medium transition-colors ${activeTab === 'permissions'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Permissions
            </button>

            <button
              onClick={() => setActiveTab('Details')}
              className={`px-6 py-4 font-medium transition-colors ${activeTab === 'Details'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Details
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact Information */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaMailchimp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-gray-900 font-medium">
                      {userData?.email === "false" ? 'Not provided' : userData?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FaPhone className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Mobile</p>
                    <p className="text-gray-900 font-medium">
                      {userData?.phone || 'Not provided'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FaCalendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p className="text-gray-900 font-medium">{formatDate(userData?.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Account Details</h2>
              <div className="space-y-4">


                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
                  <p className="text-sm text-gray-600 mb-1">Role</p>
                  <p className="text-xs text-gray-800 font-mono break-all">{userData?.username}</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                  <p className="text-sm text-gray-600 mb-1">Total Permissions</p>
                  <p className="text-2xl font-bold text-gray-900">{userData?.role_id?.permissions.length}</p>
                </div>

                <div className="flex gap-2">
                  <div className={`flex-1 p-3 rounded-lg text-center ${userData?.is_employee ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'
                    }`}>
                    <p className="text-xs text-gray-600">Employee</p>
                    <p className="text-sm font-semibold text-gray-900">{userData?.is_employee ? 'Yes' : 'No'}</p>
                  </div>
                  <div className={`flex-1 p-3 rounded-lg text-center ${userData?.is_owner ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50 border border-gray-200'
                    }`}>
                    <p className="text-xs text-gray-600">Owner</p>
                    <p className="text-sm font-semibold text-gray-900">{userData?.is_owner ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Role Permissions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(permissionGroups).map(([module, actions]) => (
                <div key={module} className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-3 capitalize flex items-center gap-2">
                    <IoSettings className="w-4 h-4 text-blue-600" />
                    {module.replace(/_/g, ' ')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {actions.map((action) => (
                      <span
                        key={action}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-white text-gray-700 rounded text-xs font-medium border border-gray-200"
                      >
                        <FaCheckCircle className="w-3 h-3 text-green-600" />
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Details' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Personal Details */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FaUser className="text-blue-600" />
                Personal Details
              </h2>

              <div className="space-y-4">
                <DetailRow label="Full Name" value={userData?.fullName} />
                <DetailRow label="Username" value={`@${userData?.username}`} />
                <DetailRow
                  label="Gender"
                  value={userData?.gender ? userData.gender.replace(/_/g, ' ') : 'Not provided'}
                />
                <DetailRow
                  label="Date of Birth"
                  value={userData?.dateOfBirth ? formatDate(userData.dateOfBirth) : 'Not provided'}
                />
              </div>
            </div>

            {/* Location & Preferences */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FaGlobe className="text-green-600" />
                Location & Preferences
              </h2>

              <div className="space-y-4">
                <DetailRow label="Country" value={userData?.country || 'Not provided'} />
                <DetailRow label="City" value={userData?.city || 'Not provided'} />
                <DetailRow
                  label="Language"
                  value={userData?.language?.toUpperCase() || 'Not set'}
                  icon={<FaLanguage />}
                />
                <DetailRow
                  label="Timezone"
                  value={userData?.timezone || 'Not set'}
                  icon={<FaClock />}
                />
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FaShieldAlt className="text-purple-600" />
                Account Status
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatusCard
                  label="Email Verified"
                  value={userData?.isEmailVerified}
                />
                <StatusCard
                  label="Phone Verified"
                  value={userData?.isPhoneVerified}
                />
                <StatusCard
                  label="Two Factor Auth"
                  value={userData?.twoFactorEnabled}
                />
              </div>

              {/* Login & Security Activity */}
              <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2 mt-5">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FaClock className="text-red-600" />
                  Login & Security Activity
                </h2>

                {userData?.loginHistory?.length > 0 ? (
                  (() => {
                    const lastLogin =
                      userData.loginHistory[userData.loginHistory.length - 1];

                    return (
                      <>
                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                          <StatusCard
                            label="Total Logins"
                            value={userData.loginHistory.length}
                          />
                          <StatusCard
                            label="Last Login"
                            value={timeAgo(userData.lastLogin)}
                          />
                          <StatusCard
                            label="Device"
                            value={lastLogin?.userAgent?.split(')')[0] + ')'}
                          />
                          <StatusCard
                            label="IP Address"
                            value={maskIP(lastLogin?.ip)}
                          />
                        </div>

                        {/* Recent Login Table */}
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-gray-100 text-gray-600">
                                <th className="text-left px-4 py-2">Time</th>
                                {/* <th className="text-left px-4 py-2">Location</th> */}
                                <th className="text-left px-4 py-2">Device</th>
                                <th className="text-left px-4 py-2">IP</th>
                              </tr>
                            </thead>
                            <tbody>
                              {userData.loginHistory
                                .slice(-5)
                                .reverse()
                                .map((login, idx) => (
                                  <tr
                                    key={idx}
                                    className="border-b last:border-b-0 hover:bg-gray-50"
                                  >
                                    <td className="px-4 py-2">
                                      {formatDateTime(login.loginAt)}
                                    </td>
                                    {/* <td className="px-4 py-2">
                                      {login.location || 'Unknown'}
                                    </td> */}
                                    <td className="px-4 py-2 truncate max-w-xs">
                                      {login.userAgent}
                                    </td>
                                    <td className="px-4 py-2">
                                      {maskIP(login.ip)}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    );
                  })()
                ) : (
                  <p className="text-gray-500 text-sm">
                    No login activity recorded yet.
                  </p>
                )}
              </div>

            </div>
          </div>
        )}


        {showEdit && (
          <UpdateProfileModal
            user={userData}
            loading={profileData.loading}
            onSubmit={handleUpdate}
            onClose={() => setShowEdit(false)}
          />
        )}

      </div>
    </div>
  );
};

export default Profile;