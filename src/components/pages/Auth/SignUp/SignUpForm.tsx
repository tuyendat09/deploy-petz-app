import { Icon } from "@iconify/react/dist/iconify.js";
import AuthInput from "../AuthInput/AuthInput";
import useSignUp from "./_hook/useSignUpForm";
import { useState } from "react";
export default function SignUpForm() {
  const { formik, isLoading } = useSignUp();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <form
      className="mt-4 w-full flex-col items-center gap-4 space-y-4"
      onSubmit={handleSignUp}
    >
      <AuthInput
        errorMessage={formik.errors.email}
        formik={formik}
        inputName="email"
        labelText="Email"
      />
      <AuthInput
        errorMessage={formik.errors.username}
        formik={formik}
        inputName="username"
        labelText="Tên đăng nhập"
      />
      <AuthInput
        errorMessage={formik.errors.password}
        formik={formik}
        inputName="password"
        labelText="Mật khẩu"
        typePassword={!showPassword}
      />
      <AuthInput
        errorMessage={formik.errors.confirmPassword}
        formik={formik}
        inputName="confirmPassword"
        labelText="Nhập lại mật khẩu"
        typePassword={!showPassword}
      />
      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          id="showpassword"
          name="showpassword"
          onChange={handleShowPassword}
          checked={showPassword}
        />
        <label htmlFor="showpassword">Hiện mật khẩu</label>
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-black py-[1rem] font-semibold text-white"
      >
        {isLoading ? "Đang đăng ký khà khà" : "Đăng ký"}
      </button>
      <button className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-[1rem] font-semibold text-white">
        <Icon className="size-6" icon="flat-color-icons:google" />
        Đăng ký với Google
      </button>
    </form>
  );
}
