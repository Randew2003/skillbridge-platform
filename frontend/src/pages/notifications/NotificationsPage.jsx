import { Bell, CheckCircle, Trash2 } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import EmptyState from "../../components/common/EmptyState";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import PageHeader from "../../components/common/PageHeader";

import { useNotifications } from "../../features/notifications/hooks/useNotifications";

const NotificationsPage = () => {
  const {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    removeNotification,
  } = useNotifications();

  const formatDate = (dateValue) => {
    if (!dateValue) return "Unknown date";
    return new Date(dateValue).toLocaleString();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Notifications"
          description="View your latest project and task notifications."
          action={
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-700">
              {unreadCount} unread
            </div>
          }
        />

        {loading && <LoadingSpinner message="Loading notifications..." />}

        {error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && notifications.length === 0 && (
          <EmptyState
            icon={Bell}
            title="No notifications yet"
            description="New project and task updates will appear here."
          />
        )}

        {!loading && !error && notifications.length > 0 && (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-3xl border p-5 shadow-sm transition hover:shadow-md ${
                  notification.read
                    ? "border-slate-200 bg-white"
                    : "border-indigo-100 bg-indigo-50"
                }`}
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div className="flex gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                        notification.read
                          ? "bg-slate-100 text-slate-500"
                          : "bg-indigo-600 text-white"
                      }`}
                    >
                      <Bell size={22} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-bold text-slate-900">
                          {notification.title}
                        </h2>

                        {!notification.read && (
                          <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                            New
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {notification.message}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
                        <span className="rounded-full bg-white px-3 py-1 font-medium">
                          {notification.type}
                        </span>

                        <span>{formatDate(notification.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-100"
                      >
                        <CheckCircle size={17} />
                        Read
                      </button>
                    )}

                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      <Trash2 size={17} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;