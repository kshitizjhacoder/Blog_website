import { useState, useEffect } from 'react';
import './App.css';
import Home from './Components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import CreateBlogForm from './Components/CreateBlogForm';
import Blog from './Components/Blog';
import Login from './Components/Login';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [blogArray,setBlogArray]  = useState([]);

  const handleLogout = () => {
    // Add your logic for user logout here
    // For simplicity, let's just set isLoggedIn to false
    setLoggedIn(false);
    // onLogout(); // Notify parent component about the logout
  };

  const saveBlog = (blogData) => {
    // Add your logic to save the blog data
    console.log('Blog saved:', blogData);
    // You may want to redirect the user to the Home page after saving
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path='/login' element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path='/' element={<Home setBlogArray={setBlogArray} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/create-blog" element={<PrivateRoute component={CreateBlogForm} isAuthenticated={isLoggedIn} />} />
          <Route path='/blogs/:id' element={<Blog blogArray={blogArray} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
