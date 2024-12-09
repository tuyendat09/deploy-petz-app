// useLogin.js

import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useAuth } from "../../_store/AuthContext";
import { useRouter } from "next/navigation";

interface errorsValues {
  loginkey: string;
  password: string;
}

export default function useLogin() {
  const { setModalDisplay, setModalText } = useAuth();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      loginkey: "",
      password: "",
    },
    onSubmit: async (values) => {
      const loginkey = values.loginkey;
      const password = values.password;
      const reponse = await signIn("credentials", {
        loginkey: loginkey,
        password: password,
        redirect: false,
        callbackUrl: "/",
      });
      if (!reponse?.ok) {
        setModalDisplay(true);
        setModalText("Tài khoản hoặc mật khẩu sai");
      } else {
        router.push("/");
      }
    },

    validate: (values) => {
      const errors: Partial<errorsValues> = {};

      if (!values.loginkey) {
        errors.loginkey = "Tên đăng nhập hoặc email không được để trống";
      }

      if (!values.password) {
        errors.password = "Mật khẩu không được để trống";
      }
      return errors;
    },
  });

  function logInWithGoogle() {
    signIn("google", {
      redirect: false,
    });
  }

  return {
    formik,
    logInWithGoogle,
  };
}
