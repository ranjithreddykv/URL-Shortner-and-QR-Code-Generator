import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function Register() {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
    async function registerUser(e) {
      e.preventDefault();
      try{
      const user=await axios.post("/user/register", {
        name,
        email,
        password,
      });
      
      alert("Registration successful.Now you can login");
    }
    catch (err) {
    alert("Registeration failed try again");
      console.error(err.response?.data || err.message);
  }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="w-full mt-24 px-4">
        <h1 className="font-extrabold text-4xl text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500">
          Register
        </h1>
        <form
          onSubmit={registerUser}
          className="flex flex-col gap-6 bg-white shadow-xl rounded-2xl p-8 max-w-md mx-auto"
        >
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition"
          >
            Register
          </button>
          <div className="text-center text-gray-600">
            Already a member?{" "}
            <Link to="/login" className="text-indigo-600 underline font-medium">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register
