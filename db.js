const mysql=require("mysql2/promise")

const db=mysql.createPool({
    // host:"localhost",
    // user:"root",
    // password:"Davsem@2005",
    // database:"product_scraper"

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
db.getConnection()
    .then(connection=>{
        console.log("Connected to MySQL database");
        connection.release();
    })
    .catch(err=>{
        console.log("Database connection failed:", err.message);
    });
module.exports=db;
