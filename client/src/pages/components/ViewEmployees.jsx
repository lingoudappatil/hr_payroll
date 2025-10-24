
import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeView = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      console.log('Fetching employees...');
      const response = await axios.get("http://localhost:5000/api/employees");
      console.log('Employees data:', response.data);
      if (Array.isArray(response.data)) {
        setEmployees(response.data);
        console.log('Number of employees:', response.data.length);
        if (response.data.length > 0) {
          console.log('Sample employee data:', response.data[0]);
        }
      } else {
        console.error('Expected array but got:', typeof response.data);
        setEmployees([]);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
      setEmployees([]);
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

        {employees.length === 0 ? (
          <p>No employees found.</p>
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
