import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "./profileSlice";

const MyProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [user, setUser] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSkillsChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      skills: e.target.value.split(",").map((skill) => skill.trim()),
    }));
  };

  const handleInterestsChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      interests: e.target.value.split(",").map((interest) => interest.trim()),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(user));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={user.bio}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Education</label>
            <input
              type="text"
              name="education"
              value={user.education}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Skills (comma separated)
            </label>
            <input
              type="text"
              name="skills"
              value={user.skills.join(", ")}
              onChange={handleSkillsChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Interests (comma separated)
            </label>
            <input
              type="text"
              name="interests"
              value={user.interests.join(", ")}
              onChange={handleInterestsChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Batch</label>
            <input
              type="text"
              name="batch"
              value={user.batch}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Profile Picture URL</label>
            <input
              type="text"
              name="profilePicture"
              value={user.profilePicture}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">GitHub URL</label>
            <input
              type="text"
              name="github"
              value={user.github}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">LinkedIn URL</label>
            <input
              type="text"
              name="linkedin"
              value={user.linkedin}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Twitter URL</label>
            <input
              type="text"
              name="twitter"
              value={user.twitter}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
