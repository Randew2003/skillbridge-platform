import {
  Bell,
  ChevronRight,
  LogOut,
  Settings,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";

const UserDropdown = ({ user, onLogout, onClose }) => {
  return (
    <div className="absolute right-0 top-14 z-50 w-[340px] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/15">
      <div className="bg-slate-950 px-5 py-5 text-white">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl font-black text-slate-950">
            {user?.fullName?.charAt(0)?.toUpperCase() || "S"}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-lg font-black">
              {user?.fullName || "Student"}
            </h3>
            <p className="mt-1 text-xs font-bold text-slate-300">
              {user?.email || "student@skillbridge.com"}
            </p>

            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-black text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Active now
            </div>
          </div>
        </div>
      </div>

      <div className="p-3">
        <Link
          to="/profile"
          onClick={onClose}
          className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
        >
          <span className="flex items-center gap-3">
            <UserRound size={18} />
            Profile
          </span>
          <ChevronRight size={17} />
        </Link>

        <Link
          to="/notifications"
          onClick={onClose}
          className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
        >
          <span className="flex items-center gap-3">
            <Bell size={18} />
            Notifications
          </span>
          <ChevronRight size={17} />
        </Link>

        <button
          type="button"
          className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
        >
          <span className="flex items-center gap-3">
            <Settings size={18} />
            Preferences
          </span>
          <span className="text-xs font-black text-slate-400">Soon</span>
        </button>

        <button
          type="button"
          className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
        >
          <span className="flex items-center gap-3">
            <ShieldCheck size={18} />
            Account Status
          </span>
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-700">
            Secure
          </span>
        </button>
      </div>

      <div className="border-t border-slate-100 p-3">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={18} />
          Sign out of SkillBridge
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;