import { useState, useEffect } from "react";
import useVerify from "./_hook/useVerify";
import VerifyInput from "./VerifyInput"; // Import the OTPInput component
import { useAuth } from "../_store/AuthContext";

export default function VerifyForm() {
  const { formik, handleResendOTP, seconds, canResend, resendProgress } =
    useVerify();
  const [otp, setOtp] = useState<Array<number | undefined>>(
    Array(6).fill(undefined),
  );

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    await formik.setFieldValue("otpCode", Number(otpCode));
    formik.handleSubmit(); // Submit the Formik form
  };

  return (
    <form
      className="mx-auto mt-2 w-fit space-x-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <VerifyInput otp={otp} setOtp={setOtp} />

      <div className="my-2 flex items-center justify-end text-sm">
        <span className="mx-2 font-bold">{seconds} giây</span>
        <button
          disabled={!canResend}
          onClick={handleResendOTP}
          type="button"
          className="text-gray-400 transition duration-300 hover:text-black"
        >
          {resendProgress ? "Đang gửi OTP" : "Gửi lại OTP"}
        </button>
      </div>

      <button
        type="submit"
        className="mt-2 block w-full rounded-full bg-black p-4 text-center text-sm text-white"
      >
        Xác minh
      </button>
    </form>
  );
}
