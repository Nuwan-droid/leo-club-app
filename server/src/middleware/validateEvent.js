export default (req, res, next) => {
  const { name, date, time, location } = req.body;
  
  // Check if all required fields are present and not empty
  if (!name || !date || !time || !location) {
    return res.status(400).json({
      success: false,
      message: 'All fields (name, date, time, location) are required.'
    });
  }
  
  // Additional validation can be added here
  if (typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Event name must be a non-empty string.'
    });
  }
  
  if (typeof location !== 'string' || location.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Location must be a non-empty string.'
    });
  }
  
  next();
};