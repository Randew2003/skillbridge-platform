import { useEffect, useState } from "react";
import {
  getAllProjects,
  getOpenProjects,
  createProject,
  applyToProject,
} from "../api/projectApi";

export const useProjects = (loadOpenOnly = false) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    setLoading(true);
    setError("");

    try {
      const data = loadOpenOnly ? await getOpenProjects() : await getAllProjects();
      setProjects(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (projectData) => {
    setLoading(true);
    setError("");

    try {
      const createdProject = await createProject(projectData);
      setProjects((prev) => [createdProject, ...prev]);
      return createdProject;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const submitApplication = async (applicationData) => {
    setLoading(true);
    setError("");

    try {
      return await applyToProject(applicationData);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to apply to project");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    addProject,
    submitApplication,
  };
};