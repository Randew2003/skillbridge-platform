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
  Sparkles,
} from "lucide-react";

import { useAuth } from "../../features/auth/hooks/useAuth";

const Sidebar = ({ isOpen = false, onClose }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { name: "Workspace", path: "/dashboard", icon: LayoutDashboard },
    { name: "Project Hub", path: "/projects", icon: FolderKanban },
    { name: "Task Board", path: "/tasks", icon: CheckSquare },
    { name: "Skill Cloud", path: "/skills", icon: Brain },
    { name: "Activity Feed", path: "/notifications", icon: Bell },
    { name: "My Profile", path: "/profile", icon: UserRound },
  ];

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
  };

  const sidebarContent = (
    <>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 text-white shadow-lg shadow-cyan-500/20">
              <Sparkles size={22} />
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight text-white">
                SkillBridge
              </h1>
              <p className="text-xs font-medium text-slate-400">
                Build • Learn • Collab
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="rounded-xl p-2 text-slate-400 hover:bg-white/10 lg:hidden"
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
              className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-white text-slate-950 shadow-xl shadow-cyan-500/10"
                  : "text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                  active
                    ? "bg-gradient-to-br from-cyan-400 to-violet-500 text-white"
                    : "bg-white/5 text-slate-400 group-hover:text-white"
                }`}
              >
                <Icon size={18} />
              </span>

              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm font-bold text-white">SkillBridge Mode</p>
        <p className="mt-1 text-xs leading-5 text-slate-400">
          Microservices, RabbitMQ events, and React workspace UI.
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="mt-4 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
      >
        <LogOut size={20} />
        Logout
      </button>
    </>
  );

  return (
    <>
      <aside className="hidden h-screen w-76 border-r border-white/10 bg-slate-950 px-5 py-6 lg:flex lg:flex-col">
        {sidebarContent}
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div onClick={onClose} className="absolute inset-0 bg-slate-950/70" />

          <aside className="relative z-10 flex h-full w-76 flex-col border-r border-white/10 bg-slate-950 px-5 py-6 shadow-2xl">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;