import { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  useVerifyOTPForgetPasswordMutation,
  useResendOTPMutation,
} from "@/libs/features/services/auth";
import { useAuth } from "../../_store/AuthContext";

interface errorsValues {
  otpCode: string;
}

export default function useChangePassword() {
  const {
    setSignUp,
    setVerifying,
    setIsReset,
    email,
    setModalDisplay,
    setModalText,
    setVerifyChangePasword,
  } = useAuth();
  const [seconds, setSeconds] = useState<number>(5);
  const [canResend, setCanResend] = useState<boolean>(false);
  console.log(email);

  useEffect(() => {
    let timerId: any;
    if (seconds > 0) {
      timerId = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timerId);
  }, [seconds]);

  const [
    verify,
    { data: verifyResponse, error: verifyError, isLoading: verifyProgress },
  ] = useVerifyOTPForgetPasswordMutation();

  const [
    resendOTP,
    { data: resendResponse, error: resendError, isLoading: resendProgress },
  ] = useResendOTPMutation();

  async function handleResendOTP() {
    await resendOTP(email);
    setCanResend(false);
    setSeconds(5);
  }

  const formik = useFormik({
    initialValues: {
      email: email,
      otpCode: 0,
    },
    onSubmit: (values) => {
      console.log(values);
      verify(values);
    },
    validate: (values) => {
      let errors: Partial<errorsValues> = {};

      if (!values.otpCode) {
        setModalDisplay(true);
        setModalText("OTP không được để trống");
      }
      return errors;
    },
  });

  useEffect(() => {
    if (verifyError && "data" in verifyError) {
      setModalDisplay(true);
      setModalText((verifyError.data as any).message);
    } else if (resendError && "data" in resendError) {
      setModalText((resendError.data as any).message);
    }

    if (verifyResponse) {
      setModalText("Xác minh thành công");
      setSignUp(false);
      setVerifyChangePasword(false);
      setIsReset(true);
      setModalDisplay(true);
      setVerifying(false);
    } else if (resendResponse) {
      setModalText("Đã gửi mã OTP");
      setModalDisplay(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    verifyError,
    resendError,
    verifyResponse,
    resendResponse,
    setVerifying,
    setSignUp,
  ]);

  return {
    formik,
    handleResendOTP,
    seconds,
    canResend,
    resendProgress,
  };
}
