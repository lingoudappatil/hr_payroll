
import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeView = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching employees from:', "http://localhost:5000/api/employees");
      const response = await axios.get("http://localhost:5000/api/employees");
      console.log('Response received:', response);
      
      if (Array.isArray(response.data)) {
        console.log('Number of employees found:', response.data.length);
        setEmployees(response.data);
        if (response.data.length > 0) {
          console.log('First employee:', response.data[0]);
        }
      } else {
        console.error('Invalid response format:', response.data);
        setError('Invalid data format received from server');
        setEmployees([]);
      }
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      setError(error.message || 'Failed to fetch employees');
      if (error.response) {
        console.error('Server error:', error.response.data);
      }
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };


  // Handle edit and delete actions
  const handleEdit = (id) => {
    alert(`Edit employee with ID: ${id}`);
    // You can navigate to edit form here
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:5000/api/employees/${id}`);
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  return (
    <div className="main-content">
      <div className="header">
        <h2>Employee Management</h2>
      </div>
      <div className="card">
        <h3>Employee List</h3>
        
        {loading ? (
          <p>Loading employees...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : employees.length === 0 ? (
          <p>No employees found. Please add some employees first.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp._id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>
                    <button onClick={() => handleEdit(emp._id)}>Edit</button>
                    <button
                      onClick={() => handleDelete(emp._id)}
                      style={{ marginLeft: "10px", backgroundColor: "crimson" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
  
    </div>
  );
};

export default EmployeeView;
