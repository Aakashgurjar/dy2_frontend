import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [val, setVal] = useState({ email: "", password: "", fullName: "" });
  // const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("signup", val);
    try {
      const response = await axios.post(
        "https://dy2-1.onrender.com/api/signup",
        val
      );
      const data = await response.data;
      console.log("data, ", data);
      if (data.message === "Signup Successfully" ) {
        toast.success("Signup Successfully");
        setTimeout(() => {
          navigate('/login')
        }, 1000)
      } else {
        toast.error(data.message[0].messages[0].message);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Error signing up");
    }
  };
  return (
    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Fullname</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={val.fullName}
              onChange={(e) => setVal({ ...val, fullName: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={val.email}
              onChange={(e) => setVal({ ...val, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={val.password}
              onChange={(e) => setVal({ ...val, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="flex justify-center items-center mt-6">
          <button className="bg-red-500 text-white px-4 py-2 rounded mr-2">
            Sign in with Google
          </button>
          <button className="bg-blue-700 text-white px-4 py-2 rounded">
            Sign in with Facebook
          </button>
        </div>
        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-500">
            Already have an account? Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
