// routes/eventRoutes.js
import express from 'express';
import { getAllEvents, createEvent, requestToJoinEvent } from '../controllers/eventVolunteercontroller.js';

const router = express.Router();

// GET /api/events - Fetch upcoming events
router.get('/', getAllEvents);

// POST /api/events - Create new event (from RequestEventPopup)
router.post('/', createEvent);

// POST /api/events/:id/join - Request to join event (from EventDetailsPopup)
router.post('/:id/join', requestToJoinEvent);

export default router;