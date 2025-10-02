import { useState } from "react";
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
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-4 md:p-8 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 md:mb-6 text-center">
          My Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-gray-700 text-sm md:text-base">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg text-sm md:text-base"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm md:text-base">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg text-sm md:text-base"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-gray-700 text-sm md:text-base">
                Batch
              </label>
              <input
                type="text"
                name="batch"
                value={profileData.batch}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg text-sm md:text-base"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm md:text-base">
                Profile Picture URL
              </label>
              <input
                type="text"
                name="image"
                value={profileData.image}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg text-sm md:text-base"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm md:text-base">
              Education
            </label>
            <input
              type="text"
              name="education"
              value={profileData.education}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg text-sm md:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm md:text-base">
              Bio
            </label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg text-sm md:text-base"
              rows="3"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <div>
              <label className="block text-gray-700 text-sm md:text-base">
                LinkedIn
              </label>
              <input
                type="text"
                name="linkedin"
                value={profileData.socialLinks.linkedin || ""}
                onChange={handleSocialLinkChange}
                className="w-full p-2 border rounded-lg text-sm md:text-base"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm md:text-base">
                GitHub
              </label>
              <input
                type="text"
                name="github"
                value={profileData.socialLinks.github || ""}
                onChange={handleSocialLinkChange}
                className="w-full p-2 border rounded-lg text-sm md:text-base"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm md:text-base">
                Twitter
              </label>
              <input
                type="text"
                name="twitter"
                value={profileData.socialLinks.twitter || ""}
                onChange={handleSocialLinkChange}
                className="w-full p-2 border rounded-lg text-sm md:text-base"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm md:text-base">
              Skills
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="customSkill"
                value={customSkill}
                onChange={handleSkillChange}
                className="flex-1 p-2 border rounded-lg text-sm md:text-base"
                placeholder="Enter a skill"
              />
              <button
                type="button"
                onClick={addSkill}
                className="bg-blue-500 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 text-sm md:text-base whitespace-nowrap"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {profileData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs md:text-sm font-semibold text-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm md:text-base">
              Interests
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="customInterest"
                value={customInterest}
                onChange={handleInterestChange}
                className="flex-1 p-2 border rounded-lg text-sm md:text-base"
                placeholder="Enter an interest"
              />
              <button
                type="button"
                onClick={addInterest}
                className="bg-blue-500 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 text-sm md:text-base whitespace-nowrap"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {profileData.interests.map((interest, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs md:text-sm font-semibold text-gray-700"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 text-sm md:text-base"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfilePage;