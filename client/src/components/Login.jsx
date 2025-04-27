import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext.js"

const Login = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUser}=useContext(UserContext);
  
  async function loginUser(e) {
    e.preventDefault();

    try {
      const response = await axios.post("/user/login", {
        email,
        password,
      });
      setUser(response.data.data);
      alert("Login successfully");
      navigate('/');
      
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Invalid user");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="w-full mt-24 px-4">
        <h1 className="font-extrabold text-4xl text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500">
          Login
        </h1>
        <form
          onSubmit={loginUser}
          className="flex flex-col gap-6 bg-white shadow-xl rounded-2xl p-8 max-w-md mx-auto"
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@email.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition"
          >
            Login
          </button>
          <div className="text-center text-gray-600">
            Don’t have an account yet?{" "}
            <Link
              to="/register"
              className="text-indigo-600 underline font-medium"
            >
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
