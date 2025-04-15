const { Pool } = require('pg');

const PostgreSQL =  new Pool({
    user: 'postgres',
    host: 'caboose.proxy.rlwy.net',
    database: 'railway',
    password: "EtjDzMBwijKowXWaBvBwpQKskyTFZhTm",
    port: 26678,
})

module.exports = PostgreSQL