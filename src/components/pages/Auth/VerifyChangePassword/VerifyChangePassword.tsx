import { motion } from "framer-motion";
import VerifyChangePasswordHeader from "./VerifyChangePaswordHeader";
import VerifyChangePasswordForm from "./VerifyChangePasswordForm";

export default function VerifyChangePassword() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className="mx-auto w-full max-w-[400px] p-2 lg:w-1/2"
    >
      <VerifyChangePasswordHeader />
      <VerifyChangePasswordForm />
    </motion.div>
  );
}
