import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProfile } from "../profile/profileSlice";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "", role: "student", remember: false,username:"",
  mobile: "" });
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
    username: "", // for college/admin
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === "checkbox" ? checked : value,
    });
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
    setLoading(true);
    setError("");
    setSuccess("");
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
      const token = data.token;
      const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
      const expires = new Date(Date.now() + oneDayInMilliseconds).toUTCString();
      const cookieFlags =
  window.location.hostname === "localhost"
    ? `token=${token}; path=/; expires=${expires}`
    : `token=${token}; path=/; expires=${expires}; Secure; SameSite=None`;

document.cookie = cookieFlags;
      dispatch(updateProfile(data));
      setSuccess("Login successful!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      setError("Error during login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const finalRegisterData = {
      ...registerData,
      skills: registerData.customSkill
        ? [...registerData.skills, registerData.customSkill]
        : registerData.skills,
      interests: registerData.customInterest
        ? [...registerData.interests, registerData.customInterest]
        : registerData.interests,
    };
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
      const token = data.token;
      const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
      const expires = new Date(Date.now() + oneDayInMilliseconds).toUTCString();
      document.cookie = `token=${token}; path=/; expires=${expires}; Secure; SameSite=None`;
      dispatch(updateProfile(data));
      setSuccess("Registration successful!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      setError("Error during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Dummy social login handlers
  const handleGoogleLogin = () => {
    setError("");
    setSuccess("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess("Google login (demo) successful!");
      setTimeout(() => navigate("/dashboard"), 1000);
    }, 1200);
  };
  const handleLinkedInLogin = () => {
    setError("");
    setSuccess("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess("LinkedIn login (demo) successful!");
      setTimeout(() => navigate("/dashboard"), 1000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 p-4 md:p-8 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 md:mb-6 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>
        {isLogin ? (
          <>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
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
                  <option value="college">College</option>
                  <option value="admin">Admin</option>
                   <option value="faculty">Faculty</option>
                   <option value="recruiter">Recruiter</option>
                   <option value="guest">Guest</option>
                </select>
              </div>
              {loginData.role === "college" || loginData.role === "admin" ? (
                <div>
                  <label className="block text-gray-700">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={loginData.username || ""}
                    onChange={handleLoginChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
              ) : (
                <>
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
                    <label className="block text-gray-700">Or Mobile Number</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={loginData.mobile || ""}
                      onChange={handleLoginChange}
                      className="w-full p-2 border rounded-lg"
                      placeholder="Enter mobile number"
                    />
                    <button
                      type="button"
                      className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                      onClick={() => setError("OTP login feature coming soon!")}
                    >
                      Login with OTP
                    </button>
                  </div>
                </>
              )}
              <div>
                <label className="block text-gray-700">Password
                  <span className="ml-2 text-xs text-gray-500 cursor-pointer" title="Password must be at least 8 characters, include a number and a special character.">❓</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-sm text-blue-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="remember"
                  checked={loginData.remember}
                  onChange={handleLoginChange}
                  className="mr-2"
                />
                <label className="text-gray-700">Remember Me</label>
                <button
                  type="button"
                  className="ml-auto text-blue-500 hover:underline text-sm"
                  onClick={() => setError("Forgot password feature coming soon!")}
                >
                  Forgot Password?
                </button>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-gray-700 mr-2">2FA Enabled</span>
                <input type="checkbox" disabled checked className="accent-blue-500" />
                <span className="ml-2 text-xs text-gray-400">(Demo)</span>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <button
                type="button"
                className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200 mt-2"
                onClick={() => setSuccess("Continuing as guest...")}
              >
                Continue as Guest
              </button>
              <button
                type="button"
                className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200 mt-2"
                onClick={() => setError("Magic link feature coming soon!")}
              >
                Sign in with Magic Link
              </button>
              <button
                type="button"
                className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-200 mt-2"
                onClick={() => setError("QR code login feature coming soon!")}
              >
                Login with QR Code
              </button>
            </form>
            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 flex items-center justify-center"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <span className="mr-2">🔴</span> Login with Google
              </button>
              <button
                type="button"
                className="w-full bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition duration-200 flex items-center justify-center"
                onClick={handleLinkedInLogin}
                disabled={loading}
              >
                <span className="mr-2">💼</span> Login with LinkedIn
              </button>
              <button
                type="button"
                className="w-full bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-200 flex items-center justify-center"
                onClick={() => setError("Facebook login feature coming soon!")}
                disabled={loading}
              >
                <span className="mr-2">📘</span> Login with Facebook
              </button>
              <button
                type="button"
                className="w-full bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition duration-200 flex items-center justify-center"
                onClick={() => setError("Twitter login feature coming soon!")}
                disabled={loading}
              >
                <span className="mr-2">🐦</span> Login with Twitter
              </button>
            </div>
            <div className="mt-4 text-center">
              <a href="mailto:support@alumconnect.com" className="text-blue-500 hover:underline">Contact Support</a>
            </div>
            {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
            {success && <div className="mt-4 text-green-500 text-center">{success}</div>}
          </>
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-sm text-blue-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="block text-gray-700 text-sm md:text-base">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  className="w-full p-2 border rounded-lg text-sm md:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm md:text-base">
                  Batch
                </label>
                <input
                  type="text"
                  name="batch"
                  value={registerData.batch}
                  onChange={handleRegisterChange}
                  className="w-full p-2 border rounded-lg text-sm md:text-base"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm md:text-base">
                Role
              </label>
              <select
                name="role"
                value={registerData.role}
                onChange={handleRegisterChange}
                className="w-full p-2 border rounded-lg text-sm md:text-base"
                required
              >
                <option value="student">Student</option>
                <option value="alumni">Alumni</option>
                <option value="college">College</option>
                <option value="admin">Admin</option>
                 <option value="faculty">Faculty</option>
                 <option value="recruiter">Recruiter</option>
                 <option value="guest">Guest</option>
              </select>
            </div>
            {(registerData.role === "college" || registerData.role === "admin") && (
              <div>
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={registerData.username}
                  onChange={handleRegisterChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-gray-700 text-sm md:text-base">
                Profile Picture URL
              </label>
              <input
                type="text"
                name="image"
                value={registerData.image}
                onChange={handleRegisterChange}
                className="w-full p-2 border rounded-lg text-sm md:text-base"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm md:text-base">
                Education
              </label>
              <input
                type="text"
                name="education"
                value={registerData.education}
                onChange={handleRegisterChange}
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
                value={registerData.bio}
                onChange={handleRegisterChange}
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
                  value={registerData.socialLinks.linkedin}
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
                  value={registerData.socialLinks.github}
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
                  value={registerData.socialLinks.twitter}
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
                  value={registerData.customSkill}
                  onChange={handleCustomSkillChange}
                  className="flex-1 p-2 border rounded-lg text-sm md:text-base"
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
                  className="bg-blue-500 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 text-sm md:text-base whitespace-nowrap"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {registerData.skills.map((skill, index) => (
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
                  value={registerData.customInterest}
                  onChange={handleCustomInterestChange}
                  className="flex-1 p-2 border rounded-lg text-sm md:text-base"
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
                  className="bg-blue-500 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 text-sm md:text-base whitespace-nowrap"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {registerData.interests.map((interest, index) => (
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
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
            {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
            {success && <div className="mt-4 text-green-500 text-center">{success}</div>}
          </form>
        )}
        <p className="mt-4 text-center text-sm md:text-base">
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