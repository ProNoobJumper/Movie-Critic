const Movie = require('../models/Movie');

const addMovie = async (req, res, next) => {
  try {
    const { title, category, releaseyear, rating, isFeatures } = req.body;
    
    const newMovie = new Movie({
      title,
      category,
      releaseyear,
      rating,
      isFeatures: isFeatures || false
    });

    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    next(error);
  }
};


const getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};


const getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: "Movie not found." });
    }
    
    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
};


const updateMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!movie) {
      return res.status(404).json({ message: "Movie not found." });
    }
    
    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: "Movie not found." });
    }
    
    res.status(200).json({ message: "Movie deleted successfully." });
  } catch (error) {
    next(error);
  }
};

const getTopRatedMovies = async (req, res, next) => {
  try {
    const topMovies = await Movie.find({ rating: { $gte: 8.5 } });
    res.status(200).json(topMovies);
  } catch (error) {
    next(error);
  }
};


const getMoviesByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const movies = await Movie.find({ 
      category: { $regex: category, $options: 'i' } 
    });
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  getTopRatedMovies,
  getMoviesByCategory
};