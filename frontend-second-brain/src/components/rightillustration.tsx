import { motion } from "framer-motion";

export default function RightIllustration() {
  return (
    <div className="flex justify-center items-center h-full relative overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Background glowing blob */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300 rounded-full blur-3xl opacity-30 animate-pulse" />

        {/* Central AI brain illustration */}
        <img
          src="/ai-brain.svg" // your AI illustration SVG/PNG
          alt="AI Illustration"
          className="relative z-10 w-[400px]"
        />
      </motion.div>
    </div>
  );
}
