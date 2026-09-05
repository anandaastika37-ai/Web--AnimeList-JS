import { getAllAnime , getDetail, getRecomandAnime } from "../model/DataAnime.js";

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

export const getAnimeDetail = (req , res) => {
  const {id} = req.params
  getDetail(id ,(err , results) => {
    if(err){
      console.error("Gagal mengambil data anime :" , err);

      return res.status(500).json({
        masesage : "gagal mengambil data anime"
      })
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Anime tidak ditemukan",
      });
    }
    res.json(results[0])
  })
}
