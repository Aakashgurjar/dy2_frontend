import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from "react";
import { FaGithub } from "react-icons/fa6";

const Login = () => {
  const [errMsg, setErrMsg] = useState("");
  const [val, setVal] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const {
    user,
    setUser,
    updateList,
    setUpdateList,
    setPosts,
    posts,
    fetchPosts,
  } = useContext(UserContext);

  const handleClick = async () => {
    try {
      const res = await axios.post("https://dy2-1.onrender.com/api/login", val);
      const body = await res.data;
      console.log("body", body);

      if (body.message == "Logged In successfully") {
        setUser(body.user);
        localStorage.setItem("user", JSON.stringify(body.user));
        console.log("user in login", user);
        toast.success("Logged In successfully");
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      } else if (
        body.message == "User is not registered, please signup first"
      ) {
        // toast.error("User is not registered, please signup first");
        console.log("User is not registered, please signup first");
        setErrMsg("User is not registered, please signup first");
      }
    } catch (err) {
      console.error("Error signing up login:", err);
      toast.error("User is not registered, please signup first");
    }
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm ">
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          value={val.email}
          onChange={(e) => setVal({ ...val, email: e.target.value })}
          placeholder="Email Address"
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          value={val.password}
          onChange={(e) => setVal({ ...val, password: e.target.value })}
          placeholder="Password"
        />
        {errMsg}
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
            <input className="mr-1" type="checkbox" />
            <span>Remember Me</span>
          </label>
          <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4">
            Reset Password?
          </a>
        </div>
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
            onClick={handleClick}
          >
            Login
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don&apos;t have an account?{" "}
          <a
            className="text-red-600 hover:underline hover:underline-offset-4"
            href="/signup"
          >
            Register
          </a>
        </div>
      </div>
    </section>
  );
};

export default Login;
