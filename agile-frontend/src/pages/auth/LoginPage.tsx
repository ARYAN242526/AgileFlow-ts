import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const {login} = useAuth();

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });

      // save toekn + user in context
      login(res.data.token, res.data.user);

      console.log("Navigating...");
      
      // redirect to dashboard
      navigate("/dashboard");

    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Login Failed");
    };
  }

  return (
    <div>
      <h2>Login</h2>

      <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />

      <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default LoginPage