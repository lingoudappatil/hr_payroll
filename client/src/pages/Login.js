import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/LoginModal.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Show modal when component mounts
    setIsModalVisible(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setIsModalVisible(false);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    navigate("/");
  };

  return (
    <div className={`modal ${isModalVisible ? 'show' : ''}`}>
      <div className="modal-content animate">
        <span className="close" onClick={closeModal}>&times;</span>
        <div className="login-form">
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit">
                Login
              </button>
            </div>
            <div className="text-center mt-4">
              Don't have an account?{" "}
              <span 
                onClick={() => navigate('/register')} 
                className="text-blue-600 hover:text-blue-800 cursor-pointer underline"
              >
                Register here
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
