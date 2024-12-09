import { motion } from "framer-motion";
import ForgotPasswordHeader from "./ForgotPasswordHeader";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className="mx-auto w-full max-w-[400px] p-2 lg:w-1/2"
    >
      <ForgotPasswordHeader />
      <ForgotPasswordForm />
    </motion.div>
  );
}
