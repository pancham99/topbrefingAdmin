import React, { useState, useRef } from "react";
import FormInput from "../Inputs/FormInput";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import { register } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
const Register = () => {

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
 const navigate = useNavigate();
  const dispatch = useDispatch();

  // OPTIONAL: refs (useful if you want focus control)
  const nameRef = useRef(null);

  // Handle Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Simple Validation
  const validate = () => {
    let newErrors = {};

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.phone && formData.phone.length !== 10)
      newErrors.phone = "Phone number must be 10 digits";
    

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

   setLoading(true); // ✅ ADD THIS
    dispatch(register(formData))
      .unwrap()
      .then((res) => {
        toast.success(res?.data?.message || "Register Successfully");
        navigate("/emailverifycheck");
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

      {/* RIGHT PANEL */}

      <div className="flex justify-center items-center w-full  bg-linear-to-t from-[#eb5f28] to-[#bf88f1] px-5">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.15)]">

          <h2 className="text-2xl font-bold text-center">Create Account</h2>

          <div className="">
            <form
              onSubmit={handleSubmit}
              className=" w-full space-y-2"
            >


              {/* NAME */}
              <FormInput
                ref={nameRef}
                label="User Name"
                name="username"
                placeholder="User Name"
                icon={FaUser}
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
                required
              />

              {/* EMAIL */}
              <FormInput
                label="Email"
                type="email"
                name="email"
                placeholder="Enter your email"
                icon={FaEnvelope}
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />

              {/* PHONE */}
              <FormInput
                label="Phone Number"
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                icon={FaPhone}
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
              />

              {/* PASSWORD */}
              <FormInput
                label="Password"
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
              />



              {/* SUBMIT */}
              <Button variant="primary" size="md" className="w-full">
                Register
              </Button>

            </form>
            <Link to="/login" className="text-sm text-gray-600 hover:underline block text-center mt-4">
              Already have an account? Log in
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Register