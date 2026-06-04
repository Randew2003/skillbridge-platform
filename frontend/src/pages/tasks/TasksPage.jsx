import DashboardLayout from "../../components/layout/DashboardLayout";

const TasksPage = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-slate-900">Tasks</h1>
      <p className="mt-2 text-slate-500">Task list will appear here.</p>
    </DashboardLayout>
  );
};

export default TasksPage;