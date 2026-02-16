import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoles, selectRole } from "../../store/slices/roleSlice";

const Roles = () => {
  const dispatch = useDispatch();
  const { roles, selectedRole, loading } = useSelector(
    (state) => state.roles
  );

  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch]);

  if (loading) return <p>Loading roles...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* ROLE LIST */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-3">Roles</h3>
        <ul className="space-y-2">
          {roles.map((role) => (
            <li
              key={role._id}
              onClick={() => dispatch(selectRole(role))}
              className={`cursor-pointer px-3 py-2 rounded ${
                selectedRole?._id === role._id
                  ? "bg-red-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {role.name}
            </li>
          ))}
        </ul>
      </div>

      {/* PERMISSIONS */}
      <div className="md:col-span-2 bg-white p-4 rounded shadow">
        {!selectedRole ? (
          <p>Select a role to view permissions</p>
        ) : (
          <>
            <h3 className="font-bold mb-3">
              Permissions – {selectedRole.name}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {selectedRole.permissions.map((perm) => (
                <span
                  key={perm}
                  className="px-2 py-1 text-sm bg-green-100 text-green-700 rounded"
                >
                  {perm}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Roles;
