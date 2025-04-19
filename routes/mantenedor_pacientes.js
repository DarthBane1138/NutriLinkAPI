const express = require("express")
const app = express()
const router = express.Router()
const pool = require('../db/db')

const bodyParser = require('body-parser');

app.use(express.json())
app.use(bodyParser.json());

// POST para agregar Paciente
router.post('/paciente_insertar', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    const {
      rut_paciente,
      dv = null,
      primer_nombre,
      apellido_paterno,
      correo,
      contrasena,
      fecha_nacimiento,
      sexo,
      segundo_nombre = null,
      apellido_materno = null,
      telefono = null,
      notas_varias = null,
      ocupacion = null,
      horario_laboral = null,
      conviviente = null,
      etapa_cambio_psicologico = null,
      antecedentes_morbidos = null,
      antecedentes_familiares = null,
      medicamentos_actuales = null
    } = req.body;
  
    try {
      await pool.query(
        `CALL insertar_paciente($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19);`,
        [
          rut_paciente,
          dv,
          primer_nombre,
          apellido_paterno,
          correo,
          contrasena,
          fecha_nacimiento,
          sexo,
          segundo_nombre,
          apellido_materno,
          telefono,
          notas_varias,
          ocupacion,
          horario_laboral,
          conviviente,
          etapa_cambio_psicologico,
          antecedentes_morbidos,
          antecedentes_familiares,
          medicamentos_actuales
        ]
      );
      res.status(201).json({ mensaje: 'Paciente insertado correctamente' });
    } catch (error) {
      console.error('Error al insertar paciente:', error);
      res.status(500).json({ error: 'Error al insertar paciente' });
    }
  });

  router.post('/auth_paciente', async (req, res) => {
    const { correo, contrasena } = req.body;
  
    try {
      const result = await pool.query(`
        SELECT contrasena FROM paciente WHERE correo = $1
      `, [correo]);
  
      if (result.rows.length === 0) {
        return res.status(401).json({ status: 'error', mensaje: 'Correo no registrado' });
      }
  
      if (result.rows[0].contrasena !== contrasena) {
        return res.status(401).json({ status: 'error', mensaje: 'Contraseña incorrecta' });
      }
  
      res.status(200).json({ status: 'ok', mensaje: 'Autenticación exitosa' });
  
    } catch (error) {
      console.error('Error en autenticación:', error);
      res.status(500).json({ status: 'error', mensaje: 'Error del servidor' });
    }
  });

app.use(router);
module.exports = router