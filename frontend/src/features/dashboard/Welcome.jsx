// Welcome.js
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProfileCard from "../profile/ProfileCard";
import { fetchProfile } from "../profile/profileSlice";

const Welcome = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <div>
      <ProfileCard />
    </div>
  );
};

export default Welcome;
