const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//Routes
const charactersRoute = require('./routes/characters.route');
const episodesRoute = require('./routes/episodes.routes');
const locationsRoute = require('./routes/locations.route');
const authRoute = require('./routes/auth.route');
const favoritesRoute = require('./routes/favorites.routes');

app.use('/api/characters', charactersRoute);
app.use('/api/episodes', episodesRoute);
app.use('/api/locations', locationsRoute);
app.use('/api/auth', authRoute);
app.use('/api/favorites', favoritesRoute);


//Default Route
app.get('/', (req, res) => {
    res.send('Rick and Morty Explorer Backend');
})

// Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });