import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, FolderKanban, Send, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { getProjectById, applyToProject } from "../../features/projects/api/projectApi";

const ProjectDetailsPage = () => {
  const { projectId } = useParams();
  const { user } = useAuth();

  const [project, setProject] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchProject = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getProjectById(projectId);
      setProject(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load project details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const handleApply = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user?.id) {
      setError("User not found. Please login again.");
      return;
    }

    if (!message.trim()) {
      setError("Please add a short application message.");
      return;
    }

    const applicationData = {
      projectId: Number(projectId),
      applicantId: user.id,
      message,
    };

    try {
      setApplying(true);
      await applyToProject(applicationData);
      setSuccess("Application submitted successfully.");
      setMessage("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to apply to project.");
    } finally {
      setApplying(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl space-y-6">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
        >
          <ArrowLeft size={18} />
          Back to projects
        </Link>

        {loading && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            Loading project details...
          </div>
        )}

        {error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-3xl border border-green-200 bg-green-50 p-5 text-sm text-green-700">
            {success}
          </div>
        )}

        {!loading && project && (
          <>
            <Card>
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <FolderKanban size={28} />
                  </div>

                  <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                      {project.title}
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                      Project ID: {project.id}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-green-50 px-4 py-2 text-xs font-semibold text-green-700">
                  {project.status}
                </span>
              </div>

              <p className="leading-7 text-slate-600">{project.description}</p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-slate-500">
                    <Calendar size={18} />
                    <span className="text-sm">Category</span>
                  </div>
                  <p className="font-semibold text-slate-900">
                    {project.category}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-slate-500">
                    <Users size={18} />
                    <span className="text-sm">Max Members</span>
                  </div>
                  <p className="font-semibold text-slate-900">
                    {project.maxMembers}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-slate-500">
                    <FolderKanban size={18} />
                    <span className="text-sm">Owner ID</span>
                  </div>
                  <p className="font-semibold text-slate-900">
                    {project.ownerId}
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="mb-5">
                <h2 className="text-xl font-bold text-slate-900">
                  Apply to this project
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Send a short message explaining why you want to join.
                </p>
              </div>

              <form onSubmit={handleApply} className="space-y-5">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Example: I am interested in this project. I have experience with React and Spring Boot."
                  rows="5"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />

                <Button type="submit" disabled={applying}>
                  <span className="inline-flex items-center justify-center gap-2">
                    <Send size={18} />
                    {applying ? "Submitting..." : "Apply Now"}
                  </span>
                </Button>
              </form>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetailsPage;