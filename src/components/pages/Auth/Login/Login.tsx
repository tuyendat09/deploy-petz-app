import { motion } from "framer-motion";
import LoginForm from "./LoginForm";
import LoginHeader from "./LoginHeader";

export default function Login() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className="mx-auto w-full max-w-[400px] p-2 lg:w-1/2"
    >
      <LoginHeader />
      <LoginForm />
    </motion.div>
  );
}
