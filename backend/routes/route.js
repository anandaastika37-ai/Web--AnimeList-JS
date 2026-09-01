import express from "express";
import { getAnime } from "../controllers/animeController.js";

const router = express.Router();

router.get("/anime", getAnime);

export default router;