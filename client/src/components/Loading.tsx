// import { Loader } from "lucide-react";

// const Loading = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-bg-lightGreen to-emerald-900 flex items-center justify-center relative overflow-hidden">
//       <Loader className="animate-spin w-16 h-16 text-white" />
//     </div>
//   );
// };

// export default Loading;

// --------------------------

import { motion } from "framer-motion";
import logoLoader from "@/assets/logoLoader.png";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-emerald-700 to-emerald-900 overflow-hidden relative">
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Rotating Circle */}
        <motion.div
          className="absolute w-32 h-32 border-4 border-t-transparent border-emerald-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />

        {/* Bouncing Logo */}
        <motion.img
          src={logoLoader}
          alt="Website Logo"
          className="w-20 h-20"
          animate={{ y: [0, -10, 0] }}
          // animate= {{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
};

export default Loading;
