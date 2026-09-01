import mysql from "mysql2";

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'anime_list',
})

db.connect((err) => {
    if(err){
        console.error('Databese gagal terhubung' , err);
        return
    }

    console.log("MySql berhasil terhubung");
})

export  default  db;