import { Icon } from "@iconify/react/dist/iconify.js";
import useLogin from "./_hook/useLogin";
import AuthInput from "../AuthInput/AuthInput";
import { useAuth } from "../_store/AuthContext";

export default function LoginForm() {
  const { formik, logInWithGoogle } = useLogin();
  const { setSignUp, setForgotPassword } = useAuth();

  function handleForgotPassword() {
    setForgotPassword(true);
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="mt-4 w-full flex-col items-center gap-4 space-y-4"
    >
      <AuthInput
        inputName="loginkey"
        formik={formik}
        labelText="Email hoặc tên đăng nhập"
        errorMessage={formik.errors.loginkey}
      />
      <AuthInput
        inputName="password"
        formik={formik}
        labelText="Mật khẩu"
        typePassword
        errorMessage={formik.errors.password}
      />
      <button className="w-full rounded-full bg-black py-[1rem] font-semibold text-white">
        Đăng nhập
      </button>
      <button
        type="button"
        onClick={logInWithGoogle}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-[1rem] font-semibold text-white"
      >
        <Icon className="size-6" icon="flat-color-icons:google" />
        Đăng nhập với Google
      </button>
      <button
        type="button"
        onClick={handleForgotPassword}
        className="block w-full text-center text-gray-400"
      >
        Quên mật khẩu?
      </button>
    </form>
  );
}
