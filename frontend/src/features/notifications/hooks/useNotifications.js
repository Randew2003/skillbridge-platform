import { useEffect, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  deleteNotification,
  getNotificationsByUserId,
  getUnreadNotificationsByUserId,
  markNotificationAsRead,
} from "../api/notificationApi";

export const useNotifications = () => {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchNotifications = async () => {
    if (!user?.id) return;

    setLoading(true);
    setError("");

    try {
      const data = await getNotificationsByUserId(user.id);
      setNotifications(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadNotifications = async () => {
    if (!user?.id) return;

    try {
      const data = await getUnreadNotificationsByUserId(user.id);
      setUnreadNotifications(data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load unread notifications"
      );
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const updatedNotification = await markNotificationAsRead(notificationId);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId ? updatedNotification : notification
        )
      );

      setUnreadNotifications((prev) =>
        prev.filter((notification) => notification.id !== notificationId)
      );

      return updatedNotification;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to mark notification");
      throw err;
    }
  };

  const removeNotification = async (notificationId) => {
    try {
      await deleteNotification(notificationId);

      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== notificationId)
      );

      setUnreadNotifications((prev) =>
        prev.filter((notification) => notification.id !== notificationId)
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete notification");
      throw err;
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchUnreadNotifications();
  }, [user?.id]);

  return {
    notifications,
    unreadNotifications,
    unreadCount: unreadNotifications.length,
    loading,
    error,
    fetchNotifications,
    fetchUnreadNotifications,
    markAsRead,
    removeNotification,
  };
};