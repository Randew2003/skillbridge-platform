import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Brain,
  Bell,
  UserRound,
  LogOut,
  X,
} from "lucide-react";

import { useAuth } from "../../features/auth/hooks/useAuth";

const Sidebar = ({ isOpen = false, onClose }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", path: "/projects", icon: FolderKanban },
    { name: "Tasks", path: "/tasks", icon: CheckSquare },
    { name: "Skills", path: "/skills", icon: Brain },
    { name: "Notifications", path: "/notifications", icon: Bell },
    { name: "Profile", path: "/profile", icon: UserRound },
  ];

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
  };

  const sidebarContent = (
    <>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">SkillBridge</h1>
          <p className="mt-1 text-sm text-slate-500">
            Student collaboration hub
          </p>
        </div>

        <button
          onClick={onClose}
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
        >
          <X size={22} />
        </button>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
      >
        <LogOut size={20} />
        Logout
      </button>
    </>
  );

  return (
    <>
      <aside className="hidden h-screen w-72 border-r border-slate-200 bg-white px-5 py-6 lg:flex lg:flex-col">
        {sidebarContent}
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/50"
          />

          <aside className="relative z-10 flex h-full w-72 flex-col border-r border-slate-200 bg-white px-5 py-6 shadow-2xl">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;