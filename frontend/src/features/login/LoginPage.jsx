import { useState } from "react";
import Login from "./Login";
import Registration from "./Registration";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col items-center justify-between min-w-screen pb-6 min-h-screen bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white">
      {isLogin ? <Login /> : <Registration />}

      {/* Inline professional toggler message under the form */}
      <div className="mt-4 text-center text-sm">
        {isLogin ? (
          <>
            Don't have an account?{" "}
            <button
              onClick={() => setIsLogin(false)}
              className="ml-1 bg-white text-black px-3 py-1 rounded font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Create one
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              onClick={() => setIsLogin(true)}
              className="ml-1 bg-white text-black px-3 py-1 rounded font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Sign in
            </button>
          </>
        )}
        <p className="mt-4 text-center text-sm md:text-base">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 dark:text-blue-400 ml-2 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
