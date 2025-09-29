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
        title: event.name,
        location: event.location,
        type: "Service projects",
        image: event.coverImage || '/default-event.png',
        description: event.description
      };
    });
    res.status(200).json(formattedEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: error.message });
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
      title: newEvent.name,
      location: newEvent.location,
      type: "Service projects",
      image: newEvent.coverImage,
      description: newEvent.description
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const requestToJoinEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json({ message: 'Join request sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllEvents, createEvent, requestToJoinEvent };