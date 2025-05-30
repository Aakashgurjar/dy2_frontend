import React, { useEffect, useState } from 'react'
// import styles from '../components/PostHead.css'
import PostHead from '../components/PostHead'
import axios from 'axios'
import PostForm from '../components/PostForm'
import { useLocation } from 'react-router-dom';
import { UserContext } from '../App';
import { useContext } from 'react';
import { format } from 'date-fns';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const { user,setUser, updateList, setUpdateList } = useContext(UserContext);
    // console.log("login user ----------->", user);

        const fetchPosts = async() => {
           if(!user) return ;
            const res = await axios.post(`http://localhost:4000/api/posts/allPost`, { user_id: user._id});
            setPosts(res.data.data);
        }

    useEffect(() => {
       fetchPosts();
    },[user, updateList ])
      
  return (  
  <div className="w-full max-w-7xl mx-auto p-4">
  <div className="flex flex-col md:flex-row gap-6">
    {/* Left: Posts List */}
    <div className="w-full md:w-2/3">
      <span className="font-semibold text-2xl inline-block mb-4">Posts</span>
      <ul className="space-y-4">
        {posts && posts.map((post) => (
          <PostHead key={post._id} post={post} fetchPosts={fetchPosts} />
        ))}
      </ul>
    </div>

    {/* Right: Post Form */}
    <div className="w-full md:w-1/3">
      <PostForm fetchPosts={fetchPosts} />
    </div>
  </div>
</div>

  )
}

export default Home