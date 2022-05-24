let mysql = require('mysql');
let db = mysql.createConnection({
    host:  process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
});

module.exports = db;