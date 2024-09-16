import { createSlice } from "@reduxjs/toolkit";

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
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
