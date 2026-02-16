import React, { useState } from "react";

const Login = ({ setShowLogin }) => {

  const [state, setState] = useState("login"); // login | signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "login") {
      console.log("Login Data:", { email, password });
    } else {
      console.log("Signup Data:", { name, email, password });
    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 z-50 flex items-center justify-center 
                 bg-black/50 backdrop-blur-sm px-4"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-gray-600 w-full max-w-sm 
                   p-6 rounded-xl shadow-lg transition-all"
      >

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          {state === "login" ? "Login Now" : "Create Account"}
        </h2>

        {/* Name (Signup Only) */}
        {state === "signup" && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your name"
            required
            className="w-full border border-gray-300 outline-none 
                       rounded-full py-2.5 px-4 mb-4 
                       focus:ring-2 focus:ring-red-400"
          />
        )}

        {/* Email */}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email"
          required
          className="w-full border border-gray-300 outline-none 
                     rounded-full py-2.5 px-4 mb-4 
                     focus:ring-2 focus:ring-red-400"
        />

        {/* Password */}
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
          required
          className="w-full border border-gray-300 outline-none 
                     rounded-full py-2.5 px-4 mb-4 
                     focus:ring-2 focus:ring-red-400"
        />

        {/* Forgot Password (Login Only) */}
        {state === "login" && (
          <div className="text-right mb-4">
            <button
              type="button"
              className="text-blue-600 underline text-sm"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 
                     active:scale-95 transition 
                     py-2.5 rounded-full text-white font-medium"
        >
          {state === "login" ? "Log in" : "Sign up"}
        </button>

        {/* Toggle */}
        <p className="text-center mt-4 text-sm">
          {state === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setState("signup")}
                className="text-blue-500 underline"
              >
                Signup Now
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setState("login")}
                className="text-blue-500 underline"
              >
                Login Here
              </button>
            </>
          )}
        </p>

      </form>
    </div>
  );
};

export default Login;
