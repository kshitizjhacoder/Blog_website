// src/components/Home.js
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
const BlogCard = ({ blog }) => {
  return (
    <Link to={`/blogs/${blog.id}`} className="hover:no-underline">
        <div className="bg-[#e9d5ff] rounded-md p-4 shadow-md mb-4 w-[100%] max-content transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-bold mb-2 text-purple-800">{blog.title}</h2>
        <p className="text-purple-600">{blog.description}</p>
        </div>
      </Link>
  );
};



const Home = ({ setBlogArray,isLoggedIn, setLoggedIn }) => {
  const [blogs, setBlog] = useState([]);
  useEffect(() => {
    // Fetch data from your API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/get-blog');
        const data = await response.json();
        // Update the blogArray state with fetched data
        console.log(data);
        setBlog(data);
        // Pass the updated data to the parent component (App.jsx)
        setBlogArray(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);
  const handleLogout = () => {
    // Add your logic for user logout here
    // For simplicity, let's just set isLoggedIn to false
    setLoggedIn(false);
    // onLogout(); // Notify parent component about the logout
  };

  return (
    <div className="container mx-auto mt-8  p-8 text-white">
        <div className="fixed top-0 left-0 right-0 z-10 bg-[#e9d5ff] p-4 flex justify-between items-center shadow-md mb-4">
        <h1 className="text-3xl font-bold text-purple-800">Home</h1>
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


          <div className='mt-8 '>
  {blogs.length === 0 ? (
    <p>No blogs available.</p>
  ) : (
    blogs.map((blog) => (
      <div >
        <BlogCard key={blog.id} blog={blog} />
      </div>
    ))
  )}
</div>

    </div>
  );
};

export default Home;
