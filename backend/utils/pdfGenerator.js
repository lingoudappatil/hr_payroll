import PDFDocument from 'pdfkit';
import fs from 'fs';

export const generatePayslipPdf = async (emp, amount) => {
  const path = `uploads/payslips_${emp.employeeId}_${Date.now()}.pdf`;
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(path));
  doc.fontSize(20).text(`Payslip for ${emp.name}`);
  doc.moveDown();
  doc.text(`Employee ID: ${emp.employeeId}`);
  doc.text(`Net Salary: ₹${amount}`);
  doc.end();
  return path;
};
