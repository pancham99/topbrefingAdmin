import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/slices/userSlice";

import { getAllRoles, updateUserRole } from "../../store/slices/roleSlice";
import RoleSelect from "../../components/RoleSelect/RoleSelect";

import { useNavigate } from "react-router-dom";

import { AiOutlineEye } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Users = () => {
  const { roles } = useSelector((state) => state.roles);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, error, pagination } = useSelector(
    (state) => state.user
  );



  console.log(list, "userslist");

  useEffect(() => {
    dispatch(getAllUsers({ page: 1, limit: 20 }));
    dispatch(getAllRoles());
  }, [dispatch]);

  const handleRoleChange = (userId, roleId) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [userId]: roleId,
    }));
  };

  const handleUpdateRole = (userId) => {
    const roleId = selectedRoles[userId];
    if (!roleId) return alert("Please select a role");

    dispatch(updateUserRole({ userId, roleId }))
      .then(() => dispatch(getAllUsers({ page: 1, limit: 20 })));
  };

  if (loading) {
    return <p className="text-center py-10">Loading users...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">All Users</h2>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Created</th>
              {/* <th className="px-3 py-2">Current Role</th> */}
              {/* <th className="px-3 py-2">Change Role</th> */}
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              list.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="px-4 py-2">{user.fullName}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    {user.roles?.[0]?.role?.name || "User"}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${user.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td className=" gap-2 py-2 flex">
                    <button
                      onClick={() => navigate(`/app/users/${user._id}`)}
                      className=" "
                    >
                      <AiOutlineEye size={24} className="text-green-500" />
                    </button>

                    {/* <button onClick={() => setSelectedUser(user)}>
                      <FiEdit size={20} className="text-blue-500" />
                    </button> */}

                    <button
                      // onClick={() => handleUpdateRole(user._id)}
                      className=" "
                    >
                      <MdDelete size={20} className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


      {/* {selectedUser && (
        <AdminUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onToggleActive={(u) => {
            dispatch(toggleUserStatus({ userId: u._id }));
            setSelectedUser(null);
          }}
          onSuspend={(u) => {
            dispatch(suspendUser({ userId: u._id }));
            setSelectedUser(null);
          }}
          onResetPassword={(u) => {
            dispatch(resetUserPassword({ userId: u._id }));
            setSelectedUser(null);
          }}
        />
      )} */}


      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Page {pagination.page} of {pagination.pages}
        </p>

        <div className="flex gap-2">
          <button
            disabled={pagination.page <= 1}
            onClick={() =>
              dispatch(
                getAllUsers({
                  page: pagination.page - 1,
                  limit: pagination.limit,
                })
              )
            }
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <button
            disabled={pagination.page >= pagination.pages}
            onClick={() =>
              dispatch(
                getAllUsers({
                  page: pagination.page + 1,
                  limit: pagination.limit,
                })
              )
            }
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
