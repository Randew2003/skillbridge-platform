import { motion } from "framer-motion";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";

const AuthForm = ({
  title,
  subtitle,
  fields,
  formData,
  onChange,
  onSubmit,
  buttonText,
  loading,
  error,
  footer,
}) => {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-900">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center justify-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2">
          
          {/* Left side content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="hidden text-white lg:block"
          >
            <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-indigo-200">
              SkillBridge Platform
            </p>

            <h1 className="text-5xl font-bold leading-tight">
              Build projects, find teams, and grow your skills.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-300">
              A microservice-based collaboration platform for students to create
              projects, manage tasks, showcase skills, and receive real-time
              notifications.
            </p>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold">7+</p>
                <p className="mt-1 text-xs text-slate-400">Microservices</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold">JWT</p>
                <p className="mt-1 text-xs text-slate-400">Secure Auth</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold">MQ</p>
                <p className="mt-1 text-xs text-slate-400">Notifications</p>
              </div>
            </div>
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <Card>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
                <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
              </div>

              <form onSubmit={onSubmit} className="space-y-5">
                {fields.map((field) => (
                  <Input
                    key={field.name}
                    label={field.label}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={onChange}
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                ))}

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <Button type="submit" disabled={loading}>
                  {loading ? "Please wait..." : buttonText}
                </Button>
              </form>

              {footer && (
                <div className="mt-6 text-center text-sm">
                  {footer}
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;