const  {Pool} = require("pg");
const env  =  require("dotenv");

const pool = new Pool({
    user: process.env.USER_PG,
    host: process.env.HOST_PG,
    database: process.env.DB_PG,
    password: process.env.PWS_PG,
    port: process.env.PORT_PG,
  })

  module.exports = pool;
