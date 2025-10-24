import Employee from '../models/Employee.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
export const uploadDocs = upload.array('documents', 5);

export const createEmployee = async (req, res) => {
  try {
    console.log('Received employee data:', req.body);
    const emp = new Employee(req.body);
    const savedEmployee = await emp.save();
    console.log('Employee saved successfully:', savedEmployee);
    res.status(201).json(savedEmployee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ 
      message: 'Error creating employee', 
      error: error.message 
    });
  }
};

export const getEmployees = async (req, res) => {
  try {
    console.log('Attempting to fetch employees from database...');
    const data = await Employee.find().sort({ createdAt: -1 });
    console.log('Employees found:', data.length);
    console.log('Sample data:', data[0]);
    res.json(data);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ 
      message: 'Error fetching employees', 
      error: error.message 
    });
  }
};
