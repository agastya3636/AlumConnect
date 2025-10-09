import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProfile } from "../profile/profileSlice";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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
      document.cookie = `token=${token}; path=/; expires=${expires}; Secure; SameSite=None`;
      dispatch(updateProfile(data));
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-10 w-full  flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 max-w-md w-full">
        <div className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
            AlumConnect
          </h1>
          <p className="text-gray-600 text-base">
            Welcome back! Sign in to continue your journey.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Role
            </label>
            <select
              name="role"
              value={loginData.role}
              onChange={handleLoginChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
