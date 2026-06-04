import { Bell, Search } from "lucide-react";
import { useAuth } from "../../features/auth/hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Welcome back</h2>
        <p className="text-sm text-slate-500">
          {user?.fullName || "SkillBridge user"}
        </p>
      </div>

      <div className="hidden w-80 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 md:flex">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search projects, tasks..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>

      <button className="relative rounded-2xl border border-slate-200 p-3 text-slate-600 transition hover:bg-slate-50">
        <Bell size={20} />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
      </button>
    </header>
  );
};

export default Navbar;