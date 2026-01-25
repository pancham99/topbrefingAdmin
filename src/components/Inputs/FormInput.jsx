import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const FormInput = React.forwardRef(
    (
        {
            label,
            type = "text",
            error = "",
            textarea = false,
            select = false,
            options = [],
            icon: Icon,
            required = false,
            className = "",
            placeholder = "",
            ...rest
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === "password";

        const borderColor = error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-black";

        const baseClasses =
            `w-full border rounded-lg p-3 outline-none transition-all bg-white focus:ring-2 ${borderColor}`;

        const withIconPadding = Icon ? "pl-10" : "";

        return (
            <div className="w-full">
                {/* LABEL */}
                {label && (
                    <label className="block mb-1 font-medium text-gray-700">
                        {label} {required && <span className="text-red-500">*</span>}
                    </label>
                )}

                <div className="relative">
                    {/* TEXTAREA */}
                    {textarea ? (
                        <textarea
                            ref={ref}
                            className={`${baseClasses} min-h-[100px] ${withIconPadding} ${className}`}
                            {...rest}
                        />
                    ) : select ? (
                        /* SELECT INPUT */
                        <select
                            ref={ref}
                            className={`${baseClasses} appearance-none ${withIconPadding} ${className}`}
                            {...rest}
                        >
                            {/* ALWAYS SHOW PLACEHOLDER */}
                            <option value="" disabled selected>
                                {placeholder}
                            </option>

                            {options.map((opt, i) => (
                                <option key={i} value={opt.value ?? opt}>
                                    {opt.label ?? opt}
                                </option>
                            ))}
                        </select>

                    ) : (
                        /* ALL INPUT TYPES */
                        <input
                            ref={ref}
                            type={isPassword ? (showPassword ? "text" : "password") : type}
                            className={`${baseClasses} pr-12 ${withIconPadding} ${className}`}
                            placeholder={placeholder}
                            onInput={(e) => {
                                const max = rest.maxLength || rest.max;

                                // ✅ ONLY skip trimming for date type
                                if (type !== "date") {
                                    if (max && e.target.value.length > max) {
                                        e.target.value = e.target.value.slice(0, max);
                                    }
                                }

                                if (rest.onInput) rest.onInput(e);
                            }}
                            {...rest}
                        />
                    )}

                    {/* LEFT ICON */}
                    {Icon && (
                        <Icon className="absolute left-3 top-3.5 text-gray-400 text-xl pointer-events-none" />
                    )}

                    {/* PASSWORD SHOW/HIDE */}
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-600"
                        >
                            {showPassword ? (
                                <IoEyeOffOutline size={20} />
                            ) : (
                                <IoEyeOutline size={20} />
                            )}
                        </button>
                    )}
                </div>

                {/* ERROR MESSAGE */}
                {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            </div>
        );
    }
);

export default FormInput;
