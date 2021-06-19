const mysql = require('mysql');
require('dotenv').config();
const config = require('./settings/config.json')

module.exports = () => {
    return mysql.createConnection(process.env.URI_DB || {
        host: config.hostDB,
        user: config.userDB,
        password: process.env.PASS_DB,
        database: config.nameDB
    })
}