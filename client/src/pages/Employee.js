// src/components/Employee.jsx
import React, { useState, useEffect } from 'react';
import './Employee.css';

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    joinDate: '',
    status: 'Active'
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch employees from API
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/employees');
      if (!response.ok) throw new Error('Failed to fetch employees');
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const url = editingId 
        ? `http://localhost:5000/api/employees/${editingId}`
        : 'http://localhost:5000/api/employees';
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save employee');

      await fetchEmployees();
      resetForm();
      
    } catch (err) {
      setError(err.message);
    }
  };

  // Edit employee
  const handleEdit = (employee) => {
    setFormData({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      joinDate: employee.joinDate ? employee.joinDate.split('T')[0] : '',
      status: employee.status
    });
    setEditingId(employee._id);
  };

  // Delete employee
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete employee');
      
      await fetchEmployees();
    } catch (err) {
      setError(err.message);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      department: '',
      joinDate: '',
      status: 'Active'
    });
    setEditingId(null);
    setError('');
  };

  // Department options
  const departments = [
    'Engineering',
    'Human Resources',
    'Finance',
    'Marketing',
    'Sales',
    'Operations',
    'IT',
    'Customer Support'
  ];

  return (
    <div className="employee-container">
      <div className="employee-header">
        <h2>Employee Management</h2>
        <p>Add and manage employee information</p>
      </div>

      <div className="employee-content">
        {/* Employee Form */}
        <div className="form-card">
          <div className="card-header">
            <h3>{editingId ? 'Edit Employee' : 'Add New Employee'}</h3>
            {editingId && (
              <button className="btn-secondary" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>
          
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="employee-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter employee full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter employee email"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="department">Department *</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="joinDate">Join Date</label>
                <input
                  type="date"
                  id="joinDate"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="status">Employment Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingId ? 'Update Employee' : 'Add Employee'}
              </button>
              <button type="button" className="btn-outline" onClick={resetForm}>
                Clear Form
              </button>
            </div>
          </form>
        </div>

        {/* Employees List */}
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
    </div>
  );
}

export default Employee;