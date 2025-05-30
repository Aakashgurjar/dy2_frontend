import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

const DiaryPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

//   console.log("id", id);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`http://localhost:4000/api/posts/${id}`);
      const data = await res.data;
    //   console.log("data", data.post);
      setPost(data.post);
    };
    fetchPosts();
  }, [id]);

  if (!post) return null;
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
  <div className="text-gray-500 text-sm mb-2">
    {format(new Date(post.date), 'MMMM d, y')}
  </div>
  <p className="text-base text-gray-800 leading-relaxed">
    {post.content}
  </p>
</div>
  );
};

export default DiaryPost;
