const express = require("express")
const app = express()
const router = express.Router()
const pool = require('../db/db')

const bodyParser = require('body-parser');

app.use(express.json())
app.use(bodyParser.json());

// POST para agregar Nutricionista
router.post('/nutricionista_insertar', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    const {
      rut_nutricionista,
      dv,
      primer_nombre,
      apellido_paterno,
      correo,
      contrasena,
      segundo_nombre = null,
      apellido_materno = null,
      fecha_nacimiento = null,
      foto = null,
      telefono = null
    } = req.body;
  
    try {
      await pool.query(
        `CALL insertar_nutricionista($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`,
        [
          rut_nutricionista,
          dv,
          primer_nombre,
          apellido_paterno,
          correo,
          contrasena,
          segundo_nombre,
          apellido_materno,
          fecha_nacimiento,
          foto,
          telefono
        ]
      );
      res.status(201).json({ mensaje: 'Nutricionista insertado correctamente' });
    } catch (error) {
      console.error('Error al insertar nutricionista:', error);
      res.status(500).json({ error: 'Error al insertar nutricionista' });
    }
  });

app.use(router);
module.exports = router