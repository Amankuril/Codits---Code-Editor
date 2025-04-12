import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <motion.h1
        className="text-5xl font-bold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to Codit
      </motion.h1>

      <motion.p
        className="mt-4 text-lg text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Write and run code in your browser with ease.
      </motion.p>

      <motion.div
        className="mt-8 flex space-x-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <Link to="/visualizer" className="px-6 py-2 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-500 transition">
          Start Coding
        </Link>
        <Link to="/login" className="px-6 py-2 bg-gray-700 rounded-lg shadow-lg hover:bg-gray-600 transition">
          Login
        </Link>
      </motion.div>
    </div>
  );
};

export default App;
