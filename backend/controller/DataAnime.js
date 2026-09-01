import { getAllAnime } from "../model/animeModel.js";

export const getAnime = (req, res) => {
  getAllAnime((err, results) => {
    if (err) {
      console.error("Gagal mengambil anime:", err);

      return res.status(500).json({
        message: "Gagal mengambil data anime",
      });
    }

    res.json(results);
  });
};