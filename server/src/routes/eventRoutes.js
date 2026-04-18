import express from 'express';
const router = express.Router();

import {
  addEvent,
  getAllEvents,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js';

import validateEvent from '../middleware/validateEvent.js';
import { eventUpload } from '../middleware/upload.js';

// Routes designed to work with server.js mounting at "/api"
router.post('/addevent', eventUpload, validateEvent, addEvent);     // POST /api/addevent
router.get('/events', getAllEvents);                                // GET /api/events
router.put('/events/:id', eventUpload, validateEvent, updateEvent); // PUT /api/events/:id
router.delete('/events/:id', deleteEvent);                          // DELETE /api/events/:id

export default router;