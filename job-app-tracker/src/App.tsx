import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import JobApplicationList from "./components/JobApplicationList";  
import AddJobApplication from "./components/AddJobApplication";
import EditJobStatus from "./components/EditJobStatus"; 
import 'bootstrap/dist/css/bootstrap.min.css';



const App: React.FC = () => {
  return (
    <Router> 
      <div className="App container">
        <h1 className="text-primary">Job Application Tracker</h1>
        <Routes>
          <Route path="/" element={<JobApplicationList />} /> 
          <Route path="/add" element={<AddJobApplication />} /> 
          <Route path="/edit/:jobId" element={<EditJobStatus />} /> 
        </Routes>
      </div>
    </Router>
  );
};
 
export default App;
