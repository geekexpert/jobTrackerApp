import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store"; 
import axios from "axios"; 
import { fetchJobApplications } from "../redux/jobApplicationSlice"; 

const EditJobStatus: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();

  const [status, setStatus] = useState<string>("");


  useEffect(() => {
    if (jobId) {
   
      setStatus("applied");
    }
  }, [jobId]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (jobId) {
      try {
     
        await axios.put(
          `https://localhost:8484/api/JobApplication/${jobId}`,
          { status },
          { headers: { "Content-Type": "application/json" } }
        );

       
        dispatch(fetchJobApplications());

  
        navigate("/");

      } catch (error) {
        navigate("/");
        console.error("Error updating job application status:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
      <div>
        <label className="block font-bold">Status</label>
        <select
          value={status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="applied">Applied</option>
          <option value="waiting">Waiting</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Update Status
      </button>
    </form>
  );
};

export default EditJobStatus;
