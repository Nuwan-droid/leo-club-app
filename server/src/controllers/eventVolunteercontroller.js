// controllers/eventController.js
import Event from '../models/Event.js';

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    const formattedEvents = events.map(event => {
      const eventDate = new Date(event.date);
      const day = eventDate.toLocaleDateString('en-US', { weekday: 'long' });
      const monthDay = eventDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
      
      return {
        id: event._id.toString(),
        date: monthDay,
        day,
        time: event.time,
        title: event.name, // Use 'title' to match frontend
        location: event.location,
        type: "Service projects",
        image: event.coverImage || '/default-event.png', // Use 'image' to match frontend
        description: event.description || ''
      };
    });
    console.log('Sending events:', formattedEvents); // Debug log
    res.status(200).json({ events: formattedEvents, success: true }); // Wrap in { events, success }
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: error.message, success: false });
  }
};

const createEvent = async (req, res) => {
  try {
    const { eventName, startDate, startTime, location, description, coverImage = '/default-event.png' } = req.body;

    const newEvent = new Event({
      name: eventName,
      date: startDate,
      time: startTime,
      location,
      description,
      coverImage
    });

    await newEvent.save();
    const eventDate = new Date(newEvent.date);
    const day = eventDate.toLocaleDateString('en-US', { weekday: 'long' });
    const monthDay = eventDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    
    res.status(201).json({
      id: newEvent._id.toString(),
      date: monthDay,
      day,
      time: newEvent.time,
      title: newEvent.name, // Use 'title' to match frontend
      location: newEvent.location,
      type: "Service projects",
      image: newEvent.coverImage, // Use 'image' to match frontend
      description: newEvent.description || ''
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(400).json({ error: error.message, success: false });
  }
};

const requestToJoinEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found', success: false });
    }
    res.status(200).json({ message: 'Join request sent successfully', success: true });
  } catch (error) {
    console.error('Error joining event:', error);
    res.status(500).json({ error: error.message, success: false });
  }
};

export { getAllEvents, createEvent, requestToJoinEvent };