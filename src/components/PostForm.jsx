import axios from "axios";
import React, { useEffect, useState,useRef } from "react";
import { useForm } from "react-hook-form";
import toast  from 'react-hot-toast';
import { useContext } from "react";
import { UserContext } from "../App";
import { format } from 'date-fns';

const PostForm = ({fetchPosts}) => {
  const { register, setError, reset, formState: { errors } } = useForm();
  const [val, setVal] = useState({title:'', content:'', date:''})
  const { user, setUser, updateList, setUpdateList } = useContext(UserContext);

    const onPosts = async (e) => {
       if(!user) return ;
       
      e.preventDefault()
      if (!user) {
        toast.error("Please log in to post.");
        return;
      }
      
      try {
        const res = await axios.post("https://dy2-1.onrender.com/api/posts/addPost",{
          ...val,
          user_id: user._id   
        });
        const body = await res.data;
        
        if(body.message == "Post added"){
           setUpdateList(true);
           setVal({ title: '', content: '', date: '' });
           toast.success("Post created ")
           fetchPosts()
        }
      } catch (err) {
        console.log("err", err);
      }
    };
  return (
    <div className="flex ">
     <form className="" onSubmit={onPosts}>
        <div className="">
          <h3 className="font-semibold text-2xl inline-block mb-4">Create a post</h3>
        </div>
        <div>
          <input className="bg-gray-100 border-2 border-black rounded"
            type="text" value={val.title} onChange={(e) => setVal({ ...val, title: e.target.value })}
        
          ></input>
        </div>
        <div >
          <textarea
            rows="10" cols="20" value={val.content} onChange={(e) => setVal({ ...val, content: e.target.value })}
            className="bg-gray-100"
            placeholder="Enter Diary Content"
          />
        </div>

        <div className="mx-auto flex justify-center items-center ">
          {" "}
          <button type="submit" value="submit"  className="rounded bg-sky-300 hover:bg-sky-400 px-6 py-1" >
            {" "}
            Post{" "} 
          </button>{" "}
        </div>
      </form>
    </div>
  );
};

export default PostForm;
