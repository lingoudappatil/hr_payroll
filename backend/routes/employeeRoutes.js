import express from 'express';
import { createEmployee, getEmployees, uploadDocs } from '../controllers/employeeController.js';

const router = express.Router();

// Create an employee (supports multipart uploads via controller's multer middleware)
router.post('/', uploadDocs, createEmployee);

// Get list of employees
router.get('/', getEmployees);

export default router;
