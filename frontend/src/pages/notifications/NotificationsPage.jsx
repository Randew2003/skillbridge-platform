import {
  Bell,
  CheckCircle,
  GitPullRequest,
  Trash2,
  Zap,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import EmptyState from "../../components/common/EmptyState";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import { useNotifications } from "../../features/notifications/hooks/useNotifications";

const NotificationsPage = () => {
  const { notificationId } = useParams();

  const {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    removeNotification,
  } = useNotifications();

  const visibleNotifications = notificationId
    ? notifications.filter((notification) => notification.id === notificationId)
    : notifications;

  const formatDate = (dateValue) => {
    if (!dateValue) return "Unknown date";
    return new Date(dateValue).toLocaleString();
  };

  const getEventIcon = (type) => {
    if (type?.includes("PROJECT")) return GitPullRequest;
    if (type?.includes("TASK")) return CheckCircle;
    return Bell;
  };

  const getEventStyle = (type) => {
    if (type?.includes("ACCEPTED")) {
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    }

    if (type?.includes("REJECTED")) {
      return "bg-rose-100 text-rose-700 border-rose-200";
    }

    if (type?.includes("TASK")) {
      return "bg-violet-100 text-violet-700 border-violet-200";
    }

    return "bg-cyan-100 text-cyan-700 border-cyan-200";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <section className="overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/10 md:p-8">
          <div className="relative">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-400/30 blur-3xl" />
            <div className="absolute bottom-0 right-52 h-52 w-52 rounded-full bg-violet-500/30 blur-3xl" />

            <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-cyan-100">
                  <Zap size={16} />
                  {notificationId
                    ? "Selected Notification"
                    : "RabbitMQ Activity Timeline"}
                </div>

                <h1 className="text-4xl font-black tracking-tight md:text-5xl">
                  {notificationId ? "Notification details." : "Live system activity."}
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                  {notificationId
                    ? "You are viewing one selected notification from the activity feed."
                    : "Project applications, task assignments, and task updates are captured here from your event-driven notification service."}
                </p>

                {notificationId && (
                  <Link
                    to="/notifications"
                    className="mt-5 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-100"
                  >
                    Back to all activity
                  </Link>
                )}
              </div>

              <div className="rounded-[1.7rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                <p className="text-sm font-bold text-slate-300">
                  Notification status
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-3xl bg-white p-4 text-slate-950">
                    <p className="text-3xl font-black">
                      {notificationId
                        ? visibleNotifications.length
                        : notifications.length}
                    </p>
                    <p className="mt-1 text-xs font-bold text-slate-500">
                      {notificationId ? "Selected" : "Total Events"}
                    </p>
                  </div>

                  <div className="rounded-3xl bg-white p-4 text-slate-950">
                    <p className="text-3xl font-black">{unreadCount}</p>
                    <p className="mt-1 text-xs font-bold text-slate-500">
                      Unread
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {loading && <LoadingSpinner message="Loading activity timeline..." />}

        {error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && visibleNotifications.length === 0 && (
          <EmptyState
            icon={Bell}
            title={notificationId ? "Notification not found" : "No activity yet"}
            description={
              notificationId
                ? "This notification may have been deleted."
                : "RabbitMQ-powered project and task events will appear here."
            }
          />
        )}

        {!loading && !error && visibleNotifications.length > 0 && (
          <section className="rounded-[2rem] border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-xl md:p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-slate-950">
                {notificationId ? "Selected Event" : "Event Timeline"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {notificationId
                  ? "Full details of the notification you selected."
                  : "Latest backend events saved in MongoDB by notification-service."}
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-6 top-0 h-full w-px bg-slate-200" />

              <div className="space-y-5">
                {visibleNotifications.map((notification) => {
                  const Icon = getEventIcon(notification.type);
                  const eventStyle = getEventStyle(notification.type);

                  return (
                    <article key={notification.id} className="relative pl-16">
                      <div
                        className={`absolute left-0 top-1 flex h-12 w-12 items-center justify-center rounded-2xl border ${eventStyle}`}
                      >
                        <Icon size={22} />
                      </div>

                      <div
                        className={`rounded-[1.7rem] border p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                          notification.read
                            ? "border-slate-200 bg-white"
                            : "border-cyan-200 bg-cyan-50/70"
                        }`}
                      >
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                          <div>
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <h3 className="text-lg font-black text-slate-950">
                                {notification.title}
                              </h3>

                              {!notification.read && (
                                <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">
                                  New
                                </span>
                              )}
                            </div>

                            <p className="max-w-3xl text-sm leading-6 text-slate-600">
                              {notification.message}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-3 text-xs font-bold text-slate-500">
                              <span className="rounded-full bg-white px-3 py-1 text-slate-700">
                                {notification.type}
                              </span>

                              <span className="rounded-full bg-white px-3 py-1">
                                {formatDate(notification.createdAt)}
                              </span>
                            </div>
                          </div>

                          <div className="flex shrink-0 gap-2">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700 transition hover:bg-emerald-100"
                              >
                                <CheckCircle size={17} />
                                Read
                              </button>
                            )}

                            <button
                              onClick={() => removeNotification(notification.id)}
                              className="inline-flex items-center gap-2 rounded-2xl bg-rose-50 px-4 py-2 text-sm font-black text-rose-600 transition hover:bg-rose-100"
                            >
                              <Trash2 size={17} />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;