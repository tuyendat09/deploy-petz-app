import { Icon } from "@iconify/react/dist/iconify.js";
import AuthInput from "../AuthInput/AuthInput";
import { useAuth } from "../_store/AuthContext";
import useForgotPassword from "./_hook/useForgotPassword";
export default function ForgotPasswordForm() {
  const { formik } = useForgotPassword();

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="mt-4 w-full flex-col items-center gap-4 space-y-4"
    >
      <AuthInput
        inputName="email"
        formik={formik}
        labelText="Email"
        errorMessage={formik.errors.email}
      />

      <button className="w-full rounded-full bg-black py-[1rem] font-semibold text-white">
        Gửi OTP
      </button>
    </form>
  );
}
