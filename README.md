# LendSwift Multi-Step Loan Application

A production-grade multi-step loan application built using React, React Hook Form and Zod.

## Features

- 8-Step Loan Application Wizard
- Personal, Home and Business Loans
- Dynamic Form Validation
- Cross-Step Validation
- Auto Save & Resume Draft
- PAN & Aadhaar Verification Simulation
- Address Auto Fill using PIN Code
- Conditional Form Rendering
- File Upload with Preview
- Signature Capture
- EMI Calculator
- Review & Submit Flow
- Success Modal

## Tech Stack

- React
- Vite
- React Hook Form
- Zod
- Tailwind CSS
- React Signature Canvas

## Installation

```bash
npm install
```

Run development server

```bash
npm run dev
```

Build

```bash
npm run build
```

## Project Structure

```
src/
components/
hooks/
pages/
schemas/
utils/
context/
```

## Architecture

The application follows a Wizard based multi-step architecture.

- React Hook Form manages form state.
- Zod provides schema validation.
- Context API shares application state.
- Auto-save stores encrypted drafts in Local Storage.
- Conditional rendering is based on loan type and employment type.

## Validation

- Loan specific validation
- PAN validation
- Aadhaar format validation
- Cross-step validation
- Conditional document validation

## Future Improvements

- Aadhaar Verhoeff checksum validation
- Complete Cypress E2E test suite
- Accessibility audit improvements

## Author

Shrushti Katu
