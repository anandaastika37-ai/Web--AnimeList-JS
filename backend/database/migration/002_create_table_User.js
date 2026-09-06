import db from '../connect.js';

const tablename = "users";

const field = {
    id : 'id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY',
    username : 'username VARCHAR(50) NOT NULL UNIQUE',
    password : 'password VARCHAR(255) NOT NULL',
    email : 'email VARCHAR(255) NOT NULL UNIQUE',
    created_at : 'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    update_at : '  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
}

const sqlTable = `CREATE TABLE IF NOT EXISTS ${tablename}(
    ${field.id} , ${field.username} , ${field.password} , ${field.email}  , ${field.created_at} , ${field.update_at}
)`;

db.query(sqlTable , (err) => {
    if(err){
        console.error('gagal membuat tabel:' , err);
        return
    }

    console.log(`${tablename} berhasil dibuat`);
})