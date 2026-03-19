import { useState } from "react";
import { loginUser } from "../../services/authService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });
      console.log(res);
    } catch (error) {
      console.error(error);
    };
  } 
  return (
    <div>
      <h2>Login</h2>

      <input
      type="email"
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
      />

      <input
      type="password"
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default LoginPage