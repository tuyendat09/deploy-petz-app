import { motion } from "framer-motion";
import ResetPasswordHeader from "./ResetPasswordHeader";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPassword() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className="mx-auto w-full max-w-[400px] p-2 lg:w-1/2"
    >
      <ResetPasswordHeader />
      <ResetPasswordForm />
    </motion.div>
  );
}
