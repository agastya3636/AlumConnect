// profileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch profile data from API
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    const response = await fetch("/api/profile"); // Replace with your actual API endpoint
    const data = await response.json();
    return data;
  }
);

const initialState = {
  name: "",
  email: "",
  password: "",
  batch: "",
  role: "",
  image: "",
  education: "",
  skills: [],
  interests: [],
  bio: "",
  socialLinks: {
    linkedin: "",
    github: "",
    twitter: "",
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
