import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.SubmitEvent) => {
      e.preventDefault();

      try {
        setLoading(true);
        setError("");

        await registerUser(form);

        console.log("Register Data: ", form);

        navigate("/login");
        
      } catch (err: any) {
        setError(err.response?.data?.message || "registration failed");
      } finally {
        setLoading(false);
      }
    };


  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* 🔥 LEFT SIDE (Branding) */}
      <div className="hidden md:flex flex-col justify-center items-center bg-blue-600 text-white p-10">
        <h1 className="text-4xl font-bold mb-4">AgileFlow 🚀</h1>
        <p className="text-lg text-center max-w-md">
          Manage your projects, tasks, and sprints with ease using modern agile workflows.
        </p>
      </div>

      {/* 🔥 RIGHT SIDE (Form) */}
      <div className="flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Create your account
          </h2>

          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          {/* 🔥 Footer */}
          <p className="text-sm text-gray-500 text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

