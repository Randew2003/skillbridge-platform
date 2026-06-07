import axiosInstance from "../../../api/axiosInstance";

export const createOrUpdateSkills = async (skillData) => {
  const response = await axiosInstance.post("/api/skills", skillData);
  return response.data;
};

export const getSkillsByUserId = async (userId) => {
  const response = await axiosInstance.get(`/api/skills/user/${userId}`);
  return response.data;
};

export const getSkillsByProjectId = async (projectId) => {
  const response = await axiosInstance.get(`/api/skills/project/${projectId}`);
  return response.data;
};

export const searchBySkill = async (skill) => {
  const response = await axiosInstance.get(`/api/skills/search?skill=${skill}`);
  return response.data;
};

export const deleteSkillRecord = async (skillId) => {
  const response = await axiosInstance.delete(`/api/skills/${skillId}`);
  return response.data;
};