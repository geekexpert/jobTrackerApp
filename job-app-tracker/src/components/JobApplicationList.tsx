import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobApplications } from "../redux/jobApplicationSlice";
import { RootState, AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";

const JobApplicationList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { jobs, loading, error } = useSelector(
        (state: RootState) => state.jobApplications
    );

    useEffect(() => {
        dispatch(fetchJobApplications());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Total Applications</h2>

            <button
                className="btn btn-primary mb-3"
                onClick={() => navigate("/add")}
            >
                Add Job Application
            </button>

            <ul>
                
                {jobs.length === 0 ? (
                    <p>No job applications listed.</p>
                ) : (
                    jobs.map((job) => (
                        <li key={job.id} className="mb-3">
                            <strong>{job.position}</strong> at {job.company} - {job.status}
                            <br />
                            <small>Applied on: {new Date(job.applicationDate).toDateString()}</small>
                            <br />
                            <button 
                                className="btn btn-warning mt-2"
                                onClick={() => navigate(`/edit/${job.id}`)}
                            >
                                Edit Status
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default JobApplicationList;
