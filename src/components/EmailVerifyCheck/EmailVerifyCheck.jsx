import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL } from "../../api/axios";

const EmailVerify = () => {

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
        <div className="bg-white p-8 rounded-2xl shadow-2xl border max-w-md w-full text-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Please Check your email for Verifying your email
            </h2>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
