import { motion } from "framer-motion";

export default function NoActionModal({ modalText }: { modalText: string }) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="mb-8 rounded-full bg-black px-6 py-2 text-white"
      >
        <p>{modalText}</p>
      </motion.div>
    </div>
  );
}
