// backend/controllers/learningHubController.js
import asyncHandler from 'express-async-handler';
import path from 'path';
import Lesson from '../models/LearningHub.js';

const getLessons = asyncHandler(async (req, res) => {
  const lessons = await Lesson.find({}).sort({ createdAt: -1 });
  res.json(lessons);
});

const createLesson = asyncHandler(async (req, res) => {
  const { title, description, type } = req.body;

  if (!title || !description || !req.files?.['source_file']) {
    res.status(400);
    throw new Error('Title, description, and source file are required');
  }

  const imagePath = req.files['image'] ? `/uploads/${req.files['image'][0].filename}` : null;
  const sourceFilePath = `/uploads/${req.files['source_file'][0].filename}`;
  const resolvedType = type || path.extname(sourceFilePath).slice(1).toLowerCase();

  const lesson = new Lesson({
    title,
    description,
    type: resolvedType,
    image: imagePath,
    sourceFile: sourceFilePath,
  });

  const createdLesson = await lesson.save();
  res.status(201).json(createdLesson);
});

export { getLessons, createLesson };