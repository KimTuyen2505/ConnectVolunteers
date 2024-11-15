import React from "react";
import { motion } from "framer-motion";
import { FiHome, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.5,
          }}
          className="text-8xl font-bold text-sky-600 mb-4"
        >
          4
          <motion.span
            animate={{
              rotate: [0, 10, -10, 10, 0],
              color: ["#0ea5e9", "#f43f5e", "#0ea5e9"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="inline-block"
          >
            0
          </motion.span>
          4
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-2xl text-sky-800 mb-8"
        >
          Ối! Có vẻ như chúng ta đã lạc đường khi đi tình nguyện.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 260, damping: 20 }}
        className="mb-8"
      >
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="text-sky-500"
        >
          <motion.path
            d="M100 20C55.8172 20 20 55.8172 20 100C20 144.183 55.8172 180 100 180C144.183 180 180 144.183 180 100C180 55.8172 144.183 20 100 20ZM100 160C66.8629 160 40 133.137 40 100C40 66.8629 66.8629 40 100 40C133.137 40 160 66.8629 160 100C160 133.137 133.137 160 100 160Z"
            fill="currentColor"
          />
          <motion.path
            d="M100 120C111.046 120 120 111.046 120 100C120 88.9543 111.046 80 100 80C88.9543 80 80 88.9543 80 100C80 111.046 88.9543 120 100 120Z"
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 1.2,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          />
          <motion.path
            d="M60 90C65.5228 90 70 85.5228 70 80C70 74.4772 65.5228 70 60 70C54.4772 70 50 74.4772 50 80C50 85.5228 54.4772 90 60 90Z"
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 1.4,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          />
          <motion.path
            d="M140 90C145.523 90 150 85.5228 150 80C150 74.4772 145.523 70 140 70C134.477 70 130 74.4772 130 80C130 85.5228 134.477 90 140 90Z"
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 1.4,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-center"
      >
        <p className="text-sky-700 mb-4">
          Hãy quay lại đúng hướng và tiếp tục tạo ra sự khác biệt!
        </p>
        <Link to={"/"}>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors duration-300"
          >
            <FiHome className="mr-2" />
            Trở về
          </motion.a>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
