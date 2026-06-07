import { Bell, CheckCircle, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const NotificationDropdown = ({
  notifications = [],
  unreadCount = 0,
  onMarkAsRead,
  onClose,
}) => {
  const latestNotifications = notifications.slice(0, 5);

  const formatDate = (dateValue) => {
    if (!dateValue) return "Unknown time";

    return new Date(dateValue).toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="absolute right-0 top-14 z-50 w-[360px] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/15">
      <div className="border-b border-slate-100 bg-slate-950 px-5 py-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black">Notifications</h3>
            <p className="mt-1 text-xs text-slate-300">
              {unreadCount} unread activity updates
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
            <Bell size={20} />
          </div>
        </div>
      </div>

      <div className="max-h-[420px] overflow-y-auto">
        {latestNotifications.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <Bell size={22} />
            </div>

            <p className="text-sm font-bold text-slate-900">
              No notifications yet
            </p>
            <p className="mt-1 text-xs text-slate-500">
              New project and task activity will appear here.
            </p>
          </div>
        ) : (
          latestNotifications.map((notification) => (
            <button
              key={notification.id}
              onClick={() => onMarkAsRead(notification.id)}
              className={`block w-full border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50 ${
                !notification.read ? "bg-cyan-50/50" : "bg-white"
              }`}
            >
              <div className="flex gap-3">
                <div
                  className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl ${
                    !notification.read
                      ? "bg-slate-950 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <Bell size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="line-clamp-1 text-sm font-black text-slate-950">
                      {notification.title}
                    </h4>

                    {!notification.read && (
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-500" />
                    )}
                  </div>

                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                    {notification.message}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-black text-slate-600">
                      {notification.type}
                    </span>

                    <span className="text-[10px] font-bold text-slate-400">
                      {formatDate(notification.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-4">
        <button
          onClick={() => latestNotifications.forEach((n) => !n.read && onMarkAsRead(n.id))}
          className="inline-flex items-center gap-2 text-xs font-black text-emerald-700 hover:text-emerald-800"
        >
          <CheckCircle size={15} />
          Mark visible as read
        </button>

        <Link
          to="/notifications"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-xs font-black text-white transition hover:bg-cyan-600"
        >
          View all
          <ExternalLink size={14} />
        </Link>
      </div>
    </div>
  );
};

export default NotificationDropdown;