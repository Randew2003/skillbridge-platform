import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthForm from "../../features/auth/components/AuthForm";
import { useAuth } from "../../features/auth/hooks/useAuth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    university: "",
  });

  const [error, setError] = useState("");

  const fields = [
    {
      label: "Full Name",
      name: "fullName",
      type: "text",
      placeholder: "Enter your full name",
      required: true,
    },
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
      placeholder: "Create a password",
      required: true,
    },
    {
      label: "University",
      name: "university",
      type: "text",
      placeholder: "Enter your university",
      required: false,
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
      await register(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <AuthForm
      title="Create account"
      subtitle="Join SkillBridge and start collaborating on real projects."
      fields={fields}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      buttonText="Register"
      loading={loading}
      error={error}
      footer={
        <p className="text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Login
          </Link>
        </p>
      }
    />
  );
};

export default RegisterPage;