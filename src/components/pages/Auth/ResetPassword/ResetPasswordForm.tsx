import { useState } from "react";
import AuthInput from "../AuthInput/AuthInput";
import useResetPassword from "./_hook/useResetPassword";

export default function ResetPasswordForm() {
  const { formik } = useResetPassword();
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
        Đổi mật khẩu
      </button>
    </form>
  );
}
