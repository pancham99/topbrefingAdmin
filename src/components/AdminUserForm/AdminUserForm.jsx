import React, { useState } from "react";

const AdminUserForm = ({ fields, user, onSubmit, loading }) => {
  const [values, setValues] = useState(user || {});

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      {fields.map((field) => {
        const value = values[field.name];

        return (
          <div key={field.name} className="col-span-1">
            <label className="text-sm font-medium mb-1 block">
              {field.label}
            </label>

            {/* TEXT / EMAIL */}
            {["text", "email"].includes(field.type) && (
              <input
                type={field.type}
                value={value || ""}
                disabled={field.disabled}
                onChange={(e) =>
                  handleChange(field.name, e.target.value)
                }
                className="w-full border rounded px-3 py-2"
              />
            )}

            {/* SELECT */}
            {field.type === "select" && (
              <select
                value={value}
                onChange={(e) =>
                  handleChange(field.name, e.target.value)
                }
                className="w-full border rounded px-3 py-2"
              >
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}

            {/* SWITCH */}
            {field.type === "switch" && (
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={!!value}
                  onChange={(e) =>
                    handleChange(field.name, e.target.checked)
                  }
                />
                <span>{field.label}</span>
              </label>
            )}
          </div>
        );
      })}

      <div className="col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded"
        >
          {loading ? "Saving..." : "Update User"}
        </button>
      </div>
    </form>
  );
};

export default AdminUserForm;
