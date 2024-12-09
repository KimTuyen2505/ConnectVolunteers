import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUsers, FiFolder, FiMenu, FiX } from "react-icons/fi";
import UserManagement from "./Users";
import ProjectManagement from "./Projects";
import { getUsers } from "../../services/user";
import { Result } from "antd";

export default function AdminDashboard() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  const [activeTab, setActiveTab] = useState("users");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      {currentUser && currentUser.username === "admin" ? (
        <div className="flex h-screen bg-sky-100">
          {/* Sidebar */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-sky-600 text-white w-64 min-h-screen p-4 left-0"
              >
                <h1 className="text-2xl font-bold mb-8">
                  Quản Trị VolunteersWork
                </h1>
                <nav>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("users")}
                    className={`flex items-center w-full p-3 mb-4 rounded transition-colors ${
                      activeTab === "users" ? "bg-sky-700" : "hover:bg-sky-500"
                    }`}
                  >
                    <FiUsers className="mr-2" />
                    Quản Lý Người Dùng
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("projects")}
                    className={`flex items-center w-full p-3 mb-4 rounded transition-colors ${
                      activeTab === "projects"
                        ? "bg-sky-700"
                        : "hover:bg-sky-500"
                    }`}
                  >
                    <FiFolder className="mr-2" />
                    Quản Lý Dự Án
                  </motion.button>
                </nav>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main content */}
          <div
            className={`flex-1 transition-all duration-300 ease-in-out overflow-auto`}
          >
            {/* Header */}
            <header className="bg-white shadow-md p-4 flex items-center justify-between">
              <div className="flex items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="text-sky-600 p-2 rounded-full hover:bg-sky-100 transition-colors"
                >
                  {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </motion.button>
                <h2 className="text-xl font-semibold ml-4">
                  {activeTab === "users"
                    ? "Quản lý người dùng"
                    : "Quản lý dự án"}
                </h2>
              </div>
            </header>

            {/* Content */}
            <main className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === "users" && <UserManagement key="users" />}
                {activeTab === "projects" && (
                  <ProjectManagement key="projects" />
                )}
              </AnimatePresence>
            </main>
          </div>
        </div>
      ) : (
        <Result
          status="warning"
          title="Bạn không có quyền truy cập."
          subTitle="Vui lòng liên hệ với quản trị viên."
        />
      )}
    </>
  );
}
