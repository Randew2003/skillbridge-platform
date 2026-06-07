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
    { name: "Workspace", path: "/dashboard", icon: LayoutDashboard },
    { name: "Explore", path: "/projects", icon: FolderKanban },
    { name: "Board", path: "/tasks", icon: CheckSquare },
    { name: "Skills", path: "/skills", icon: Brain },
    { name: "Activity", path: "/notifications", icon: Bell },
    { name: "Profile", path: "/profile", icon: UserRound },
  ];

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
  };

  const railContent = (
    <>
      <div className="mb-8 flex items-center justify-between lg:justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white shadow-lg">
          SB
        </div>

        <button
          onClick={onClose}
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
        >
          <X size={22} />
        </button>
      </div>

      <nav className="flex flex-1 flex-col items-center gap-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            location.pathname === item.path ||
            location.pathname.startsWith(`${item.path}/`);

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              title={item.name}
              className={`group relative flex h-12 w-12 items-center justify-center rounded-2xl transition ${
                active
                  ? "bg-slate-950 text-white shadow-lg shadow-slate-900/20"
                  : "bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              <Icon size={21} />

              <span className="pointer-events-none absolute left-16 hidden rounded-xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100 lg:block">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        title="Logout"
        className="mt-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 transition hover:bg-red-100"
      >
        <LogOut size={21} />
      </button>
    </>
  );

  return (
    <>
      <aside className="hidden h-screen w-24 border-r border-slate-200 bg-white/80 px-4 py-5 backdrop-blur-xl lg:flex lg:flex-col">
        {railContent}
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div onClick={onClose} className="absolute inset-0 bg-slate-950/60" />

          <aside className="relative z-10 flex h-full w-24 flex-col border-r border-slate-200 bg-white px-4 py-5 shadow-2xl">
            {railContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;