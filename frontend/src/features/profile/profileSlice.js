import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "John Doe",
  email: "john.doe@example.com",
  profilePicture: "https://avatars.githubusercontent.com/u/124435030?v=4",
  bio: "Software Developer with 5 years of experience.",
  education: "B.Sc. in Computer Science",
  skills: ["JavaScript", "React", "Node.js"],
  interests: ["Coding", "Reading", "Gaming"],
  batch: "2020",
  github: "https://github.com/johndoe",
  linkedin: "https://linkedin.com/in/johndoe",
  twitter: "https://twitter.com/johndoe",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
