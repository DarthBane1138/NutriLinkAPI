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

// Endpoint obtención alimentos
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

router.get('/alimentos_macro', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  try {
    const result = await pool.query(`SELECT * FROM obtener_alimento()`);
    
    // Filtrar solo hasta lipidos_gr
    const macroAlimentos = result.rows.map(alimento => ({
      id_alimento: alimento.id_alimento,
      nombre_alimento: alimento.nombre_alimento,
      medida: alimento.medida,
      masa: alimento.masa,
      numero_medida: alimento.numero_medida,
      kcal: alimento.kcal,
      proteinas_gr: alimento.proteinas_gr,
      carbohidratos_gr: alimento.carbohidratos_gr,
      lipidos_gr: alimento.lipidos_gr
    }));

    res.json(macroAlimentos);
  } catch (err) {
    console.error('Error al consultar alimentos:', err);
    res.status(500).json({ error: 'Error al consultar alimentos' });
  }
});


app.use(router);
module.exports = router