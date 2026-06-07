import { Link } from "react-router-dom";
import { FolderKanban, Plus, Search, Sparkles } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import EmptyState from "../../components/common/EmptyState";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import ProjectCard from "../../features/projects/components/ProjectCard";
import { useProjects } from "../../features/projects/hooks/useProjects";

const ProjectsPage = () => {
  const { projects, loading, error } = useProjects();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.8fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-sm font-black text-cyan-700">
                <Sparkles size={16} />
                Project Marketplace
              </div>

              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                Discover student projects and join real collaboration teams.
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
                Explore project opportunities, apply to teams, and build your
                portfolio with practical experience.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/projects/create"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-cyan-600"
                >
                  <Plus size={18} />
                  Create Project
                </Link>

                <a
                  href="#project-list"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                >
                  Browse Projects
                </a>
              </div>
            </div>

            <div className="rounded-[1.7rem] bg-slate-950 p-5 text-white">
              <p className="text-sm font-bold text-slate-300">
                Marketplace stats
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-3xl font-black">{projects.length}</p>
                  <p className="mt-1 text-xs font-bold text-slate-400">
                    Total Projects
                  </p>
                </div>

                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-3xl font-black">
                    {projects.filter((p) => p.status === "OPEN").length}
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-400">
                    Open Projects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="project-list"
          className="rounded-[2rem] border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur-xl md:p-6"
        >
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-950">
                Explore Projects
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Find the right project based on your skills and interests.
              </p>
            </div>

            <div className="flex w-full items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 lg:w-96">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search project title or category..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

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
              description="Create your first project to start collaboration."
            />
          )}

          {!loading && !error && projects.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default ProjectsPage;