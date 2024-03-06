const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Load user data from JSON file
const usersData = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
const blogsData = JSON.parse(fs.readFileSync('blogs.json', 'utf-8'));
// Middleware to parse JSON in the request body
app.use(bodyParser.json());
app.use(cors());

// Endpoint for user authentication
app.post('/api/login', (req, res) => {
    console.log(req.body);
  const { email, password } = req.body;

  // Check if the provided email and password match any user in the JSON file
  const user = usersData.users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Create a JWT token
  const token = jwt.sign({ userId: user.id, email: user.email }, 'your_secret_key', {
    expiresIn: '1h', // Adjust the expiration time as needed
  });

  res.json({ token });
});

app.get('/api/get-blog', (req, res) => {
  // Return all blogs from the JSON file
  res.json(blogsData.blogs);
});
app.post('/api/post-blog', (req, res) => {
  const { email, title, description, date } = req.body;

  // Check if the user is authenticated
  const user = usersData.users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Create a new blog post
  const newBlog = {
    id: blogsData.blogs.length + 1,
      userId: user.id,
    email,
    title,
    description,
    date,
  };

  blogsData.blogs.push(newBlog);

  // Save the updated blogs data to the JSON file
  fs.writeFileSync('blogs.json', JSON.stringify(blogsData, null, 2), 'utf-8');

  res.json({ message: 'Blog posted successfully' });
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
