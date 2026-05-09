import React, { createContext, useMemo, useState, useEffect } from "react";
import {
  Routes,
  useRoutes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Layout from "./pages/Layout";
import axios from "axios";
import Home from "./pages/Home";

import DiaryPost from "./pages/DiaryPost";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import ForgetPassword from "./pages/ForgetPassword";
import OpenRoute from "./components/OpenRoute";

const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [googleEmail, setGoogleEmail] = useState(null);
  const [updateList, setUpdateList] = useState(false);
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && user._id) {
      localStorage.setItem("user", JSON.stringify(user));
      fetchPosts();
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const fetchPosts = async () => {
    if (!user || !user._id) return;
    try {
      const res = await axios.post("https://dy2-1.onrender.com/api/posts/allPost", {
        user_id: user._id,
      });

      console.log('--------', res.data.data)
      setPosts(res.data.data);
      console.log('----======--', posts)
    } catch (err) {
      console.log(err);
    }
  };

  const getDataByEmail = async (email) => {
    // console.log(" =====----", email)
    const res = await axios.post(
      "http://localhost:4000/api/posts/allPostByGoogleId",
      { email }
    );
    // console.log(" ----", res.data.data)
    setPosts(res.data.data);
    navigate("/profile");
  };

  const fetchSessionUser = async () => {
    try {
      const res = await axios.get("https://dy2-1.onrender.com/profile", {
        withCredentials: true,
      });
      // console.log("user get in profile", res.data.email);
      // const email = res.data.email;
      const { username, email, _id } = await res.data;
      setUser({ username, email, _id });
      console.log("userrrrrrrrrr", email, username, _id, user)
      navigate('/profile');
      // if (res.data.email) {
      //   setGoogleEmail(email);
      //   getDataByEmail(email);
      // }
    } catch (err) {
      console.log("No session user found", err);
    }
  };

  useEffect(() => {
    fetchSessionUser();
    // If no user in localStorage, try to fetch from session
    if (!user && !localStorage.getItem("user")) {
      fetchSessionUser();
    }
  }, []);

  const elements = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/api/posts/:id",
          element: user ? <DiaryPost /> : <Navigate to="/login" />,
        },
        {
          path: "/login",
          element: !user ? (
            <OpenRoute>
              {" "}
              <Login />
            </OpenRoute>
          ) : (
            <Navigate to="/" />
          ),
        },
        {
          path: "/signup",
          element: !user ? (
            <OpenRoute>
              {" "}
              <Signup />
            </OpenRoute>
          ) : (
            <Navigate to="/" />
          ),
        },
        {
          path: "/profile",
          element: user ? <Dashboard /> : <Navigate to="/login" />,
        },
        {
          path: "/reset-password",
          element: (
            <OpenRoute>
              {" "}
              <ForgetPassword />
            </OpenRoute>
          ),
        },
        // { path: '/reset-password:id', element:  < /> },
      ],
    },
  ]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateList,
        setUpdateList,
        posts,
        setPosts,
        fetchPosts,
      }}
    >
      {elements}
    </UserContext.Provider>
  );
}

export default App;
export { UserContext };
