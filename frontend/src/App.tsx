/**
 * Main App Component
 *
 * This component serves as the root of the application's component hierarchy.
 *
 * Features:
 * - Sets up a Router for handling navigation within the application.
 * - Defines the main layout structure, including the Navbar and content area.
 * - Includes Routes for different pages: Home, Analyser, Search, and ResultsPage.
 * - Utilizes CSS files for styling of the App and Table components.
 *
 * Structure:
 * - The Router component wraps the entire application to enable client-side routing.
 * - The Navbar component is consistently displayed across all routes.
 * - The Routes component defines the mapping between paths and their corresponding components.
 * 
 * Usage:
 * - This component is the central hub for navigating between different parts of the application.
 * - Each Route element corresponds to a different view, allowing users to navigate the application's features.
 */

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/App.css';
import './css/Table.css';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import Analyser from './components/analyser/Analyser';
import Search from './components/search/Search';
import ResultsPage from './components/result/ResultPage';

const App: React.FC = () => (

  <Router>
    <div className='App'>
      <Navbar />
      <div className='content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyser" element={<Analyser />} />
          <Route path="/search" element={<Search />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </div>
      
    </div>
  </Router>

);

export default App;