import { useState } from "react";
import { motion } from "framer-motion";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="min-h-[calc(100vh-80px)] flex-1">
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute -right-24 top-8 h-72 w-72 rounded-full bg-cyan-200/50 blur-3xl" />
            <div className="pointer-events-none absolute -left-24 top-64 h-72 w-72 rounded-full bg-violet-200/40 blur-3xl" />

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="relative z-10 p-4 md:p-6"
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;