import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProfile } from "../profile/profileSlice";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const steps = [
  "Basic Information",
  "Profile Details",
  "Social Links",
  "Skills & Interests",
];

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
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

  const handleInputChange = (e) => {
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

  const addSkill = () => {
    if (registerData.customSkill.trim()) {
      setRegisterData({
        ...registerData,
        skills: [...registerData.skills, registerData.customSkill.trim()],
        customSkill: "",
      });
    }
  };

  const removeSkill = (index) => {
    setRegisterData({
      ...registerData,
      skills: registerData.skills.filter((_, i) => i !== index),
    });
  };

  const addInterest = () => {
    if (registerData.customInterest.trim()) {
      setRegisterData({
        ...registerData,
        interests: [
          ...registerData.interests,
          registerData.customInterest.trim(),
        ],
        customInterest: "",
      });
    }
  };

  const removeInterest = (index) => {
    setRegisterData({
      ...registerData,
      interests: registerData.interests.filter((_, i) => i !== index),
    });
  };

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 0) {
      if (!registerData.name) newErrors.name = "Name is required";
      if (!registerData.email) newErrors.email = "Email is required";
      if (!registerData.password) newErrors.password = "Password is required";
      if (!registerData.batch) newErrors.batch = "Batch is required";
    } else if (currentStep === 1) {
      if (!registerData.image)
        newErrors.image = "Profile picture URL is required";
      if (!registerData.education)
        newErrors.education = "Education is required";
      if (!registerData.bio) newErrors.bio = "Bio is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

const renderStepContent = () => {
    switch (currentStep) {
        case 0:
            return (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-900 text-sm font-semibold mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={registerData.name}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                required
                            />
                            {errors.name && (
                                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-900 text-sm font-semibold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={registerData.email}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                required
                            />
                            {errors.email && (
                                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-900 text-sm font-semibold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={registerData.password}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                required
                            />
                            {errors.password && (
                                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-900 text-sm font-semibold mb-2">
                                Batch
                            </label>
                            <input
                                type="text"
                                name="batch"
                                value={registerData.batch}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                required
                            />
                            {errors.batch && (
                                <p className="text-red-600 text-sm mt-1">{errors.batch}</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-900 text-sm font-semibold mb-2">
                            Role
                        </label>
                        <select
                            name="role"
                            value={registerData.role}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            required
                        >
                            <option value="student">Student</option>
                            <option value="alumni">Alumni</option>
                        </select>
                    </div>
                </div>
            );

        case 1:
            return (
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-900 text-sm font-semibold mb-2">
                            Profile Picture URL
                        </label>
                        <input
                            type="text"
                            name="image"
                            value={registerData.image}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            required
                        />
                        {errors.image && (
                            <p className="text-red-600 text-sm mt-1">{errors.image}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-900 text-sm font-semibold mb-2">
                            Education
                        </label>
                        <input
                            type="text"
                            name="education"
                            value={registerData.education}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            required
                        />
                        {errors.education && (
                            <p className="text-red-600 text-sm mt-1">{errors.education}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-900 text-sm font-semibold mb-2">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            value={registerData.bio}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            rows="4"
                            required
                        />
                        {errors.bio && (
                            <p className="text-red-600 text-sm mt-1">{errors.bio}</p>
                        )}
                    </div>
                </div>
            );

        case 2:
            return (
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-900 text-sm font-semibold mb-2">
                            LinkedIn
                        </label>
                        <input
                            type="text"
                            name="linkedin"
                            value={registerData.socialLinks.linkedin}
                            onChange={handleSocialLinkChange}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-900 text-sm font-semibold mb-2">
                            GitHub
                        </label>
                        <input
                            type="text"
                            name="github"
                            value={registerData.socialLinks.github}
                            onChange={handleSocialLinkChange}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-900 text-sm font-semibold mb-2">
                            Twitter
                        </label>
                        <input
                            type="text"
                            name="twitter"
                            value={registerData.socialLinks.twitter}
                            onChange={handleSocialLinkChange}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                    </div>
                </div>
            );

        case 3:
            return (
                <div className="space-y-6">
                    <div>
                        <label className="block text-gray-900 text-sm font-semibold mb-2">
                            Skills
                        </label>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                name="customSkill"
                                value={registerData.customSkill}
                                onChange={handleInputChange}
                                className="flex-1 p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                placeholder="Enter a skill"
                            />
                            <button
                                type="button"
                                onClick={addSkill}
                                className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {registerData.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                                >
                                    <span className="mr-2">{skill}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeSkill(index)}
                                        className="ml-1 text-white hover:text-gray-200 focus:outline-none"
                                        aria-label={`Remove skill ${skill}`}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-900 text-sm font-semibold mb-2">
                            Interests
                        </label>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                name="customInterest"
                                value={registerData.customInterest}
                                onChange={handleInputChange}
                                className="flex-1 p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                placeholder="Enter an interest"
                            />
                            <button
                                type="button"
                                onClick={addInterest}
                                className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition duration-200"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {registerData.interests.map((interest, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center bg-green-600 text-white px-3 py-1 rounded-full text-sm"
                                >
                                    <span className="mr-2">{interest}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeInterest(index)}
                                        className="ml-1 text-white hover:text-gray-200 focus:outline-none"
                                        aria-label={`Remove interest ${interest}`}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            );

        default:
            return null;
    }
};

  return (
    <div className="pt-10 w-full  flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">AlumConnect</h1>
          <p className="text-gray-600">
            Join our community in just a few steps
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    index <= currentStep
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`text-xs mt-2 text-center ${
                    index === currentStep
                      ? "text-blue-600 font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <form
          onSubmit={
            currentStep === steps.length - 1
              ? handleSubmit
              : (e) => {
                  e.preventDefault();
                  handleNext();
                }
          }
        >
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 0 ? (
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition duration-200"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < steps.length - 1 ? (
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating Account..." : "Complete Registration"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
