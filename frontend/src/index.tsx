/**
 * Entry Point for React Application
 *
 * This is the main entry file for the React application, responsible for rendering the root component.
 *
 * Details:
 * - Imports CSS for styling.
 * - Imports the main App component which is the root of the React component tree.
 * - Wraps the App component with ThemeProvider for consistent theming across the application.
 * - Utilizes ReactDOM.createRoot for concurrent mode, enabling React 18 features.
 * - Envelops the App component with React.StrictMode for highlighting potential problems in an application.
 * - Invokes reportWebVitals for measuring the performance of the app.
 *
 * Usage:
 * Run `npm start` to start the development server. This file is the starting point of the application,
 * rendering the App component into the root DOM node.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './contexts/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();