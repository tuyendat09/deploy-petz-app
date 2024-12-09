import { useFormik } from "formik";
import { useAuth } from "../../_store/AuthContext";
import { useResetPasswordMutation } from "@/libs/features/services/auth";
import { useEffect } from "react";

interface errorsValues {
  password: string;
  confirmPassword: string;
}

export default function useResetPassword() {
  const { setModalDisplay, setModalText, email, setIsReset } = useAuth();
  const [resetPassword, { data }] = useResetPasswordMutation();
  const formik = useFormik({
    initialValues: {
      email: email,
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      const resetPasswordObject = {
        email: values.email,
        newPassword: values.password,
      };
      resetPassword(resetPasswordObject);
    },

    validate: (values) => {
      const errors: Partial<errorsValues> = {};

      if (!values.password) {
        errors.password = "Tên đăng nhập hoặc email không được để trống";
      }

      if (!values.password || values.confirmPassword !== values.password) {
        errors.confirmPassword = "Mật khẩu không trùng";
      }
      return errors;
    },
  });

  useEffect(() => {
    if (data) {
      setIsReset(false);
      setModalDisplay(true);
      setModalText("Đổi mật khẩu thành công");
    }
  }, [data]);
  data;

  return {
    formik,
  };
}
