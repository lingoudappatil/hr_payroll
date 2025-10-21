import Employee from '../models/Employee.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
export const uploadDocs = upload.array('documents', 5);

export const createEmployee = async (req, res) => {
  const emp = new Employee(req.body);
  await emp.save();
  res.json(emp);
};

export const getEmployees = async (req, res) => {
  const data = await Employee.find();
  res.json(data);
};
