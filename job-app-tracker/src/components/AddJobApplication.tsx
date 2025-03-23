import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchJobApplications } from "../redux/jobApplicationSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddJobApplication: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        company: "",
        position: "",
        status: "applied",
        applicationDate: new Date().toISOString().split("T")[0],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            await axios.post("https://localhost:8484/api/JobApplication", formData, {
                headers: { "Content-Type": "application/json" },
            });


            dispatch(fetchJobApplications());


            setFormData({
                company: "",
                position: "",
                status: "applied",
                applicationDate: new Date().toISOString().split("T")[0],
            });
            navigate("/");
        } catch (error) {
            console.error("Error adding job application:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
            <div className = "form-job">
                <label className="block font-bold">Company</label>
                <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className = "form-job">
                <label className="block font-bold">Position</label>
                <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className = "form-job">
                <label className="block font-bold">Status</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="applied">Interview</option>
                    <option value="waiting">Offer</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>
            <div className = "form-job">
                <label className="block font-bold">Application Date</label>
                <input
                    type="date"
                    name="applicationDate"
                    value={formData.applicationDate}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />
            </div>
            <button
                type="submit"
                className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Add Job Application
            </button>
        </form>
    );
};

export default AddJobApplication;
