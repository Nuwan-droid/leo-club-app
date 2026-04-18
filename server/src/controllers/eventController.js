import Event from '../models/Event.js';
import path from 'path';
import fs from 'fs';

/* --- Create --- */
export const addEvent = async (req, res) => {
  try {
    const eventData = { ...req.body };
    
    // Add cover image path if uploaded
    if (req.file) {
      eventData.coverImage = req.file.filename;
    }
    
    const newEvent = await Event.create(eventData);
    res.status(201).json({ success: true, event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/* --- Read all --- */
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1, time: 1 });
    res.json({ success: true, events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/* --- Update --- */
export const updateEvent = async (req, res) => {
  try {
    const eventData = { ...req.body };
    
    // If new cover image is uploaded
    if (req.file) {
      // Delete old cover image
      const oldEvent = await Event.findById(req.params.id);
      if (oldEvent && oldEvent.coverImage) {
        const oldImagePath = path.join('./upload/events', oldEvent.coverImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      eventData.coverImage = req.file.filename;
    }
    
    const updated = await Event.findByIdAndUpdate(req.params.id, eventData, {
      new: true,
      runValidators: true
    });
    
    if (!updated)
      return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, event: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/* --- Delete --- */
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event)
      return res.status(404).json({ success: false, message: 'Event not found' });
    
    // Delete cover image if exists
    if (event.coverImage) {
      const imagePath = path.join('./upload/events', event.coverImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await Event.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Event deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};