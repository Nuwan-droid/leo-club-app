
import Award from "../models/Award.js";

// GET all awards
export const getAwards = async (req, res) => {
  try {
    const awards = await Award.find().sort({ year: -1 });
    res.json(awards);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST new award
export const createAward = async (req, res) => {
  const { title, winner, year } = req.body;
  try {
    const newAward = new Award({ title, winner, year });
    const savedAward = await newAward.save();
    res.status(201).json(savedAward);
  } catch (error) {
    res.status(500).json({ message: "Failed to create award" });
  }
};

// PUT update award
export const updateAward = async (req, res) => {
  const { id } = req.params;
  const { title, winner, year } = req.body;
  try {
    const updatedAward = await Award.findByIdAndUpdate(
      id,
      { title, winner, year },
      { new: true }
    );
    res.json(updatedAward);
  } catch (error) {
    res.status(500).json({ message: "Failed to update award" });
  }
};

// DELETE award
export const deleteAward = async (req, res) => {
  const { id } = req.params;
  try {
    await Award.findByIdAndDelete(id);
    res.json({ message: "Award deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete award" });
  }
};
