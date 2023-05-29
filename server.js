const env = require('dotenv').config({path: './config/.env'});

const port = 3000;
const express = require("express");
const mongoose = require("mongoose");
const User = require('./models/user');

const app = express()


// Body parser middleware
app.use(express.json());

// Define your routes here
app.get('/', (req, res) => {
    res.send('Check Point RestAPI!');
  });

// GET: Return all users
app.get('/users', async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// POST: Add a new user to the database
app.post('/users', async (req, res) => {
    const user = new User({
      name: req.body.name,
      age: req.body.age,
      favoriteFoods:req.body.favoriteFoods
      // Add other properties as per your User schema
    });
  
    try {
      // Save the new user to the database
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


  // PUT: Edit a user by ID
app.put('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the user properties
      user.name = req.body.name;
      user.age = req.body.email;
      user.favoriteFoods = req.body.favoriteFoods;
  
      // Save the updated user to the database
      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// DELETE: Remove a user by ID
app.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'User deleted' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });




mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Database connection successful')
})
.catch(err => {
  console.error('Database connection error')
})


app.listen(port, function() {
    console.log('The server is running, ' +
        ' please, open your browser at http://localhost:%s', 
    port);
});