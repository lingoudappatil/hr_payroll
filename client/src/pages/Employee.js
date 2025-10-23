import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", department: "" });
  const [editId, setEditId] = useState(null);

  // Fetch employees when component mounts
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      alert('Failed to fetch employees');
    }
  };

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // add new employee
  const handleAdd = async () => {
    if (!formData.name || !formData.email || !formData.department) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editId) {
        // update existing
        await axios.put(`http://localhost:5000/api/employees/${editId}`, formData);
        setEditId(null);
      } else {
        // add new
        await axios.post('http://localhost:5000/api/employees', formData);
      }
      
      // Refresh the employee list
      await fetchEmployees();
      setFormData({ name: "", email: "", department: "" });
    } catch (error) {
      console.error('Error saving employee:', error);
      alert('Failed to save employee');
    }
  };

  // edit employee
  const handleEdit = (id) => {
    const emp = employees.find((e) => e.id === id);
    setFormData({ name: emp.name, email: emp.email, department: emp.department });
    setEditId(id);
  };

  // delete employee
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this employee?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/employees/${id}`);
        await fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Failed to delete employee');
      }
    }
  };

  return (
    <div style={{ marginLeft: "270px", padding: "20px" }}>
      <h2>Employee Management</h2>

      <div className="card">
        <h3>{editId ? "Edit Employee" : "Add New Employee"}</h3>

        <input
          type="text"
          placeholder="Employee Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
        />

        <button onClick={handleAdd}>
          {editId ? "Update Employee" : "Add Employee"}
        </button>
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
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>
                    <button onClick={() => handleEdit(emp.id)}>Edit</button>
                    <button
                      onClick={() => handleDelete(emp.id)}
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
}
