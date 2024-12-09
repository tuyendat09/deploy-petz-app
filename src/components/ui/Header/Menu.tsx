import { motion } from "framer-motion";
import Navigation from "./Navigation";

const variant = {
  hidden: { opacity: 0, translateX: 40 },
  visible: { opacity: 1, translateX: 0 },
};

export default function Menu() {
  return (
    <motion.div
      variants={variant}
      initial={"hidden"}
      exit={"hidden"}
      animate={"visible"}
      className="glass mt-4 w-full origin-right rounded-[20px] px-12 py-8 text-white shadow-sm"
    >
      <Navigation />
    </motion.div>
  );
}
