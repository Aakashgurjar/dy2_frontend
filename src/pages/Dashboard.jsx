import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../App';
import PostHead from '../components/PostHead';
import PostForm from '../components/PostForm';
import { useEffect } from 'react';

const Dashboard = () => {
 
    const { user,setUser, updateList, setUpdateList, setPosts, posts, fetchPosts} = useContext(UserContext);

    // console.log("dashboard")
    useEffect(() => {
        fetchPosts();
      }, [user, updateList]);

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

export default Dashboard