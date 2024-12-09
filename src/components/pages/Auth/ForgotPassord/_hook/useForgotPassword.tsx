/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useFormik } from "formik";
import { useForgotPasswordMutation } from "@/libs/features/services/auth";
import { useAuth } from "../../_store/AuthContext";

interface errorsValues {
  email: string;
}

export default function useForgotPassword() {
  const {
    setEmail,
    setForgotPassword,
    setModalDisplay,
    setModalText,
    setVerifyChangePasword,
  } = useAuth();

  const [
    sendOTP,
    { data: sendOTPResponse, error: sendOTPError, isLoading: sendOTPProgress },
  ] = useForgotPasswordMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      sendOTP(values.email);
    },
    validate: (values) => {
      let errors: Partial<errorsValues> = {};

      // Email validation using regular expression
      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      return errors;
    },
  });

  useEffect(() => {
    if (sendOTPError) {
      setModalDisplay(true);
      setModalText("Email không tồn tại");
    }
    if (sendOTPResponse) {
      setEmail(formik.values.email);
      setModalDisplay(true);
      setModalText("Đã gửi OTP đến email của bạn");
      setVerifyChangePasword(true);
      setForgotPassword(false);
    }
  }, [sendOTPError, sendOTPResponse]);

  return {
    formik,
  };
}
