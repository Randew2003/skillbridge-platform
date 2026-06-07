import { Bell, Menu, Search, Sparkles, UserRound } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

import { useAuth } from "../../features/auth/hooks/useAuth";
import { useNotifications } from "../../features/notifications/hooks/useNotifications";

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();
  const { unreadCount } = useNotifications();

  const topLinks = [
    { name: "Explore", path: "/projects" },
    { name: "Workspace", path: "/dashboard" },
    { name: "Tasks", path: "/tasks" },
    { name: "Skills", path: "/skills" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 px-4 py-4 backdrop-blur-2xl md:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden"
          >
            <Menu size={20} />
          </button>

          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-950 to-slate-700 text-white shadow-lg">
              <Sparkles size={21} />
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-950">
                SkillBridge
              </h1>
              <p className="hidden text-xs font-medium text-slate-500 sm:block">
                Project marketplace for students
              </p>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-2 xl:flex">
          {topLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-bold transition ${
                  isActive
                    ? "bg-slate-950 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="hidden w-80 items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 md:flex">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search projects, skills, tasks..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/notifications"
            className="relative rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <Bell size={20} />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-xs font-black text-white">
                {unreadCount}
              </span>
            )}
          </Link>

          <Link
            to="/profile"
            className="hidden items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:bg-slate-50 md:flex"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-white">
              <UserRound size={18} />
            </div>

            <div className="max-w-32">
              <p className="truncate text-sm font-bold text-slate-900">
                {user?.fullName || "Student"}
              </p>
              <p className="text-xs text-slate-500">{user?.role || "USER"}</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;