import React, { useState} from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
const Blog = ({ blogArray, isLoggedIn,setLoggedIn}) => {
    const { id } = useParams();
    // console.log(blogArray, id);
    const blog = blogArray.find(blog => blog.id === parseInt(id, 10));
  const handleLogout = () => {
    // Add your logic for user logout here
    // For simplicity, let's just set isLoggedIn to false
    setLoggedIn(false);
    // onLogout(); // Notify parent component about the logout
  };
  return (
    <div className="container mx-auto mt-8  p-8 text-white">
        <div className="fixed top-0 left-0 right-0 z-10 bg-[#e9d5ff] p-4 flex justify-between items-center shadow-md mb-4">
        <h1 className="text-3xl font-bold text-purple-800">Blog View</h1>
        {!isLoggedIn ? (
            <div className="flex space-x-4">
            <span className="bg-transparent border-2 border-solid border-purple-800 text-purple-800 px-4 py-2 rounded-md hover:bg-purple-800 hover:text-white hover:border-transparent transition duration-300">
              <Link to="/create-blog">Create New Blog</Link>
            </span>
            <span className="bg-transparent border-2 border-purple-800 text-purple-800 px-4 py-2 rounded-md hover:bg-purple-800 hover:text-white hover:border-transparent transition duration-300">
              <Link to="/login">Login</Link>
            </span>
            </div>
        ) : (
            <div className="flex space-x-4">
            <span className="bg-transparent border-2 border-purple-800 text-purple-800 px-4 py-2 rounded-md hover:bg-purple-800 hover:text-white hover:border-transparent transition duration-300">
              <Link to="/create-blog">Create New Blog</Link>
            </span>
            <button
                onClick={handleLogout}
                className="bg-transparent border-2 border-purple-800 text-purple-800 px-4 py-2 rounded-md hover:bg-purple-800 hover:text-white hover:border-transparent focus:outline-none focus:ring focus:border-purple-300 transition duration-300"
            >
                Sign Out
            </button>
            </div>
        )}
          </div>
          <div className="container mx-auto mt-8 p-8 text-white">
        <h2 className="text-3xl font-bold mb-2 text-[#e9d5ff]">{blog.title}</h2>
        <p className="text-[#e9d5ff]  mb-4">{blog.description}</p>
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl text-[#e9d5ff]">Created by: {blog.email}</p>
          <p className="text-[#e9d5ff]">Time: {blog.date}</p>
        </div>
        {/* Additional content of your Blog component */}
      </div>
    </div>
  )
}

export default Blog