import axiosInstance from "../../../api/axiosInstance";

export const getAllTasks = async () => {
  const response = await axiosInstance.get("/api/tasks");
  return response.data;
};

export const getTasksByProject = async (projectId) => {
  const response = await axiosInstance.get(`/api/tasks/project/${projectId}`);
  return response.data;
};

export const getTasksByAssignedUser = async (userId) => {
  const response = await axiosInstance.get(`/api/tasks/assigned-user/${userId}`);
  return response.data;
};

export const getTaskById = async (taskId) => {
  const response = await axiosInstance.get(`/api/tasks/${taskId}`);
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await axiosInstance.post("/api/tasks", taskData);
  return response.data;
};

export const updateTask = async (taskId, taskData) => {
  const response = await axiosInstance.put(`/api/tasks/${taskId}`, taskData);
  return response.data;
};

export const updateTaskStatus = async (taskId, status) => {
  const response = await axiosInstance.patch(
    `/api/tasks/${taskId}/status?status=${status}`
  );
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await axiosInstance.delete(`/api/tasks/${taskId}`);
  return response.data;
};