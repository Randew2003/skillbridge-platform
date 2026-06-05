import axiosInstance from "../../../api/axiosInstance";

export const getAllProjects = async () => {
  const response = await axiosInstance.get("/api/projects");
  return response.data;
};

export const getOpenProjects = async () => {
  const response = await axiosInstance.get("/api/projects/open");
  return response.data;
};

export const getProjectById = async (projectId) => {
  const response = await axiosInstance.get(`/api/projects/${projectId}`);
  return response.data;
};

export const getProjectsByOwner = async (ownerId) => {
  const response = await axiosInstance.get(`/api/projects/owner/${ownerId}`);
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await axiosInstance.post("/api/projects", projectData);
  return response.data;
};

export const updateProject = async (projectId, projectData) => {
  const response = await axiosInstance.put(`/api/projects/${projectId}`, projectData);
  return response.data;
};

export const deleteProject = async (projectId) => {
  const response = await axiosInstance.delete(`/api/projects/${projectId}`);
  return response.data;
};

export const applyToProject = async (applicationData) => {
  const response = await axiosInstance.post(
    "/api/project-applications",
    applicationData
  );
  return response.data;
};

export const getApplicationsByProject = async (projectId) => {
  const response = await axiosInstance.get(
    `/api/project-applications/project/${projectId}`
  );
  return response.data;
};

export const acceptApplication = async (applicationId) => {
  const response = await axiosInstance.put(
    `/api/project-applications/${applicationId}/accept`
  );
  return response.data;
};

export const rejectApplication = async (applicationId) => {
  const response = await axiosInstance.put(
    `/api/project-applications/${applicationId}/reject`
  );
  return response.data;
};