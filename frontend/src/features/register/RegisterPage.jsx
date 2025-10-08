import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProfile } from "../profile/profileSlice";
import { registerFormFields } from "./registerFormFields.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const stepHeadings = {
  1: "Personal Info",
  2: "Profile Info",
  3: "Skills & Interests",
};

const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
    batch: "",
    role: "",
    profilePicture: "",
    education: "",
    bio: "",
    linkedin: "",
    github: "",
    twitter: "",
    skills: [],
    interests: [],
  });
  const [otherSkill, setOtherSkill] = useState("");
  const [otherInterest, setOtherInterest] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Input handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (e, fieldName) => {
    const { value, checked } = e.target;
    setRegisterData((prev) => {
      const arr = prev[fieldName];
      if (checked) return { ...prev, [fieldName]: [...arr, value] };
      return { ...prev, [fieldName]: arr.filter((v) => v !== value) };
    });
  };

  const handleAddSkill = () => {
    if (!otherSkill.trim()) return;
    setRegisterData((prev) => ({
      ...prev,
      skills: [...new Set([...prev.skills, otherSkill.trim()])],
    }));
    setOtherSkill("");
  };

  const handleAddInterest = () => {
    if (!otherInterest.trim()) return;
    setRegisterData((prev) => ({
      ...prev,
      interests: [...new Set([...prev.interests, otherInterest.trim()])],
    }));
    setOtherInterest("");
  };

  // ✅ Step validation
  const validateStep = (step = currentStep) => {
    const fields = registerFormFields[step];

    return fields.every((field) => {
      if (!field.required) return true; // skip non-required fields

      const value = registerData[field.name];

      if (field.type === "multiselect") {
        return Array.isArray(value) && value.length > 0; // ensure at least one selected
      }

      if (field.type === "select") {
        return value?.toString().trim() !== ""; // check select value is not empty
      }

      // text/email/password
      return value?.toString().trim() !== "";
    });
  };


  const allStepsValid = () => {
    return Object.keys(registerFormFields).every((step) => validateStep(Number(step)));
  };

  const nextStep = () => {
    if (validateStep()) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allStepsValid()) {
      alert("Please fill all required fields in all steps.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/${registerData.role}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(registerData),
      });

      if (!response.ok) throw new Error("Registration failed");

      const data = await response.json();
      dispatch(updateProfile(data));
      alert("Registration successful!");

      // ✅ Clear form
      setRegisterData({
        fullName: "",
        email: "",
        password: "",
        batch: "",
        role: "",
        profilePicture: "",
        education: "",
        bio: "",
        linkedin: "",
        github: "",
        twitter: "",
        skills: [],
        interests: [],
      });
      setCurrentStep(1);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalSteps = Object.keys(registerFormFields).length;

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 p-4">
      <div className="bg-white dark:bg-slate-900/60 dark:border dark:border-slate-700 rounded-lg shadow-lg p-6 w-[90%] md:max-w-3xl">
        <div className="flex flex-col justify-center items-center gap-2 mb-5">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-slate-100">Register</h2>
          <p className="text-gray-400 text-center">Welcome! Please enter your details to create an account.</p>
        </div>

        {/* Stepper */}
        <div className="flex justify-between mb-6">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <div key={step} className="flex-1 text-center">
              <div
                className={`w-10 h-10 mx-auto rounded-full text-white flex items-center justify-center font-semibold ${currentStep === step ? "bg-blue-600 dark:bg-blue-700" : "bg-gray-300 dark:bg-gray-700"
                  }`}
              >
                {step}
              </div>
              <span className="text-sm mt-1 block text-gray-700 dark:text-slate-300">{stepHeadings[step]}</span>
            </div>
          ))}
        </div>

        <form className="flex flex-col gap-5">
          {registerFormFields[currentStep].map((field) => {
            if (field.type === "select") {
              return (
                <div key={field.name}>
                  <label className="block text-gray-700 font-medium dark:text-slate-300 mb-1">
                    {field.label} {field.required && "*"}
                  </label>
                  <select
                    name={field.name}
                    value={registerData[field.name] || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            if (field.type === "multiselect") {
              return (
                <div key={field.name}>
                  <label className="block text-gray-700 font-medium dark:text-slate-300 mb-1">
                    {field.label} {field.required && "*"}
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {field.options.map((opt) => (
                      <label key={opt.value} className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          value={opt.value}
                          checked={registerData[field.name]?.includes(opt.value) || false}
                          onChange={(e) => handleMultiSelectChange(e, field.name)}
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                  {(field.name === "skills" || field.name === "interests") && (
                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        placeholder={`Add other ${field.name.slice(0, -1)}`}
                        value={field.name === "skills" ? otherSkill : otherInterest}
                        onChange={(e) =>
                          field.name === "skills" ? setOtherSkill(e.target.value) : setOtherInterest(e.target.value)
                        }
                        className="flex-1 p-2 border rounded-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                      />
                      <button
                        type="button"
                        onClick={field.name === "skills" ? handleAddSkill : handleAddInterest}
                        className="px-4 py-2 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg"
                      >
                        Add
                      </button>
                    </div>
                  )}
                  {registerData[field.name]?.length > 0 && (
                    <div className="mt-2 text-sm text-gray-700 dark:text-slate-300">
                      Added {field.label.toLowerCase()}: {registerData[field.name].join(", ")}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div key={field.name}>
                <label className="block text-gray-700 font-medium dark:text-slate-300 mb-1">
                  {field.label} {field.required && "*"}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={registerData[field.name] || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                />
              </div>
            );
          })}

          {/* Navigation buttons */}
          <div className="w-full flex gap-2 justify-between mt-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="w-full px-4 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 rounded-lg"
              >
                Back
              </button>
            )}

            {currentStep < totalSteps && (
              <button
                type="button"
                onClick={nextStep}
                disabled={!validateStep()}
                className={`w-full px-4 py-2 ${validateStep() ? "bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white" : "bg-gray-400 cursor-not-allowed"
                  } rounded-lg`}
              >
                Next
              </button>
            )}

            {currentStep === totalSteps && (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !allStepsValid()}
                className={`w-full px-4 py-2 ${allStepsValid() ? "bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600 text-white" : "bg-gray-400 cursor-not-allowed"
                  } rounded-lg`}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;