import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Event name is required'],
    trim: true,
    maxlength: [100, 'Event name cannot exceed 100 characters']
  },
  date: { 
    type: String, 
    required: [true, 'Event date is required']
  },
  time: { 
    type: String, 
    required: [true, 'Event time is required']
  },
  location: { 
    type: String, 
    required: [true, 'Event location is required'],
    trim: true,
    maxlength: [200, 'Location cannot exceed 200 characters']
  }
}, { 
  timestamps: true 
});

// Add index for better query performance
eventSchema.index({ date: 1, time: 1 });

const Event = mongoose.model('Event', eventSchema);

export default Event;