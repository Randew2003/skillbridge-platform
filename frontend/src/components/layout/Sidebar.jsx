import { Link, useLocation } from "react-router-dom";
import {
  BrainCircuit,
  Compass,
  LayoutDashboard,
  ListTodo,
  X,
} from "lucide-react";

const Sidebar = ({ isOpen = false, onClose }) => {
  const location = useLocation();

  const navItems = [
    {
      name: "Workspace",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Explore Projects",
      path: "/projects",
      icon: Compass,
    },
    {
      name: "Task Board",
      path: "/tasks",
      icon: ListTodo,
    },
    {
      name: "Skill Hub",
      path: "/skills",
      icon: BrainCircuit,
    },
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <>
      {/* Desktop expandable sidebar */}
      <aside className="group hidden h-[calc(100vh-80px)] w-24 shrink-0 self-start border-r border-slate-200 bg-white/90 px-4 py-5 backdrop-blur-xl transition-all duration-300 ease-in-out hover:w-72 lg:sticky lg:top-[80px] lg:flex lg:flex-col">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3 overflow-hidden">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white shadow-lg shadow-slate-900/20">
            SB
          </div>

          <div className="min-w-0 opacity-0 transition duration-300 group-hover:opacity-100">
            <h2 className="whitespace-nowrap text-lg font-black text-slate-950">
              SkillBridge
            </h2>
            <p className="whitespace-nowrap text-xs font-semibold text-slate-500">
              Student workspace
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActiveRoute(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                title={item.name}
                className={`flex h-12 items-center gap-3 overflow-hidden rounded-2xl px-3 transition ${
                  active
                    ? "bg-slate-950 text-white shadow-lg shadow-slate-900/20"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                    active ? "bg-white/10 text-white" : "bg-white text-slate-500"
                  }`}
                >
                  <Icon size={22} strokeWidth={2.2} />
                </span>

                <span className="whitespace-nowrap text-sm font-black opacity-0 transition duration-300 group-hover:opacity-100">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom status */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />

            <div className="min-w-0 opacity-0 transition duration-300 group-hover:opacity-100">
              <p className="whitespace-nowrap text-xs font-black text-slate-700">
                System Online
              </p>
              <p className="whitespace-nowrap text-[11px] font-semibold text-slate-400">
                Gateway + RabbitMQ active
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div onClick={onClose} className="absolute inset-0 bg-slate-950/60" />

          <aside className="relative z-10 flex h-full w-72 flex-col border-r border-slate-200 bg-white px-4 py-5 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white shadow-lg">
                  SB
                </div>

                <div>
                  <h2 className="text-lg font-black text-slate-950">
                    SkillBridge
                  </h2>
                  <p className="text-xs font-semibold text-slate-500">
                    Student workspace
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActiveRoute(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={`flex h-12 items-center gap-3 rounded-2xl px-3 transition ${
                      active
                        ? "bg-slate-950 text-white shadow-lg shadow-slate-900/20"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-950"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                        active
                          ? "bg-white/10 text-white"
                          : "bg-white text-slate-500"
                      }`}
                    >
                      <Icon size={22} strokeWidth={2.2} />
                    </span>

                    <span className="text-sm font-black">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <div>
                  <p className="text-xs font-black text-slate-700">
                    System Online
                  </p>
                  <p className="text-[11px] font-semibold text-slate-400">
                    Gateway + RabbitMQ active
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;