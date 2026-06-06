import { Calendar, FolderKanban, Users } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <FolderKanban size={24} />
        </div>

        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
          {project.status}
        </span>
      </div>

      <h2 className="text-xl font-bold text-slate-900">{project.title}</h2>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
        {project.description}
      </p>

      <div className="mt-5 space-y-3 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <Users size={17} />
          <span>Max members: {project.maxMembers}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={17} />
          <span>Category: {project.category}</span>
        </div>
      </div>

      <Link
        to={`/projects/${project.id}`}
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProjectCard;