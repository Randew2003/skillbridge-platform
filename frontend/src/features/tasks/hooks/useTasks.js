import { useEffect, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTasksByAssignedUser,
  updateTaskStatus,
} from "../api/taskApi";

export const useTasks = (assignedOnly = false) => {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    setError("");

    try {
      const data =
        assignedOnly && user?.id
          ? await getTasksByAssignedUser(user.id)
          : await getAllTasks();

      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    setLoading(true);
    setError("");

    try {
      const createdTask = await createTask(taskData);
      setTasks((prev) => [createdTask, ...prev]);
      return createdTask;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const changeTaskStatus = async (taskId, status) => {
    setError("");

    try {
      const updatedTask = await updateTaskStatus(taskId, status);

      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? updatedTask : task))
      );

      return updatedTask;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task status");
      throw err;
    }
  };

  const removeTask = async (taskId) => {
    setError("");

    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task");
      throw err;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user?.id]);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    changeTaskStatus,
    removeTask,
  };
};