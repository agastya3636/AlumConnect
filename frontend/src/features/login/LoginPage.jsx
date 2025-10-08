import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProfile } from "../profile/profileSlice";
import { loginFormFields } from "./loginFormFields";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!loginData.email || !loginData.password || !loginData.role) {
      alert("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/${loginData.role.toLowerCase()}/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData),
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      if (!data.token) throw new Error("No token received");

      const token = data.token;
      const oneDay = 24 * 60 * 60 * 1000;
      document.cookie = `token=${token}; path=/; expires=${new Date(
        Date.now() + oneDay
      ).toUTCString()}; Secure; SameSite=None`;

      dispatch(updateProfile(data));
      navigate("/dashboard");
    } catch (err) {
      console.error("Error during login:", err);
      alert("Invalid credentials or network issue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 p-4">
      <div className="bg-white dark:bg-slate-900/60 dark:border dark:border-slate-700 rounded-lg shadow-lg p-6 w-[90%] md:max-w-3xl">
        <div className="flex flex-col justify-center items-center gap-2 mb-5">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-slate-100">
            Login
          </h2>
          <p className="text-gray-400">
            Welcome back! Please enter your credentials to access your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {loginFormFields.map((field) =>
            field.type === "select" ? (
              <div key={field.name}>
                <label className="block text-gray-700 font-medium dark:text-slate-300 mb-1">
                  {field.label}
                  {field.required && " *"}
                </label>
                <select
                  name={field.name}
                  value={loginData[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  required={field.required}
                >
                  {/* Placeholder option */}
                  <option value="">Select {field.label.toLowerCase()}</option>
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div key={field.name}>
                <label className="block text-gray-700 font-medium dark:text-slate-300 mb-1">
                  {field.label}
                  {field.required && " *"}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={loginData[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  required={field.required}
                />
              </div>
            )
          )}

          <button
            type="submit"
            disabled={loading || !loginData.email || !loginData.password || !loginData.role}
            className="mt-5 w-full bg-blue-600 dark:bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>


        <p className="mt-4 text-center text-sm text-gray-700 dark:text-slate-300">
          Don't have an account?{" "}
          <NavLink
            to="/register"
            className="text-blue-500 hover:underline dark:text-blue-400"
          >
            Register
          </NavLink>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
