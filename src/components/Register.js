import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = () => {
    axios
      .post("http://127.0.0.1:8000/teachers/register/", {username, password, confirmPassword})
      .then(() => {
        navigate("/login"); // Redirect to login page
      })
      .catch((error) => {
        console.error("Error registering", error);
        setError(true);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center">Register</h2>
      {error && <div className="error-message">Registration failed. Please try again.</div>}
      <div className="register-form">
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="submit-btn" onClick={handleRegister}>
          Register
        </button>
        <div className="login-link">
          <button onClick={() => navigate("/login")}>Already have an account? Login here.</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
