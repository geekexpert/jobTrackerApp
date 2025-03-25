import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import axios from "axios";
import { fetchJobApplications } from "../redux/jobApplicationSlice";

// This required to be in a interface file, duplicated for time being 
interface JobApplication {
  id: number;
  company: string;
  position: string;
  status: string;
  applicationDate: string;
}
const EditJobStatus: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();

  const { jobs, loading, error } = useSelector(
    (state: RootState) => state.jobApplications
  );

  const [job, setJob] = useState<JobApplication | null>(null);


  useEffect(() => {
    if (jobId && jobs.length > 0) {
      const foundJob = jobs.find((j) => j.id.toString() === jobId);
      if (foundJob) {
        setJob(foundJob);
      }
    }
  }, [jobId, jobs]); 

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (job) {
      setJob({ ...job, status: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (job) {
      try {
        await axios.put(
          `https://localhost:8484/api/JobApplication/${job.id}`,
          job, 
          { headers: { "Content-Type": "application/json" } }
        );

        dispatch(fetchJobApplications());
        navigate("/");
      } catch (error) {
        console.error("Error updating job application status:", error);
        navigate("/");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
      <div>
        <label className="block font-bold">Status</label>
        <select
          value={job?.status || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={!job}
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="waiting">Waiting</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        disabled={!job}
      >
        Update Status
      </button>
    </form>
  );
};

export default EditJobStatus;
