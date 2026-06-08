import {
  Bell,
  Brain,
  BriefcaseBusiness,
  Code2,
  Mail,
  Network,
  Pencil,
  Rocket,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/ui/Card";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useNotifications } from "../../features/notifications/hooks/useNotifications";
import { useProjects } from "../../features/projects/hooks/useProjects";
import { useSkills } from "../../features/skills/hooks/useSkills";
import { useTasks } from "../../features/tasks/hooks/useTasks";

const ProfilePage = () => {
  const { user } = useAuth();
  const { projects } = useProjects();
  const { tasks } = useTasks();
  const { skillRecord } = useSkills();
  const { unreadCount } = useNotifications();

  const stats = [
    {
      label: "Projects",
      value: projects.length,
      icon: BriefcaseBusiness,
      color: "bg-cyan-50 text-cyan-700",
    },
    {
      label: "Tasks",
      value: tasks.length,
      icon: Rocket,
      color: "bg-violet-50 text-violet-700",
    },
    {
      label: "Skills",
      value: skillRecord?.skills?.length || 0,
      icon: Brain,
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Unread",
      value: unreadCount,
      icon: Bell,
      color: "bg-rose-50 text-rose-700",
    },
  ];

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Profile header */}
        <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur-xl">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[1.7rem] bg-slate-950 text-4xl font-black text-white shadow-lg shadow-slate-900/20">
                {user?.fullName?.charAt(0)?.toUpperCase() || "S"}
              </div>

              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Active collaborator
                </div>

                <h1 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                  {user?.fullName || "SkillBridge Student"}
                </h1>

                <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <Mail size={16} />
                    {user?.email || "No email"}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <ShieldCheck size={16} />
                    {user?.role || "USER"}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-cyan-700"
            >
              <Pencil size={17} />
              Edit Profile
            </button>
          </div>
        </section>

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-[1.7rem] border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur-xl"
              >
                <div
                  className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl ${stat.color}`}
                >
                  <Icon size={21} />
                </div>

                <p className="text-3xl font-black text-slate-950">
                  {stat.value}
                </p>

                <p className="mt-1 text-sm font-bold text-slate-500">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </section>

        <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          {/* Account details */}
          <Card>
            <div className="mb-6">
              <h2 className="text-2xl font-black text-slate-950">
                Account Details
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your basic SkillBridge account information.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                  User ID
                </p>
                <p className="mt-1 font-black text-slate-950">
                  #{user?.id || "N/A"}
                </p>
              </div>

              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                  Full Name
                </p>
                <p className="mt-1 font-black text-slate-950">
                  {user?.fullName || "N/A"}
                </p>
              </div>

              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                  Email
                </p>
                <p className="mt-1 font-black text-slate-950">
                  {user?.email || "N/A"}
                </p>
              </div>

              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                  Role
                </p>
                <p className="mt-1 font-black text-slate-950">
                  {user?.role || "USER"}
                </p>
              </div>
            </div>
          </Card>

          {/* Professional links */}
          <Card>
            <div className="mb-6">
              <h2 className="text-2xl font-black text-slate-950">
                Professional Links
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                GitHub and LinkedIn links will be editable after we connect the
                profile update API.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <Code2 size={19} />
                  </div>

                  <div>
                    <p className="font-black text-slate-950">GitHub</p>
                    <p className="text-xs font-semibold text-slate-500">
                      Coding portfolio
                    </p>
                  </div>
                </div>

                <p className="break-all rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-500">
                  {user?.githubUrl || "Not added yet"}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Network size={19} />
                  </div>

                  <div>
                    <p className="font-black text-slate-950">LinkedIn</p>
                    <p className="text-xs font-semibold text-slate-500">
                      Professional network
                    </p>
                  </div>
                </div>

                <p className="break-all rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-500">
                  {user?.linkedinUrl || "Not added yet"}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Skills */}
        <Card>
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-black text-slate-950">
                Skill Cloud
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Skills from your skill-service profile.
              </p>
            </div>

            <Link
              to="/skills"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-cyan-700"
            >
              Manage Skills
            </Link>
          </div>

          {!skillRecord?.skills?.length ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm font-semibold text-slate-500">
              No skills added yet. Add your skills to improve project matching.
            </div>
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
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;