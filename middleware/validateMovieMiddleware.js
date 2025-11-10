const validateMovieMiddleware = (req, res, next) => {
  const { title, category, releaseyear, rating } = req.body;
  const genericMessage = "Validation failed: Invalid rating or year.";

  // Check if required fields are provided
  if (!title || !category || !releaseyear || rating === undefined) {
    return res.status(400).json({
      message: genericMessage
    });
  }

  // Check if rating is between 0 and 5
  if (rating < 0 || rating > 5) {
    return res.status(400).json({
      message: genericMessage
    });
  }

  // Check if release year is valid (not before 1900)
  if (releaseyear < 1900) {
    return res.status(400).json({
      message: genericMessage
    });
  }

  // Check data types
  if (typeof title !== 'string' || typeof category !== 'string') {
    return res.status(400).json({
      message: genericMessage
    });
  }

  if (typeof releaseyear !== 'number' || typeof rating !== 'number') {
    return res.status(400).json({
      message: genericMessage
    });
  }

  next();
};

module.exports = validateMovieMiddleware;