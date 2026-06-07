import { useState } from "react";
import { motion } from "framer-motion";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex-1 p-4 md:p-6"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayout;