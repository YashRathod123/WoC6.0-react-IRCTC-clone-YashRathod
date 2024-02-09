const Pool = require("pg").Pool;

require('dotenv').config();

const pool = new Pool({
    user:'postgres',
    password:'123456789',
    database:'IRCTC',
    host:'localhost',
    port:5432
});

module.exports=pool;
