# 🚀 LendSwift Loan Application

A production-grade **Multi-Step Loan Application Form** developed using **React.js, React Hook Form, Zod, and Tailwind CSS**. The application provides a secure and user-friendly loan application experience with dynamic validation, conditional rendering, document uploads, e-signature capture, and auto-save functionality.

---

## 🌐 Live Demo

**Vercel Deployment:**  
https://lendswift-loan-application-zeta.vercel.app

---

## 🛠️ Tech Stack

- React.js
- React Hook Form
- Zod
- Tailwind CSS
- JavaScript (ES6+)
- Vite

---

## ✨ Features

### 📋 Multi-Step Loan Application
- 8-step loan application workflow
- Progress indicator
- Step-wise navigation
- Review & Submit page

### 💳 Multiple Loan Types
Supports:
- Personal Loan
- Home Loan
- Business Loan

Each loan type dynamically updates fields and validation rules.

### ✅ Real-Time Validation
- React Hook Form integration
- Zod schema validation
- Field-level error messages
- Cross-step validation

### 🪪 Identity Verification
- PAN Verification Simulation
- Aadhaar Verification Simulation
- Input validation for PAN & Aadhaar formats

### 📍 Address Details
- Current Address
- Permanent Address
- Same Address option
- PIN-based address lookup support

### 💼 Employment Details
Supports multiple employment types:
- Salaried
- Self-Employed
- Business Owner

Conditional fields are displayed based on employment type.

### 👥 Co-Applicant Support
Conditional co-applicant details based on:
- Loan Type
- Loan Amount

### 📄 Document Upload
Supports uploading:
- PAN Card
- Aadhaar Card
- Bank Statement
- Salary Slip
- Property Documents
- GST Returns
- Business Certificate
- Photograph

Includes:
- File Preview
- Image Compression
- File Validation

### ✍️ E-Signature
- Digital Signature Capture
- Signature Validation
- Signature Preview

### 💾 Auto Save
- Draft saved automatically
- Resume previous application
- Local Storage support

### 📑 Review & Submit
- Complete application summary
- EMI Summary
- Uploaded documents review
- Final declaration & consent

---

## 📂 Project Structure

```
src/
 ├── components/
 ├── pages/
 ├── hooks/
 ├── providers/
 ├── schemas/
 ├── utils/
 ├── config/
 └── data/
```

---

## ▶️ Installation

```bash
git clone <repository-url>

cd loan-application

npm install

npm run dev
```

---

## 🚀 Build

```bash
npm run build
```

---

## 📌 Future Enhancements

Planned improvements include:

- 📱 Enhanced mobile responsiveness
- 🔐 Real PAN & Aadhaar API integration
- 📍 Google Maps Address Autocomplete
- 🧮 Dynamic EMI Calculator
- 📧 Email & SMS OTP Verification
- ☁️ Backend integration with database
- 🔒 JWT Authentication
- 📊 Admin Dashboard
- 🌙 Dark Mode
- 🌍 Multi-language Support
- ☁️ Cloud document storage (AWS S3)
- 📱 Progressive Web App (PWA) support
- 📈 Loan eligibility prediction using Machine Learning

---

## 👩‍💻 Developer

**Shrushti Katu**

Front End Developer | React Developer | AWS Cloud Enthusiast

---

## 📄 License

This project was developed as part of the **Zetheta Front End Developer Assessment Project** and is intended for educational and evaluation purposes.
