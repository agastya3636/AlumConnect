import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProfile } from "../profile/profileSlice";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" ,role:""});
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    batch: "",
    role: "student", 
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
    customSkill: "",
    customInterest: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      socialLinks: { ...prevData.socialLinks, [name]: value },
    }));
  };

  const handleCustomSkillChange = (e) => {
    setRegisterData({ ...registerData, customSkill: e.target.value });
  };

  const handleCustomInterestChange = (e) => {
    setRegisterData({ ...registerData, customInterest: e.target.value });
  };

 const handleLoginSubmit = async (e) => {
  e.preventDefault();


  try {
    const response = await fetch(
      `${API_BASE_URL}/api/${loginData.role.toLowerCase()}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const data = await response.json();
    console.log("Login Response:", data);
    const token = data.token;
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; 
    const expires = new Date(Date.now() + oneDayInMilliseconds).toUTCString();
    document.cookie = `token=${token}; path=/; expires=${expires}; Secure; SameSite=None`;
    dispatch(updateProfile(data));  
    navigate("/dashboard");
  } catch (error) {
    console.error("Error during login:", error);
    // Show an error message here, such as setting an error state
  }
};

const handleRegisterSubmit = async (e) => {
  e.preventDefault();

  // Prepare the final register data
  const finalRegisterData = {
    ...registerData,
    skills: registerData.customSkill
      ? [...registerData.skills, registerData.customSkill]
      : registerData.skills,
    interests: registerData.customInterest
      ? [...registerData.interests, registerData.customInterest]
      : registerData.interests,
  };

  console.log("Register Data:", finalRegisterData);


  try {
    const response = await fetch(
      `${API_BASE_URL}/api/${registerData.role.toLowerCase()}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalRegisterData),
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    const data = await response.json();
    console.log("Register Response:", data);
    const token = data.token;
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; 
    const expires = new Date(Date.now() + oneDayInMilliseconds).toUTCString();
    document.cookie = `token=${token}; path=/; expires=${expires}; Secure; SameSite=None`;
    dispatch(updateProfile(data));  
    navigate("/dashboard");

  } catch (error) {
    console.error("Error during registration:", error);
    // Show an error message here, such as setting an error state
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 p-8 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>
        {isLogin ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Role</label>
              <select
                name="role"
                value={loginData.role}
                onChange={handleLoginChange}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="student">Student</option>
                <option value="alumni">Alumni</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={registerData.name}
                onChange={handleRegisterChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Batch</label>
              <input
                type="text"
                name="batch"
                value={registerData.batch}
                onChange={handleRegisterChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Role</label>
              <select
                name="role"
                value={registerData.role}
                onChange={handleRegisterChange}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="student">Student</option>
                <option value="alumni">Alumni</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Profile Picture URL</label>
              <input
                type="text"
                name="image"
                value={registerData.image}
                onChange={handleRegisterChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Education</label>
              <input
                type="text"
                name="education"
                value={registerData.education}
                onChange={handleRegisterChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Bio</label>
              <textarea
                name="bio"
                value={registerData.bio}
                onChange={handleRegisterChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">LinkedIn</label>
              <input
                type="text"
                name="linkedin"
                value={registerData.socialLinks.linkedin}
                onChange={handleSocialLinkChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">GitHub</label>
              <input
                type="text"
                name="github"
                value={registerData.socialLinks.github}
                onChange={handleSocialLinkChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">Twitter</label>
              <input
                type="text"
                name="twitter"
                value={registerData.socialLinks.twitter}
                onChange={handleSocialLinkChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">Skills</label>
              <input
                type="text"
                name="customSkill"
                value={registerData.customSkill}
                onChange={handleCustomSkillChange}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter a skill"
              />
              <button
                type="button"
                onClick={() => {
                  if (registerData.customSkill) {
                    setRegisterData((prevData) => ({
                      ...prevData,
                      skills: [...prevData.skills, registerData.customSkill],
                      customSkill: "",
                    }));
                  }
                }}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Add Skill
              </button>
              <div className="mt-2">
                {registerData.skills.map((skill, index) => (
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
                value={registerData.customInterest}
                onChange={handleCustomInterestChange}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter an interest"
              />
              <button
                type="button"
                onClick={() => {
                  if (registerData.customInterest) {
                    setRegisterData((prevData) => ({
                      ...prevData,
                      interests: [
                        ...prevData.interests,
                        registerData.customInterest,
                      ],
                      customInterest: "",
                    }));
                  }
                }}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Add Interest
              </button>
              <div className="mt-2">
                {registerData.interests.map((interest, index) => (
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
              Register
            </button>
          </form>
        )}
        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 ml-2 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
