import React from 'react';
import { Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import StudentForm from './pages/StudentForm';
import Results from './pages/Results';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/form" element={<StudentForm />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );
}

export default App;