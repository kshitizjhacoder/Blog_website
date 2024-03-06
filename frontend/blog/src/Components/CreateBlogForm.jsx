// components/CreateBlogForm.js
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
const CreateBlogForm = () => {
  const [title, setTitle] = useState('');
  const [description, setBody] = useState('');
  const navigate = useNavigate();
  const handleSave = async () => {
    // Validate minimum length requirements
    if (title.length < 5 || description.length < 10) {
      alert('Title must be at least 5 characters and body must be at least 10 characters.');
      return;
    }

    // Make API call to save the blog
    const currentDate = new Date().toLocaleString();
    const email = localStorage.getItem('email');
    try {
      const response = await fetch('http://localhost:3000/api/post-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          title,
          description,
          date: currentDate,
        }),
      });

      if (!response.ok) {
        // Handle blog post failure
        console.error('Blog post failed');
        return;
      }

      const data = await response.json();
      console.log(data.message); // Log the success message

      // Redirect to the Home page after successful save
      navigate('/');
    } catch (error) {
      console.error('Error during blog post:', error);
    }
  };


  return (
    <div className="flex justify-center items-center h-screen">
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <h1 className="text-4xl font-bold text-purple-800 mb-6">Create a Blog</h1>
    <form className="flex flex-col">
      <label className="text-purple-800 mb-2">Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="py-2 px-4 mb-4 border border-purple-400 rounded-md"
      />
      <label className="text-purple-800 mb-2">Body:</label>
      <textarea
        value={description}
        onChange={(e) => setBody(e.target.value)}
        className="py-2 px-4 mb-4 border border-purple-400 rounded-md"
      />
      <button
        type="button"
        onClick={handleSave}
        className="bg-purple-800 text-white py-2 px-4 rounded-md hover:bg-purple-700"
      >
        Save
      </button>
    </form>
  </div>
</div>

  );
};

export default CreateBlogForm;
