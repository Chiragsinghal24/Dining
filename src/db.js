require('dotenv').config();
const { Pool } = require('pg');

const pool=new Pool({
    user: process.env.USER_NAME,
    host: process.env.HOST_NAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT_NUMBER || 5432,
})

pool.connect((err,client,release)=>{
    if(err){
        console.log(err);
        return console.error("Error in connection")
    }
    client.query('SELECT NOW()',(err,result)=>{
        release()
        if(err){
            return console.error('Error executing query')
        }
        console.log('Connected to database')
    })
})



module.exports = pool;
