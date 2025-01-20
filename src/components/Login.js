import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"; // Optional for custom styles
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = () => {
    axios
      .post("http://127.0.0.1:8000/teachers/login/", {username, password})
      .then((response) => {
        localStorage.setItem("token", response.data.access);
        navigate("/"); // Navigate to the dashboard or other route
      })
      .catch((error) => {
        console.error("Error logging in", error);
        setErrorMessage(true);
      });
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
        <button
          className="register-btn"
          onClick={() => navigate("/register")} // Navigate to register page
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
