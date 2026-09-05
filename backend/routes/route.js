import express from "express";
import { getAnime , getAnimeDetail, getRecomand } from "../controller/DataAnime.js";

const router = express.Router();

router.get("/anime", getAnime);
router.get("/recomand" , getRecomand);
router.get("/:id" , getAnimeDetail);

export default router;