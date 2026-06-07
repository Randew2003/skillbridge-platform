import axiosInstance from "../../../api/axiosInstance";

export const getNotificationsByUserId = async (userId) => {
  const response = await axiosInstance.get(`/api/notifications/user/${userId}`);
  return response.data;
};

export const getUnreadNotificationsByUserId = async (userId) => {
  const response = await axiosInstance.get(
    `/api/notifications/user/${userId}/unread`
  );
  return response.data;
};

export const markNotificationAsRead = async (notificationId) => {
  const response = await axiosInstance.patch(
    `/api/notifications/${notificationId}/read`
  );
  return response.data;
};

export const deleteNotification = async (notificationId) => {
  const response = await axiosInstance.delete(
    `/api/notifications/${notificationId}`
  );
  return response.data;
};