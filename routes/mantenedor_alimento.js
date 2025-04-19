const express = require("express")
const app = express()
const router = express.Router()
const pool = require('../db/db')

const bodyParser = require('body-parser');

app.use(express.json())
app.use(bodyParser.json());

// Endpoint obtención 
router.get('/grupos_alimenticios', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    try {
        const result = await pool.query(`
          SELECT * FROM obtener_grupo_alimenticio()`);
          res.json(result.rows);
      } catch (err) {
        console.error('Error al consultar grupos alimenticios:', err);
        res.status(500).json({ error: 'Error al consultar grupos alimenticios' });
      }
});

// Endpoint obtención 
router.get('/alimentos', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    try {
        const result = await pool.query(`
          SELECT * FROM obtener_alimento()`);
          res.json(result.rows);
      } catch (err) {
        console.error('Error al consultar alimentos:', err);
        res.status(500).json({ error: 'Error al consultar alimentos' });
      }
});


app.use(router);
module.exports = router