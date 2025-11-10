
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
      <div className="employees-list-card">
          <div className="card-header">
            <h3>Employee List</h3>
            <button 
              className="btn-refresh" 
              onClick={fetchEmployees}
              disabled={loading}
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {loading ? (
            <div className="loading">Loading employees...</div>
          ) : employees.length === 0 ? (
            <div className="no-data">No employees found</div>
          ) : (
            <div className="table-container">
              <table className="employees-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Join Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(employee => (
                    <tr key={employee._id}>
                      <td className="employee-name">
                        <div className="avatar">
                          {employee.name.charAt(0).toUpperCase()}
                        </div>
                        {employee.name}
                      </td>
                      <td>{employee.email}</td>
                      <td>
                        <span className="department-badge">
                          {employee.department}
                        </span>
                      </td>
                      <td>
                        {employee.joinDate ? new Date(employee.joinDate).toLocaleDateString() : 'N/A'}
                      </td>
                      <td>
                        <span className={`status-badge ${employee.status.toLowerCase()}`}>
                          {employee.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn-edit"
                            onClick={() => handleEdit(employee)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn-delete"
                            onClick={() => handleDelete(employee._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
  
    </div>
  );
};

export default EmployeeView;
