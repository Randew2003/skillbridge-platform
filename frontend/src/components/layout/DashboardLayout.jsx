import { useState } from "react";
import { motion } from "framer-motion";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="relative flex min-h-screen flex-1 flex-col overflow-hidden bg-[radial-gradient(circle_at_top_left,#e0f2fe_0,#f8fafc_35%,#f1f5f9_100%)]">
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-violet-300/30 blur-3xl" />

        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <motion.main
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          className="relative z-10 flex-1 p-4 md:p-6"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayout;