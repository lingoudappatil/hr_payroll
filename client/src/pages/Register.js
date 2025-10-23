import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/LoginModal.css";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Employee",
  });
  const [isModalVisible, setIsModalVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Show modal when component mounts
    setIsModalVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Registered successfully!");
      setIsModalVisible(false);
      navigate("/");
    } catch (err) {
      alert("Error registering user");
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
          <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full p-3 border rounded"
              >
                <option value="Admin">Admin</option>
                <option value="HR">HR</option>
                <option value="Employee">Employee</option>
              </select>
            </div>
            <div className="form-group">
              <button type="submit" className="bg-green-600 hover:bg-green-700">
                Register
              </button>
            </div>
            <div className="text-center mt-4">
              Already have an account?{" "}
              <span 
                onClick={() => navigate('/')} 
                className="text-blue-600 hover:text-blue-800 cursor-pointer underline"
              >
                Login here
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
