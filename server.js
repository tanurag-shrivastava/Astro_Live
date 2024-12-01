const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/cosmoxplore', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Schema & Model
const userSchema = new mongoose.Schema({ name: String, email: String, password: String });
const User = mongoose.model('User', userSchema);

// Routes
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
});

// Define a schema for Mars Rover data
const MarsPhotoSchema = new mongoose.Schema({
    img_src: String,
    earth_date: String,
    roverName: String,
    camera: String,
    launch: String,
    land: String,
    status: String,
  }, { timestamps: true });
  
  const MarsPhoto = mongoose.model('MarsPhoto', MarsPhotoSchema);
  
  // Endpoint to save data
  app.post('/save-mars-photo', async (req, res) => {
    try {
      const photoData = req.body;
      const photo = new MarsPhoto(photoData);
      await photo.save();
      res.status(201).send({ message: 'Data saved successfully!' });
    } catch (error) {
      res.status(500).send({ error: 'Failed to save data' });
    }
  });

  
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
