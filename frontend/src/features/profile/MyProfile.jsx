import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../profile/profileSlice"; 
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MyProfilePage = () => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState({
    ...profile,
    socialLinks: profile.socialLinks || {}, 
    skills: profile.skills || [],
    interests: profile.interests || [],
  });
  const [customSkill, setCustomSkill] = useState("");
  const [customInterest, setCustomInterest] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      socialLinks: { ...prevData.socialLinks, [name]: value },
    }));
  };

  const handleSkillChange = (e) => {
    setCustomSkill(e.target.value);
  };

  const handleInterestChange = (e) => {
    setCustomInterest(e.target.value);
  };

  const addSkill = () => {
    if (customSkill) {
      setProfileData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, customSkill],
      }));
      setCustomSkill("");
    }
  };

  const addInterest = () => {
    if (customInterest) {
      setProfileData((prevData) => ({
        ...prevData,
        interests: [...prevData.interests, customInterest],
      }));
      setCustomInterest("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("dete p:" + JSON.stringify(profileData));
      const updateProfileResponse = await fetch(
        `${API_BASE_URL}/api/${profileData.role}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData),
          credentials: "include",
        }
      );
      if (!updateProfileResponse.ok) {
        throw new Error("Failed to update profile");
      }
      console.log("Profile updated successfully");
      dispatch(updateProfile(profileData));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-8 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          My Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Batch</label>
            <input
              type="text"
              name="batch"
              value={profileData.batch}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Profile Picture URL</label>
            <input
              type="text"
              name="image"
              value={profileData.image}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Education</label>
            <input
              type="text"
              name="education"
              value={profileData.education}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={profileData.socialLinks.linkedin || ""}
              onChange={handleSocialLinkChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">GitHub</label>
            <input
              type="text"
              name="github"
              value={profileData.socialLinks.github || ""}
              onChange={handleSocialLinkChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Twitter</label>
            <input
              type="text"
              name="twitter"
              value={profileData.socialLinks.twitter || ""}
              onChange={handleSocialLinkChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Skills</label>
            <input
              type="text"
              name="customSkill"
              value={customSkill}
              onChange={handleSkillChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter a skill"
            />
            <button
              type="button"
              onClick={addSkill}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Add Skill
            </button>
            <div className="mt-2">
              {profileData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Interests</label>
            <input
              type="text"
              name="customInterest"
              value={customInterest}
              onChange={handleInterestChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter an interest"
            />
            <button
              type="button"
              onClick={addInterest}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Add Interest
            </button>
            <div className="mt-2">
              {profileData.interests.map((interest, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfilePage;
