import { FolderKanban, CheckSquare, Brain, Bell } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";

const DashboardPage = () => {
  const stats = [
    {
      title: "Projects",
      value: "12",
      icon: FolderKanban,
      description: "Available collaboration projects",
    },
    {
      title: "Tasks",
      value: "8",
      icon: CheckSquare,
      description: "Tasks assigned to you",
    },
    {
      title: "Skills",
      value: "6",
      icon: Brain,
      description: "Skills added to your profile",
    },
    {
      title: "Notifications",
      value: "4",
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
            Overview of your SkillBridge activity.
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

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Welcome to SkillBridge
          </h2>
          <p className="mt-2 text-slate-500">
            This dashboard will later show real project, task, skill, and
            notification data from your microservice backend.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;