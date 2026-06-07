import {
  ArrowRight,
  FolderKanban,
  Layers,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-100">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-violet-500 to-rose-400" />

      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/20">
          <FolderKanban size={24} />
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
          {project.status}
        </span>
      </div>

      <div className="mb-4">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-cyan-700">
          <Layers size={13} />
          {project.category}
        </p>

        <h2 className="text-xl font-black leading-snug text-slate-950">
          {project.title}
        </h2>
      </div>

      <p className="line-clamp-3 text-sm leading-6 text-slate-500">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
          React
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
          Spring Boot
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
          Teamwork
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-50 p-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
          <Users size={17} />
          Max {project.maxMembers} members
        </div>

        <div className="flex items-center gap-2 text-sm font-bold text-violet-700">
          <Zap size={17} />
          Collab
        </div>
      </div>

      <Link
        to={`/projects/${project.id}`}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white transition group-hover:bg-cyan-600"
      >
        View Workspace
        <ArrowRight size={18} />
      </Link>
    </article>
  );
};

export default ProjectCard;