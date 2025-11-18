# Shopella Store

Shopella is a simple e-commerce web application built with React, TypeScript, React Router, and Zustand for state management.
It allows users to browse products, view details, add items to a shopping cart, adjust quantities, submit a contact form, and complete a mock checkout flow.

## Technologies

- React + TypeScript
- React Router
- Bootstrap / Custom CSS
- Zustand (cart store + persistence)
- Yup (form validation)
- React Toastify (toasts)

## How to Run

To view this project locally, you can clone the repository:

```bash
git clone https://github.com/NoroffFEU/jsfw-2025-v1-javascript-frameworks-ca
```

### Install dependencies

```bash
npm install
```

If you encounter peer-dependency issues during installation (common when using React + Bootstrap + Toastify), install using:

```bash
npm install --legacy-peer-deps
```

### Start the development server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.

### Run tests

```bash
npm test
```

Launches the test runner in the interactive watch mode.

### Running a Production Build

```bash
npm run build
```

Builds the app for production to the `build` folder.
