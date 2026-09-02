import { getAllAnime , getRecomandAnime } from "../model/DataAnime.js";

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


export const getRecomand = (req , res) => {
  getRecomandAnime((err , results) => {
    if(err){
      console.error("Gagal mengambil data anime :" , err);

      return res.status(500).json({
        masesage : "gagal mengambil data anime"
      })
    }

    res.json(results)
  })
}

