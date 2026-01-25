import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL } from "../../api/axios";
import { verifyEmail, resetEmailVerification } from "../../store/slices/authSlice";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";

const EmailVerify = () => {
const { token } = useParams();
   console.log(token, "token");

  // Debugging line

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, emailVerified } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!token) {
      toast.error("Invalid verification link");
    }

    return () => {
      dispatch(resetEmailVerification());
    };
  }, [token, dispatch]);

  const handleVerify = () => {
    if (!token) {
      toast.error("Verification token missing");
      return;
    }

    dispatch(verifyEmail({ token }))
      .unwrap()
      .then((res) => {
        toast.success(res?.message || "Email verified successfully");
        setTimeout(() => navigate("/login"), 1500);
      })
      .catch((err) => {
        toast.error(err?.message || "Email verification failed");
      });
  };


  return (
    <div className="flex h-screen w-full">
      {/* LEFT IMAGE */}
      <div className="hidden md:block w-1/2">
        <img
          src="/banner.jpeg"
          alt="Email Verification"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex justify-center items-center w-full md:w-1/2 bg-linear-to-t from-[#eb5f28] to-[#bf88f1] px-5">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center space-y-4">
          <h2 className="text-2xl font-bold">Email Verification</h2>

          <p className="text-gray-600">
            Click the button below to verify your email address.
          </p>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <Button
            variant="primary"
            className="w-full"
            loading={loading}
            disabled={loading}
            onClick={handleVerify}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
