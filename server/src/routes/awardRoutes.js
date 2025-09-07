import express from "express";
import { getAwards, createAward, updateAward, deleteAward } from "../controllers/awardController.js";

const router = express.Router();

router.get("/", getAwards);
router.post("/", createAward);
router.put("/:id", updateAward);
router.delete("/:id", deleteAward);

export default router;
