import React, { useState } from "react";
import { useLoginMutation } from "../utils/query";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLoginMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loginMutation.status === 'pending'}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loginMutation.status === 'pending'}
          />
        </div>
        <button type="submit" disabled={loginMutation.status === 'pending'}>
          {loginMutation.status === 'pending' ? "Logging in..." : "Login"}
        </button>
      </form>
      {loginMutation.isError && (
        <p>
          Error:{" "}
          {loginMutation.error instanceof Error && loginMutation.error.message}
        </p>
      )}
    </div>
  );
};

export default Login;
