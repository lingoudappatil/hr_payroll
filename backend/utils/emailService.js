import nodemailer from 'nodemailer';

export const sendPayslipEmail = async (emp, payslipPath) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: emp.email,
    subject: 'Payslip',
    text: `Hello ${emp.name}, here is your payslip.`,
    attachments: [{ path: payslipPath }]
  });
};
