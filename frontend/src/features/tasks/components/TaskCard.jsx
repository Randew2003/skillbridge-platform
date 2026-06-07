import { Calendar, CheckCircle, Clock, Trash2 } from "lucide-react";

const TaskCard = ({ task, onStatusChange, onDelete }) => {
  const getStatusStyle = (status) => {
    if (status === "COMPLETED") return "bg-green-50 text-green-700";
    if (status === "IN_PROGRESS") return "bg-yellow-50 text-yellow-700";
    return "bg-slate-100 text-slate-700";
  };

  const getPriorityStyle = (priority) => {
    if (priority === "HIGH") return "bg-red-50 text-red-700";
    if (priority === "MEDIUM") return "bg-orange-50 text-orange-700";
    return "bg-blue-50 text-blue-700";
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <CheckCircle size={24} />
        </div>

        <div className="flex gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(task.status)}`}>
            {task.status}
          </span>

          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityStyle(task.priority)}`}>
            {task.priority}
          </span>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-900">{task.title}</h2>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
        {task.description}
      </p>

      <div className="mt-5 space-y-3 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <Clock size={17} />
          <span>Project ID: {task.projectId}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={17} />
          <span>Due date: {task.dueDate || "Not set"}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>

        <button
          onClick={() => onDelete(task.id)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
          <Trash2 size={17} />
          Delete Task
        </button>
      </div>
    </div>
  );
};

export default TaskCard;