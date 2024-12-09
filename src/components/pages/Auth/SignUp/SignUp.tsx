import { motion } from "framer-motion";
import SignUpHeader from "./SignUpHeader";
import SignUpForm from "./SignUpForm";

export default function SignUp() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className="mx-auto w-full max-w-[400px] p-2 lg:w-1/2"
    >
      <SignUpHeader />
      <SignUpForm />
    </motion.div>
  );
}
