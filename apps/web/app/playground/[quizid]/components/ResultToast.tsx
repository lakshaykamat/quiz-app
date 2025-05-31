"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ResultToastProps {
  result: "correct" | "wrong" | null;
}

export default function ResultToast({ result }: ResultToastProps) {
  return (
    <AnimatePresence>
      {result && (
        <motion.div
          key={result}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-20 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-white font-bold text-xl shadow-lg ${
            result === "correct" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {result === "correct" ? "Correct!" : "Wrong!"}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
