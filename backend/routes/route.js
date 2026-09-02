import express from "express";
import { getAnime , getRecomand } from "../controller/DataAnime.js";

const router = express.Router();

router.get("/anime", getAnime);
router.get("/recomand" , getRecomand);
export default router;