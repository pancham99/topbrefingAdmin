import React, { useState } from "react";
import Input from "../Inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { localStorageSetItem } from "../../utils/GlobelFunction";
import { login } from "../../store/slices/authSlice";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });



  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // Basic validation
  const validate = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;


    // API CALL HERE
    dispatch(login(formData))
      .unwrap()
      .then((res) => {
        localStorageSetItem("adminData", res.data);

        toast.success(res?.data?.message || "Login Successfully");
        navigate("/app/dashboard");
      })
      .catch((err) => {
        toast.error(err.message);
        console.log("Login Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* LEFT PANEL */}
      <div className="h-full w-full">
        <div className="">
          {/* 👉 Replace this SVG with your original image */}
          <img src="/banner.jpeg" alt="Login Banner" className="w-full object-contain" />
        </div>
      </div>

      <div className="flex justify-center items-center w-full  bg-linear-to-t from-[#eb5f28] to-[#bf88f1] px-5">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-10 space-y-4 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.15)]"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>

          {/* EMAIL */}
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          {/* PASSWORD */}
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
            isPasswordVisible={isPasswordVisible}
            togglePasswordVisibility={() =>
              setIsPasswordVisible(!isPasswordVisible)
            }
          />

          {/* SUBMIT BUTTON */}
          <Button variant="primary" size="md" className="w-full">
            Login
          </Button>
          {/* REGISTER LINK */}
          <Link to="/register" className="text-sm flex justify-center text-gray-600 hover:underline ">
            Don't have an account? Register
          </Link>
        </form>

      </div>
    </div>
  );
};

export default Login;
