import React from "react";
import styles from "./PostHead.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';
import { Navigate } from "react-router-dom";
const PostHead = ({ post, fetchPosts }) => {

  const handleClick = async () => {

    const res = await axios.delete(`https://dy2-1.onrender.com/api/posts/${post._id}`);
    const body = await res.data;
    if(body.message == "Data Deleted"){
       toast.success("Data Deleted")
       fetchPosts();
    }
  };

  return (
    <div className="mt-3 w-full">
    <li className="bg-gray-100 rounded-lg p-4 mb-4 shadow hover:bg-gray-200 transition">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 break-words">
          <NavLink to={`/api/posts/${post._id}`}>
            {post.title}
          </NavLink>
        </h2>
        <span
          className="material-symbols-outlined text-red-500 cursor-pointer hover:text-red-700"
          onClick={handleClick}    >
          delete
        </span>
      </div>
      <div className="text-sm text-gray-500 mt-1">{ format(new Date(post.date), 'MMMM d, y') }</div>
  
      <p className="mt-2 text-gray-700">
        {post.content.substring(0, 200) + " ..."}
      </p>
    </li>

    {/* <Home  /> */}
  </div>
  
  );
};

export default PostHead;
