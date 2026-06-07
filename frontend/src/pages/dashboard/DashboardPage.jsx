import {
  ArrowRight,
  Bell,
  Brain,
  CheckSquare,
  FolderKanban,
  Plus,
  Rocket,
  Sparkles,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { useNotifications } from "../../features/notifications/hooks/useNotifications";
import { useProjects } from "../../features/projects/hooks/useProjects";
import { useSkills } from "../../features/skills/hooks/useSkills";
import { useTasks } from "../../features/tasks/hooks/useTasks";
import { useAuth } from "../../features/auth/hooks/useAuth";

const DashboardPage = () => {
  const { user } = useAuth();
  const { projects } = useProjects();
  const { tasks } = useTasks();
  const { skillRecord } = useSkills();
  const { unreadCount, notifications } = useNotifications();

  const stats = [
    {
      label: "Projects",
      value: projects.length,
      icon: FolderKanban,
      bg: "bg-cyan-50",
      text: "text-cyan-700",
    },
    {
      label: "Tasks",
      value: tasks.length,
      icon: CheckSquare,
      bg: "bg-violet-50",
      text: "text-violet-700",
    },
    {
      label: "Skills",
      value: skillRecord?.skills?.length || 0,
      icon: Brain,
      bg: "bg-emerald-50",
      text: "text-emerald-700",
    },
    {
      label: "Unread",
      value: unreadCount,
      icon: Bell,
      bg: "bg-rose-50",
      text: "text-rose-700",
    },
  ];

  const quickActions = [
    {
      title: "Create Project",
      description: "Start a new collaboration idea",
      path: "/projects/create",
      icon: Plus,
    },
    {
      title: "Explore Projects",
      description: "Find teams and opportunities",
      path: "/projects",
      icon: Rocket,
    },
    {
      title: "Update Skills",
      description: "Improve your skill profile",
      path: "/skills",
      icon: Brain,
    },
    {
      title: "View Activity",
      description: "Check recent notifications",
      path: "/notifications",
      icon: Bell,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Hero section */}
        <section className="overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/20 md:p-8">
          <div className="relative">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-400/30 blur-3xl" />
            <div className="absolute bottom-0 right-40 h-48 w-48 rounded-full bg-violet-500/30 blur-3xl" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100">
                  <Sparkles size={16} />
                  SkillBridge Workspace
                </div>

                <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-5xl">
                  Welcome back, {user?.fullName?.split(" ")[0] || "Builder"}.
                  Build your next project team today.
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
                  Discover student projects, manage tasks, showcase skills, and
                  stay updated with event-driven activity from your microservice
                  backend.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/projects/create"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-100"
                  >
                    <Plus size={18} />
                    Create Project
                  </Link>

                  <Link
                    to="/projects"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"
                  >
                    Explore Projects
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>

              <div className="rounded-[1.7rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                <p className="text-sm font-semibold text-slate-300">
                  Collaboration snapshot
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                      <div
                        key={stat.label}
                        className="rounded-3xl bg-white p-4 text-slate-950"
                      >
                        <div
                          className={`mb-3 flex h-10 w-10 items-center justify-center rounded-2xl ${stat.bg} ${stat.text}`}
                        >
                          <Icon size={20} />
                        </div>

                        <p className="text-2xl font-black">{stat.value}</p>
                        <p className="mt-1 text-xs font-bold text-slate-500">
                          {stat.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main workspace grid */}
        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          {/* Recent projects */}
          <section className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-950">
                  Project Discovery
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Latest collaboration opportunities.
                </p>
              </div>

              <Link
                to="/projects"
                className="text-sm font-bold text-slate-950 hover:text-cyan-700"
              >
                View all
              </Link>
            </div>

            <div className="space-y-3">
              {projects.length === 0 ? (
                <div className="rounded-3xl bg-slate-50 p-6 text-sm text-slate-500">
                  No projects yet. Create one and start building.
                </div>
              ) : (
                projects.slice(0, 4).map((project) => (
                  <Link
                    key={project.id}
                    to={`/projects/${project.id}`}
                    className="group block rounded-3xl border border-slate-100 bg-slate-50 p-5 transition hover:border-cyan-200 hover:bg-cyan-50/60"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-black uppercase tracking-wide text-cyan-700">
                          {project.category}
                        </p>

                        <h3 className="mt-2 text-lg font-black text-slate-950 group-hover:text-cyan-900">
                          {project.title}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                          {project.description}
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600">
                        {project.status}
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </section>

          {/* Quick actions */}
          <section className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-xl">
            <div className="mb-5">
              <h2 className="text-xl font-black text-slate-950">
                Quick Launch
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Jump into common actions.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <Link
                    key={action.title}
                    to={action.path}
                    className="group rounded-3xl border border-slate-100 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-slate-950"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-950 shadow-sm group-hover:bg-cyan-300">
                        <Icon size={22} />
                      </div>

                      <div>
                        <h3 className="font-black text-slate-950 group-hover:text-white">
                          {action.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500 group-hover:text-slate-300">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>

        {/* Bottom grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-xl">
            <h2 className="text-xl font-black text-slate-950">Skill Cloud</h2>
            <p className="mt-1 text-sm text-slate-500">
              Skills shown on your collaboration profile.
            </p>

            <div className="mt-5">
              {!skillRecord?.skills?.length ? (
                <p className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-500">
                  No skills added yet. Add skills to improve project matching.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {skillRecord.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-xl">
            <h2 className="text-xl font-black text-slate-950">
              Live Activity
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Latest RabbitMQ-powered notifications.
            </p>

            <div className="mt-5 space-y-3">
              {notifications.length === 0 ? (
                <p className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-500">
                  No activity yet.
                </p>
              ) : (
                notifications.slice(0, 4).map((notification) => (
                  <div
                    key={notification.id}
                    className="rounded-3xl bg-slate-50 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
                        <Bell size={16} />
                      </div>

                      <div>
                        <p className="text-sm font-black text-slate-950">
                          {notification.title}
                        </p>
                        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;