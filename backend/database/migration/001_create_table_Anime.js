import dataBase from "../connect.js";

const tableName = "data_anime";

const sqlTable = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        japaneseTitle VARCHAR(255),
        image VARCHAR(500),
        rating DECIMAL(3,1),
        status VARCHAR(50),
        type VARCHAR(50),
        episodes INT,
        duration VARCHAR(50),
        aired VARCHAR(100),
        season VARCHAR(50),
        year INT,
        genres JSON,
        studio VARCHAR(100),
        source VARCHAR(100)
    )
`;

dataBase.query(sqlTable, (err) => {
    if (err) {
        console.error("Gagal membuat tabel:", err);
        return;
    }

    console.log(`${tableName} berhasil dibuat`);
});