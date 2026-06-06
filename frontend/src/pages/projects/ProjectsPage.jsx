import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ProjectCard from "../../features/projects/components/ProjectCard";
import { useProjects } from "../../features/projects/hooks/useProjects";
import { Plus } from "lucide-react";

const ProjectsPage = () => {
  const { projects, loading, error } = useProjects();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
            <p className="mt-2 text-slate-500">
              Browse collaboration projects and apply to join.
            </p>
          </div>

          <Link
            to="/projects/create"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Create Project
          </Link>
        </div>

        {loading && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            Loading projects...
          </div>
        )}

        {error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
            <h2 className="text-xl font-bold text-slate-900">
              No projects found
            </h2>
            <p className="mt-2 text-slate-500">
              Create your first project to start collaborating.
            </p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProjectsPage;