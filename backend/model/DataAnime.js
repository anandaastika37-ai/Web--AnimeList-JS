import db from "../database/connect.js";

export const getAllAnime = (callback) => {
  const sql = "SELECT * FROM anime_list";

  db.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }

    callback(null, results);
  });
};