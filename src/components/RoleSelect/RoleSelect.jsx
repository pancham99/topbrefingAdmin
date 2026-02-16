import React from "react";

const RoleSelect = ({ roles, value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded px-2 py-1 text-sm"
    >
      <option value="">Select role</option>
      {roles.map((role) => (
        <option key={role._id} value={role._id}>
          {role.name.replaceAll("_", " ").toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default RoleSelect;
