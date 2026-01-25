import React, { useState } from 'react';
import { FaCalendar, FaCheckCircle, FaMailchimp, FaPhone, FaShieldAlt } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';

import { useSelector } from 'react-redux';

const Profile = () => {


  // const selector = useSelector((state)=>state.admin)
  const profileData = useSelector((state) => state.auth);


  const userData = profileData?.loginData?.user || [];

  console.log("selector in profile page", userData)

  const [activeTab, setActiveTab] = useState('overview');

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

  const permissionGroups = groupPermissions(userData?.role_id?.permissions);

  return (
    <div className="">
      <div className="">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-16">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl border-4 border-white">
                  {getInitials(userData.fullName)}
                </div>
                {userData.isActive ?  (
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                ):(

                
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
                    <p className="text-gray-600 mt-1">@{userData?.username}</p>
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
                      {userData?.mobile || 'Not provided'}
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
      </div>
    </div>
  );
};

export default Profile;