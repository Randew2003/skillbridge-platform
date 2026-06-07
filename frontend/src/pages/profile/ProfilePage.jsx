import { Mail, Shield, UserRound } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/ui/Card";
import { useAuth } from "../../features/auth/hooks/useAuth";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
          <p className="mt-2 text-slate-500">
            View your SkillBridge account information.
          </p>
        </div>

        <Card>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600">
              <UserRound size={42} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {user?.fullName || "SkillBridge User"}
              </h2>

              <p className="mt-2 text-slate-500">
                Student collaboration profile
              </p>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
              <Mail size={24} />
            </div>

            <p className="text-sm font-medium text-slate-500">Email</p>
            <h3 className="mt-2 text-lg font-bold text-slate-900">
              {user?.email || "No email found"}
            </h3>
          </Card>

          <Card>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Shield size={24} />
            </div>

            <p className="text-sm font-medium text-slate-500">Role</p>
            <h3 className="mt-2 text-lg font-bold text-slate-900">
              {user?.role || "No role found"}
            </h3>
          </Card>
        </div>

        <Card>
          <h2 className="text-xl font-bold text-slate-900">Account Details</h2>

          <div className="mt-5 space-y-4">
            <div className="flex justify-between rounded-2xl bg-slate-50 p-4">
              <span className="text-sm font-medium text-slate-500">User ID</span>
              <span className="text-sm font-semibold text-slate-900">
                {user?.id || "N/A"}
              </span>
            </div>

            <div className="flex justify-between rounded-2xl bg-slate-50 p-4">
              <span className="text-sm font-medium text-slate-500">
                Full Name
              </span>
              <span className="text-sm font-semibold text-slate-900">
                {user?.fullName || "N/A"}
              </span>
            </div>

            <div className="flex justify-between rounded-2xl bg-slate-50 p-4">
              <span className="text-sm font-medium text-slate-500">Email</span>
              <span className="text-sm font-semibold text-slate-900">
                {user?.email || "N/A"}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;