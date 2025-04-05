const express = require('express');
const mongoose= require('mongoose');
const { resolve } = require('path');
const app = express();
const port = 3010;

require('dotenv').config();
app.use(express.json());

const connection= require('./connection');
const UserSchema= require('./UserSchema');

app.use(express.static('static'));
const MONGO_URI=process.env.mongo_url;
mongoose.connect(MONGO_URI)
.then(() => { 
  console.log('Connected to MongoDB');
}
)
.catch((error) => { 
  console.error('Error connecting to MongoDB:', error);
}
);
app.post('/register', async (req, res) => {
  console.log(req.body); // Debugging line
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));

