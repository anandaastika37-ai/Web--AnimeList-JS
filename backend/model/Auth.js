import db from "../database/connect.js";

// Cari user berdasarkan email
export const findUserByEmail = (email, callback) => {
    const sql = `
        SELECT *
        FROM users
        WHERE email = ?
        LIMIT 1
    `;

    db.query(sql, [email], callback);
};

// Cari user berdasarkan username atau email
export const findUserByUsernameOrEmail = (
    username,
    email,
    callback
) => {
    const sql = `
        SELECT id
        FROM users
        WHERE username = ? OR email = ?
        LIMIT 1
    `;

    db.query(sql, [username, email], callback);
};

// Membuat user baru
export const createUser = (
    username,
    email,
    password,
    callback
) => {
    const sql = `
        INSERT INTO users
        (username, email, password)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [username, email, password],
        callback
    );
};