import React from "react";

const Button = ({
  children,
  variant = "primary", // primary | accent | outline | ghost
  size = "md",         // sm | md | lg
  loading = false,
  disabled = false,
  className = "",
  onClick,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-bold uppercase tracking-wide transition-all duration-200 focus:outline-none focus:ring-2";

  const variants = {
    primary:
      "bg-red-600 text-white hover:bg-[#8f0000] focus:ring-[#B00000]",
    accent:
      "bg-[#FFD400] text-black hover:bg-[#e6bf00] focus:ring-[#FFD400]",
    outline:
      "border-2 border-[#B00000] text-[#B00000] hover:bg-[#B00000] hover:text-white focus:ring-[#B00000]",
    ghost:
      "text-white hover:bg-white/10 focus:ring-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs rounded-md",
    md: "px-6 py-3 text-sm rounded-lg",
    lg: "px-8 py-4 text-base rounded-xl",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${base}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
