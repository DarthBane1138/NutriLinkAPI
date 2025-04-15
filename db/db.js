const { Pool } = require('pg');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = require('../config.js')

const PostgreSQL =  new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
})

/*const PostgreSQL =  new Pool({
    user: 'postgres',
    host: 'caboose.proxy.rlwy.net',
    database: 'railway',
    password: "EtjDzMBwijKowXWaBvBwpQKskyTFZhTm",
    port: 26678,
})*/

module.exports = PostgreSQL