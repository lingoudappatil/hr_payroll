import Employee from '../models/Employee.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
export const uploadDocs = upload.array('documents', 5);

export const createEmployee = async (req, res) => {
  try {
    const emp = new Employee(req.body);
    await emp.save();
    res.status(201).json(emp);
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
    const data = await Employee.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ 
      message: 'Error fetching employees', 
      error: error.message 
    });
  }
};
