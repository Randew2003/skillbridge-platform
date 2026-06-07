import { Bell, Menu, Search, Zap } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "../../features/auth/hooks/useAuth";
import { useNotifications } from "../../features/notifications/hooks/useNotifications";

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();
  const { unreadCount } = useNotifications();

  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-white/70 px-4 py-4 backdrop-blur-2xl md:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="hidden rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 md:inline-flex">
                Workspace
              </span>

              <h2 className="text-lg font-black tracking-tight text-slate-950 md:text-xl">
                Welcome back, {user?.fullName?.split(" ")[0] || "Builder"} 👋
              </h2>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Manage projects, tasks, skills, and live activity.
            </p>
          </div>
        </div>

        <div className="hidden w-96 items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm md:flex">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search workspace..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/20 md:flex">
            <Zap size={17} className="text-cyan-300" />
            Live System
          </div>

          <Link
            to="/notifications"
            className="relative rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <Bell size={20} />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-orange-500 px-1 text-xs font-black text-white">
                {unreadCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;