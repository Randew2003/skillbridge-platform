import { Bell, Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "../../features/auth/hooks/useAuth";
import { useNotifications } from "../../features/notifications/hooks/useNotifications";

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();
  const { unreadCount } = useNotifications();

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-2xl border border-slate-200 p-3 text-slate-600 transition hover:bg-slate-50 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div>
          <h2 className="text-lg font-bold text-slate-900 md:text-xl">
            Welcome back
          </h2>
          <p className="text-sm text-slate-500">
            {user?.fullName || "SkillBridge user"}
          </p>
        </div>
      </div>

      <div className="hidden w-80 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 md:flex">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search projects, tasks..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>

      <Link
        to="/notifications"
        className="relative rounded-2xl border border-slate-200 p-3 text-slate-600 transition hover:bg-slate-50"
      >
        <Bell size={20} />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
            {unreadCount}
          </span>
        )}
      </Link>
    </header>
  );
};

export default Navbar;