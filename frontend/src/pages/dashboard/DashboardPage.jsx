import { FolderKanban, CheckSquare, Brain, Bell } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { useProjects } from "../../features/projects/hooks/useProjects";
import { useTasks } from "../../features/tasks/hooks/useTasks";
import { useSkills } from "../../features/skills/hooks/useSkills";
import { useNotifications } from "../../features/notifications/hooks/useNotifications";

const DashboardPage = () => {
  const { projects } = useProjects();
  const { tasks } = useTasks();
  const { skillRecord } = useSkills();
  const { unreadCount } = useNotifications();

  const stats = [
    {
      title: "Projects",
      value: projects.length,
      icon: FolderKanban,
      description: "Available collaboration projects",
    },
    {
      title: "Tasks",
      value: tasks.length,
      icon: CheckSquare,
      description: "Tasks available in the system",
    },
    {
      title: "Skills",
      value: skillRecord?.skills?.length || 0,
      icon: Brain,
      description: "Skills added to your profile",
    },
    {
      title: "Notifications",
      value: unreadCount,
      icon: Bell,
      description: "Unread notifications",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-2 text-slate-500">
            Real-time overview of your SkillBridge activity.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <Icon size={24} />
                </div>

                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {stat.value}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Recent Projects
            </h2>

            <div className="mt-4 space-y-3">
              {projects.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No projects available yet.
                </p>
              ) : (
                projects.slice(0, 4).map((project) => (
                  <div
                    key={project.id}
                    className="rounded-2xl bg-slate-50 p-4"
                  >
                    <p className="font-semibold text-slate-900">
                      {project.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {project.category}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              My Skills
            </h2>

            <div className="mt-4">
              {!skillRecord?.skills?.length ? (
                <p className="text-sm text-slate-500">
                  No skills added yet.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {skillRecord.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;