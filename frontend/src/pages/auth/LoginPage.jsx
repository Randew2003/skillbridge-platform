import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthForm from "../../features/auth/components/AuthForm";
import { useAuth } from "../../features/auth/hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const fields = [
    {
      label: "Email Address",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
    },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <AuthForm
      title="Welcome back"
      subtitle="Login to continue your SkillBridge journey."
      fields={fields}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      buttonText="Login"
      loading={loading}
      error={error}
      footer={
        <p className="text-slate-500">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Register
          </Link>
        </p>
      }
    />
  );
};

export default LoginPage;