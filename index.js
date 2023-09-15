// app.js
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000; // You can change this to any port you prefer

const User = require('./models/User');

const Team = require('./models/Team');
const TeamUser = require('./models/TeamUser');
const index = require('./models/index');

const sequelize = require('./config/database');

// Middleware to parse JSON requests
app.use(express.json());
//app.use(bodyParser.json());

// Define routes
const userRoutes = require('./routes/users');
const teamRoutes = require('./routes/teams');
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);

// Define a route for the API endpoint
app.get('/hello', (req, res) => {
  res.send('Hello, World!');
});

// Insert data into the database
app.post('/insert', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json({ message: 'User inserted successfully', user });
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Retrieve data from the database
app.get('/get', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


   
// In your app.js file
 app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
 });
