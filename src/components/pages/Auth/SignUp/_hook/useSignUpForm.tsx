import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSignUpMutation } from "@/libs/features/services/auth";
import { useAuth } from "../../_store/AuthContext";

import {
  validateEmail,
  validateUsername,
  validatePassword,
} from "@/utils/validationUtils";

interface errorsValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export default function useSignUp() {
  const { setVerifying, setEmail, setModalDisplay, setModalText } = useAuth();
  const [signUp, { data, error: signUpError, isLoading }] = useSignUpMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      signUp(values);
    },
    validate: (values) => {
      let errors: Partial<errorsValues> = {};

      if (!values.email) {
        errors.email = "Email không được để trống";
      } else if (!validateEmail(values.email)) {
        errors.email = "Email không hợp lệ";
      }

      if (!values.username) {
        errors.username = "Username không được để trống";
      } else if (!validateUsername(values.username)) {
        errors.username = "Username không chứa ký tự đặc biệt";
      }

      if (!values.password) {
        errors.password = "Mật khẩu không được để trống";
      } else if (!validatePassword(values.password)) {
        errors.password = "Mật khẩu không chứa ký tự đặc biệt";
      }

      if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Mật khẩu không trùng";
      }

      return errors;
    },
  });

  useEffect(() => {
    if (signUpError) {
      if ("data" in signUpError) {
        setModalDisplay(true);
        setModalText((signUpError.data as any).message);
      }
    }

    if (data) {
      setVerifying(true);
      setEmail(formik.values.email);
      setModalDisplay(true);
      setModalText("Đã gửi OTP đến Mail của bạn");
    }
  }, [signUpError, data, setVerifying, setEmail]);
  return {
    formik,
    isLoading,
  };
}
