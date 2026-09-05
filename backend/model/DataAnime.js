import db from "../database/connect.js";

export const getAllAnime = (callback) => {
  const sql = "SELECT * FROM data_anime";

  db.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

export const getRecomandAnime = (callback) => {
  const sql =  "SELECT * FROM data_anime ORDER BY rating DESC LIMIT 10";

  db.query(sql , (err , results) => {
    if(err){
      return callback(err, null);
    }
    callback(null, results);
  })
}

export const getDetail = (id, callback) => {
  const sql = "SELECT * FROM data_anime WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }

    callback(null, results);
  });
};


