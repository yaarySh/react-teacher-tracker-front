import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../scripts/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.access);

      navigate("/"); // Redirect to the home page after successful login
    } catch (error) {
      console.error("Error logging in", error);
      setErrorMessage(true);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Login</h2>

      {errorMessage && <div className="error-message">Invalid credentials. Please try again.</div>}

      <div className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="submit-btn" onClick={handleLogin}>
          Login
        </button>
        <button className="register-btn" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
