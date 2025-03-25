import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://localhost:8484/api/JobApplication";
// create slices which are sent as reducers 
// This required to be in a interface file, duplicated for time being 
interface JobApplication {
  id: number;
  company: string;
  position: string;
  status: string;
  applicationDate: string;
}


interface JobApplicationState {
  jobs: JobApplication[];
  loading: boolean;
  error: string | null;
}


const initialState: JobApplicationState = {
  jobs: [],
  loading: false,
  error: null,
};


// get all the jobs from Database
export const fetchJobApplications = createAsyncThunk<JobApplication[]>(
  "jobApplications/fetchJobApplications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch jobs");
    }
  }
);

export const updateJobApplicationStatus = createAsyncThunk<
  JobApplication,
  { jobId: number; status: string }
>("jobApplications/updateJobApplicationStatus", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `${API_URL}/${data.jobId}`,
      { status: data.status },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Failed to update status");
  }
});


const jobApplicationSlice = createSlice({
  name: "jobApplications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchJobApplications.fulfilled,
        (state, action: PayloadAction<JobApplication[]>) => {
          state.loading = false;
          state.jobs = action.payload;
        }
      )
      .addCase(fetchJobApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateJobApplicationStatus.fulfilled, (state, action: PayloadAction<JobApplication>) => {
        state.jobs = state.jobs.map((job) =>
          job.id === action.payload.id ? action.payload : job
        );
      });;
  },
});

export default jobApplicationSlice.reducer;
