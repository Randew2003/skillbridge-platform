import { Link } from "react-router-dom";
import { FolderKanban, Plus } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import EmptyState from "../../components/common/EmptyState";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import PageHeader from "../../components/common/PageHeader";

import ProjectCard from "../../features/projects/components/ProjectCard";
import { useProjects } from "../../features/projects/hooks/useProjects";

const ProjectsPage = () => {
  const { projects, loading, error } = useProjects();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Projects"
          description="Browse collaboration projects and apply to join."
          action={
            <Link
              to="/projects/create"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
            >
              <Plus size={18} />
              Create Project
            </Link>
          }
        />

        {loading && <LoadingSpinner message="Loading projects..." />}

        {error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <EmptyState
            icon={FolderKanban}
            title="No projects found"
            description="Create your first project to start collaborating."
          />
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