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
        {/* This is the routing for the app. Probably not the best place to put but here for the moment */}
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
