import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        // Handle authentication failure
        console.error('Authentication failed');
        return;
      }

      const data = await response.json();
      // Assuming the server sends a token upon successful authentication
      const { token } = data;

      // Save the token to localStorage or secure storage
      localStorage.setItem('email', email);

      // Update the state to indicate the user is logged in
      setLoggedIn(true);

      // Navigate to the home page
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold text-purple-800 mb-6">Login</h1>
        <form>
          <div className="mb-4">
            <label className="block text-purple-800 text-sm font-semibold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              className="w-full p-2 border border-purple-800 rounded"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-purple-800 text-sm font-semibold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              className="w-full p-2 border border-purple-800 rounded"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="bg-purple-800 text-white py-2 px-4 rounded hover:bg-purple-700 focus:outline-none focus:ring focus:border-purple-300"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
