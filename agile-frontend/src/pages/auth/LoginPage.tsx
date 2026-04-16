import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const {login} = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await loginUser(form);


      if(res.success) {
        // use context login
        login(res.data.accessToken, res.data.user);

        // redirect
        navigate("/dashboard");
      }

    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* LEFT */}
      <div className="hidden md:flex flex-col justify-center items-center bg-blue-600 text-white p-10">
        <h1 className="text-4xl font-bold mb-4">Welcome Back 👋</h1>
        <p className="text-center max-w-md">
          Continue managing your projects and tasks with AgileFlow.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Login to your account
          </h2>

          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 font-medium">
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}