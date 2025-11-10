const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const movieController = require('./controllers/movieController');
const validateMovieMiddleware = require('./middleware/validateMovieMiddleware');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cinecritic', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); 
  }
};

app.use(express.json());

const movieRouter = express.Router();

movieRouter.post('/', validateMovieMiddleware, movieController.addMovie);
movieRouter.get('/', movieController.getAllMovies);
movieRouter.get('/:id', movieController.getMovieById);
movieRouter.put('/:id', validateMovieMiddleware, movieController.updateMovie);
movieRouter.delete('/:id', movieController.deleteMovie);
movieRouter.get('/top-rated', movieController.getTopRatedMovies);
movieRouter.get('/category/:category', movieController.getMoviesByCategory);

app.use('/api/movies', movieRouter);


app.use((req, res, next) => {
  res.status(404).json({ message: "API endpoint not found." });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();