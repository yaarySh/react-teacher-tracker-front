import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {register} from "../scripts/api"; // Import register API function

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(username, password, confirmPassword);
      navigate("/login"); // Redirect to login page
    } catch (error) {
      setError(error.response?.data?.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Register</h2>
      {error && <div className="error-message">{error}</div>}
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
