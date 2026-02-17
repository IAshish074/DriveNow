import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {

  const { setShowLogin, axios, navigate, fetchUser } = useAppContext();

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const payload =
        state === "register"
          ? { name, email, password }
          : { email, password };

      const { data } = await axios.post(
        `/api/user/${state}`,
        payload,
        { withCredentials: true }  // 🔥 IMPORTANT
      );

      if (data.success) {

        await fetchUser();  // 🔥 Load user after login

        setShowLogin(false);
        navigate("/");

        toast.success(
          state === "login"
            ? "Login Successful"
            : "Account Created"
        );

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message
      );
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
                   p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          {state === "login"
            ? "Login Now"
            : "Create Account"}
        </h2>

        {state === "register" && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your name"
            required
            className="w-full border border-gray-300 rounded-full py-2.5 px-4 mb-4 focus:ring-2 focus:ring-red-400"
          />
        )}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email"
          required
          className="w-full border border-gray-300 rounded-full py-2.5 px-4 mb-4 focus:ring-2 focus:ring-red-400"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
          required
          className="w-full border border-gray-300 rounded-full py-2.5 px-4 mb-4 focus:ring-2 focus:ring-red-400"
        />

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 
                     active:scale-95 transition 
                     py-2.5 rounded-full text-white font-medium"
        >
          {state === "login"
            ? "Log in"
            : "Sign up"}
        </button>

        <p className="text-center mt-4 text-sm">
          {state === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setState("register")}
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
