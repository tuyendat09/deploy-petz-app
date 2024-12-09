import { motion } from "framer-motion";
import NormalTransitionLink from "../NormalTransitionLink";

const links = [
  {
    label: "Tin nhắn",
    to: "/",
  },
  {
    label: "Đặt lịch",
    to: "/booking",
  },
];

export default function Navigation() {
  return (
    <ul className="flex flex-col gap-4 text-4xl">
      {links.map((link) => (
        <motion.li
          key={link.label}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          exit={{ opacity: 0 }}
        >
          <NormalTransitionLink href={link.to}>
            {link.label}
          </NormalTransitionLink>
        </motion.li>
      ))}
    </ul>
  );
}
