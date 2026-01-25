import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  label,
  name,
  placeholder = "Enter",
  type = "text",
  value,
  onChange,
  required = false,
  isPasswordVisible,
  togglePasswordVisibility,
  error,
  rows = 4,
  maxLength,
  minLength,
  disabled = false,
  className = "",
  dir = "ltr",

  rightActions = [], // 👈 Array of { icon: <Icon />, onClick: fn }
}) => {
  const inputType =
    type === "password" ? (isPasswordVisible ? "text" : "password") : type;

  const baseStyles = `
    w-full bg-white text-default-text placeholder-zinc-400
    rounded-xl py-2.5 px-4 outline-none border border-[#0A0D3226] 
    focus:ring-1 focus:ring-[#5041BC] transition-all duration-200
    disabled:opacity-60 disabled:cursor-not-allowed
    ${error ? "border-red-500" : ""}
    ${className}
  `;

  return (
    <div className="w-full flex flex-col gap-1">
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900 mb-0.5"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {/* Input / Textarea */}
        {type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            maxLength={maxLength}
            minLength={minLength}
            disabled={disabled}
            dir={dir}
            className={`${baseStyles} resize-none`}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            minLength={minLength}
            disabled={disabled}
            dir={dir}
            className={`${baseStyles} h-12 pr-12`} // padding for right icons
          />
        )}

        {/* Password Eye Icon */}
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 text-[#7038C4] hover:text-violet-500 focus:outline-none cursor-pointer"
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}

        {/* Multiple Right Actions */}
        {rightActions.length > 0 && (
          <div className="absolute right-3 flex items-center gap-2">
            {rightActions.map((action, index) => (
              <button
                key={index}
                type="button"
                onClick={action.onClick}
                className="text-gray-400 hover:text-gray-200 focus:outline-none"
              >
                {action?.icon}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Error Text */}
      {error && (
        <p className="text-red-500 text-xs font-normal mt-0.5">{error}</p>
      )}
    </div>
  );
};

export default Input;
