import { motion } from "framer-motion";
import VerifyForm from "./VerifyForm";
import VerifyHeader from "./VerifyHeader";

export default function Verify() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className="mx-auto w-full max-w-[400px] p-2 lg:w-1/2"
    >
      <VerifyHeader />
      <VerifyForm />
    </motion.div>
  );
}
