import { useState } from "react";
import { ArrowLeft, FolderPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useProjects } from "../../features/projects/hooks/useProjects";

const CreateProjectPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addProject, loading } = useProjects();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    maxMembers: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user?.id) {
      setError("User not found. Please login again.");
      return;
    }

    const projectData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      maxMembers: Number(formData.maxMembers),
      ownerId: user.id,
    };

    try {
      await addProject(projectData);
      navigate("/projects");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create project. Please try again."
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={18} />
            Back to projects
          </Link>

          <div className="mt-5 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <FolderPlus size={26} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Create Project
              </h1>
              <p className="mt-1 text-slate-500">
                Start a new collaboration project and invite students to join.
              </p>
            </div>
          </div>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Project Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Example: Online Food Ordering System"
              required
            />

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-slate-700"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your project idea, goals, and required contribution..."
                required
                rows="6"
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <Input
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Example: Web Development"
              required
            />

            <Input
              label="Maximum Members"
              name="maxMembers"
              type="number"
              value={formData.maxMembers}
              onChange={handleChange}
              placeholder="Example: 4"
              required
            />

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Project"}
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CreateProjectPage;