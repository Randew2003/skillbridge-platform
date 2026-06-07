import { useState } from "react";
import { Plus } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { useAuth } from "../../features/auth/hooks/useAuth";
import TaskCard from "../../features/tasks/components/TaskCard";
import { useTasks } from "../../features/tasks/hooks/useTasks";

const TasksPage = () => {
  const { user } = useAuth();
  const { tasks, loading, error, addTask, changeTaskStatus, removeTask } =
    useTasks();

  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectId: "",
    assignedToUserId: "",
    priority: "MEDIUM",
    dueDate: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      projectId: "",
      assignedToUserId: "",
      priority: "MEDIUM",
      dueDate: "",
    });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!user?.id) {
      setFormError("User not found. Please login again.");
      return;
    }

    const taskData = {
      title: formData.title,
      description: formData.description,
      projectId: Number(formData.projectId),
      assignedToUserId: Number(formData.assignedToUserId),
      createdByUserId: user.id,
      priority: formData.priority,
      dueDate: formData.dueDate,
    };

    try {
      await addTask(taskData);
      resetForm();
      setShowForm(false);
    } catch (err) {
      setFormError(
        err.response?.data?.message || "Failed to create task. Please try again."
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Tasks</h1>
            <p className="mt-2 text-slate-500">
              Create tasks, assign users, and update task status.
            </p>
          </div>

          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            {showForm ? "Close Form" : "Create Task"}
          </button>
        </div>

        {showForm && (
          <Card>
            <form onSubmit={handleCreateTask} className="space-y-5">
              <Input
                label="Task Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Example: Create login page"
                required
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the task..."
                  required
                  rows="4"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  label="Project ID"
                  name="projectId"
                  type="number"
                  value={formData.projectId}
                  onChange={handleChange}
                  placeholder="Example: 1"
                  required
                />

                <Input
                  label="Assign To User ID"
                  name="assignedToUserId"
                  type="number"
                  value={formData.assignedToUserId}
                  onChange={handleChange}
                  placeholder="Example: 2"
                  required
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                  </select>
                </div>

                <Input
                  label="Due Date"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {formError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {formError}
                </div>
              )}

              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Task"}
              </Button>
            </form>
          </Card>
        )}

        {loading && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            Loading tasks...
          </div>
        )}

        {error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && tasks.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
            <h2 className="text-xl font-bold text-slate-900">No tasks found</h2>
            <p className="mt-2 text-slate-500">
              Create your first task to start tracking project work.
            </p>
          </div>
        )}

        {!loading && !error && tasks.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={changeTaskStatus}
                onDelete={removeTask}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TasksPage;