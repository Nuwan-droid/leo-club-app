export default (req, res, next) => {
  const { name, date, time, location, description } = req.body;
  
  // Check if all required fields are present and not empty
  if (!name || !date || !time || !location || !description) {
    return res.status(400).json({
      success: false,
      message: 'All fields (name, date, time, location, description) are required.'
    });
  }
  
  // Validate name
  if (typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Event name must be a non-empty string.'
    });
  }
  
  // Validate location
  if (typeof location !== 'string' || location.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Location must be a non-empty string.'
    });
  }
  
  // Validate description
  if (typeof description !== 'string' || description.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Description must be a non-empty string.'
    });
  }
  
  // Check for cover image on create (when method is POST)
  if (req.method === 'POST' && !req.file) {
    return res.status(400).json({
      success: false,
      message: 'Cover image is required.'
    });
  }
  
  next();
};