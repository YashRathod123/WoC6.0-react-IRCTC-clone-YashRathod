const Pool = require("pg").Pool;

require('dotenv').config();

const pool = new Pool({
    // user:'postgres',
    // password:'123456789',
    // database:'IRCTC',
    // host:'localhost',
    // port:5432

     connectionString:process.env.UserDatabase_URL,
    ssl:true
});

pool.connect().then(()=>console.log('Connected'))
.catch((err)=>(console.log('Error connecting from neels room',err)))


module.exports=pool;
