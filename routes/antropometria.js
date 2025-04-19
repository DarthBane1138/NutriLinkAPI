const express = require("express")
const app = express()
const router = express.Router()
const pool = require('../db/db')

const bodyParser = require('body-parser');

app.use(express.json())
app.use(bodyParser.json());

// Endpoint para calcular el Índice de Masa Corporal (IMC)
router.post('/calcular_imc', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  try {
    // 1. Obtener los parámetros necesarios del cuerpo de la solicitud
    const { pacienteId, fecha } = req.body; // Espera { "pacienteId": 123, "fecha": "YYYY-MM-DD" }

    // 2. Validación básica de entrada
    if (pacienteId === undefined || fecha === undefined) {
        return res.status(400).json({ 
            status: 'error', 
            mensaje: 'Faltan parámetros requeridos: "pacienteId" y "fecha".' 
        });
    }

    // 3. Construir la consulta SQL para llamar a la función
    const sql = 'SELECT public.calcular_imc($1, $2) AS imc_calculado';
    const params = [pacienteId, fecha];

    // 4. Ejecutar la consulta usando async/await
    const result = await pool.query(sql, params);

    // 5. Procesar el resultado
    if (result.rows && result.rows.length > 0) {
        const imc = result.rows[0].imc_calculado; 

        if (imc !== null) {
            res.json({
                status: 'success',
                mensaje: 'IMC calculado correctamente.',
                pacienteId: pacienteId,
                fecha: fecha,
                imc: imc 
            });
        } else {
            res.status(404).json({ 
                status: 'not_found',
                mensaje: 'No se encontraron datos de antropometría para el paciente y fecha especificados, o los datos existentes no permiten calcular el IMC.'
            });
        }
    } else {
        // Caso inesperado: la consulta no devolvió filas (podría indicar un problema con la función en sí)
        console.error('La consulta a calcular_imc no devolvió filas. Resultado:', result);
        res.status(500).json({ 
            status: 'error', 
            mensaje: 'Error inesperado al procesar la respuesta de la base de datos.' 
        });
    }

} catch (error) {
    // 6. Manejo de errores (conexión a BD, errores SQL, etc.)
    console.error("Error en POST /calcular_imc:", error); 
    // Puedes verificar códigos de error específicos si es necesario
    // ej. if (error.code === '22007') { // invalid_datetime_format }
    res.status(500).json({ 
        status: 'error', 
        mensaje: 'Error interno del servidor al intentar calcular el IMC.',
    });
}
});

// Endpoint para calcular el Índice Cintura Talla (ICT)
router.post('/calcular_ict', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    try {
      // 1. Obtener los parámetros necesarios del cuerpo de la solicitud
      const { pacienteId, fecha } = req.body; // Espera { "pacienteId": 123, "fecha": "YYYY-MM-DD" }
  
      // 2. Validación básica de entrada
      if (pacienteId === undefined || fecha === undefined) {
          return res.status(400).json({ 
              status: 'error', 
              mensaje: 'Faltan parámetros requeridos: "pacienteId" y "fecha".' 
          });
      }
  
      // 3. Construir la consulta SQL para llamar a la función
      const sql = 'SELECT public.calcular_ict($1, $2) AS ict_calculado';
      const params = [pacienteId, fecha];
  
      // 4. Ejecutar la consulta usando async/await
      const result = await pool.query(sql, params);
  
      // 5. Procesar el resultado
      if (result.rows && result.rows.length > 0) {
          const ict = result.rows[0].ict_calculado; 
  
          if (ict !== null) {
              res.json({
                  status: 'success',
                  mensaje: 'ICT calculado correctamente.',
                  pacienteId: pacienteId,
                  fecha: fecha,
                  ict: ict 
              });
          } else {
              res.status(404).json({ 
                  status: 'not_found',
                  mensaje: 'No se encontraron datos de antropometría para el paciente y fecha especificados, o los datos existentes no permiten calcular el ICT.'
              });
          }
      } else {
          // Caso inesperado: la consulta no devolvió filas (podría indicar un problema con la función en sí)
          console.error('La consulta a calcular_ict no devolvió filas. Resultado:', result);
          res.status(500).json({ 
              status: 'error', 
              mensaje: 'Error inesperado al procesar la respuesta de la base de datos.' 
          });
      }
  
  } catch (error) {
      // 6. Manejo de errores (conexión a BD, errores SQL, etc.)
      console.error("Error en POST /calcular_ict:", error); 
      // Puedes verificar códigos de error específicos si es necesario
      // ej. if (error.code === '22007') { // invalid_datetime_format }
      res.status(500).json({ 
          status: 'error', 
          mensaje: 'Error interno del servidor al intentar calcular el ICT.',
      });
  }
  });

// Endpoint para calcular el Perímetro Muscular Braquial (PMB)
router.post('/calcular_pmb', async (req, res) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

try {
    // 1. Obtener los parámetros necesarios del cuerpo de la solicitud
    const { pacienteId, fecha } = req.body; // Espera { "pacienteId": 123, "fecha": "YYYY-MM-DD" }

    // 2. Validación básica de entrada
    if (pacienteId === undefined || fecha === undefined) {
        return res.status(400).json({ 
            status: 'error', 
            mensaje: 'Faltan parámetros requeridos: "pacienteId" y "fecha".' 
        });
    }

    // 3. Construir la consulta SQL para llamar a la función
    const sql = 'SELECT public.calcular_pmb($1, $2) AS pmb_calculado';
    const params = [pacienteId, fecha];

    // 4. Ejecutar la consulta usando async/await
    const result = await pool.query(sql, params);

    // 5. Procesar el resultado
    if (result.rows && result.rows.length > 0) {
        const pmb = result.rows[0].pmb_calculado; 

        if (pmb !== null) {
            res.json({
                status: 'success',
                mensaje: 'PMB calculado correctamente.',
                pacienteId: pacienteId,
                fecha: fecha,
                pmb: pmb 
            });
        } else {
            res.status(404).json({ 
                status: 'not_found',
                mensaje: 'No se encontraron datos de antropometría para el paciente y fecha especificados, o los datos existentes no permiten calcular el PMB.'
            });
        }
    } else {
        // Caso inesperado: la consulta no devolvió filas (podría indicar un problema con la función en sí)
        console.error('La consulta a calcular_pmb no devolvió filas. Resultado:', result);
        res.status(500).json({ 
            status: 'error', 
            mensaje: 'Error inesperado al procesar la respuesta de la base de datos.' 
        });
    }

} catch (error) {
    // 6. Manejo de errores (conexión a BD, errores SQL, etc.)
    console.error("Error en POST /calcular_pmb:", error); 
    // Puedes verificar códigos de error específicos si es necesario
    // ej. if (error.code === '22007') { // invalid_datetime_format }
    res.status(500).json({ 
        status: 'error', 
        mensaje: 'Error interno del servidor al intentar calcular el PMB.',
    });
}
});

// Endpoint para calcular el Área Muscular Braquial (AMB)
router.post('/calcular_amb', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    try {
        // 1. Obtener los parámetros necesarios del cuerpo de la solicitud
        const { pacienteId, fecha } = req.body; // Espera { "pacienteId": 123, "fecha": "YYYY-MM-DD" }
    
        // 2. Validación básica de entrada
        if (pacienteId === undefined || fecha === undefined) {
            return res.status(400).json({ 
                status: 'error', 
                mensaje: 'Faltan parámetros requeridos: "pacienteId" y "fecha".' 
            });
        }
    
        // 3. Construir la consulta SQL para llamar a la función
        const sql = 'SELECT public.calcular_amb($1, $2) AS amb_calculado';
        const params = [pacienteId, fecha];
    
        // 4. Ejecutar la consulta usando async/await
        const result = await pool.query(sql, params);
    
        // 5. Procesar el resultado
        if (result.rows && result.rows.length > 0) {
            const amb = result.rows[0].amb_calculado; 
    
            if (amb !== null) {
                res.json({
                    status: 'success',
                    mensaje: 'AMB calculado correctamente.',
                    pacienteId: pacienteId,
                    fecha: fecha,
                    amb: amb 
                });
            } else {
                res.status(404).json({ 
                    status: 'not_found',
                    mensaje: 'No se encontraron datos de antropometría para el paciente y fecha especificados, o los datos existentes no permiten calcular el AMB.'
                });
            }
        } else {
            // Caso inesperado: la consulta no devolvió filas (podría indicar un problema con la función en sí)
            console.error('La consulta a calcular_amb no devolvió filas. Resultado:', result);
            res.status(500).json({ 
                status: 'error', 
                mensaje: 'Error inesperado al procesar la respuesta de la base de datos.' 
            });
        }
    
} catch (error) {
    // 6. Manejo de errores (conexión a BD, errores SQL, etc.)
    console.error("Error en POST /calcular_amb:", error); 
    // Puedes verificar códigos de error específicos si es necesario
    // ej. if (error.code === '22007') { // invalid_datetime_format }
    res.status(500).json({ 
        status: 'error', 
        mensaje: 'Error interno del servidor al intentar calcular el AMB.',
    });
}
});

// Endpoint para calcular el Área grasa braquial (AGB)
router.post('/calcular_agb', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    try {
        // 1. Obtener los parámetros necesarios del cuerpo de la solicitud
        const { pacienteId, fecha } = req.body; // Espera { "pacienteId": 123, "fecha": "YYYY-MM-DD" }
    
        // 2. Validación básica de entrada
        if (pacienteId === undefined || fecha === undefined) {
            return res.status(400).json({ 
                status: 'error', 
                mensaje: 'Faltan parámetros requeridos: "pacienteId" y "fecha".' 
            });
        }
    
        // 3. Construir la consulta SQL para llamar a la función
        const sql = 'SELECT public.calcular_agb($1, $2) AS agb_calculado';
        const params = [pacienteId, fecha];
    
        // 4. Ejecutar la consulta usando async/await
        const result = await pool.query(sql, params);
    
        // 5. Procesar el resultado
        if (result.rows && result.rows.length > 0) {
            const amb = result.rows[0].agb_calculado; 
    
            if (amb !== null) {
                res.json({
                    status: 'success',
                    mensaje: 'AGB calculado correctamente.',
                    pacienteId: pacienteId,
                    fecha: fecha,
                    amb: amb 
                });
            } else {
                res.status(404).json({ 
                    status: 'not_found',
                    mensaje: 'No se encontraron datos de antropometría para el paciente y fecha especificados, o los datos existentes no permiten calcular el AGB.'
                });
            }
        } else {
            // Caso inesperado: la consulta no devolvió filas (podría indicar un problema con la función en sí)
            console.error('La consulta a calcular_agb no devolvió filas. Resultado:', result);
            res.status(500).json({ 
                status: 'error', 
                mensaje: 'Error inesperado al procesar la respuesta de la base de datos.' 
            });
        }
    
} catch (error) {
    // 6. Manejo de errores (conexión a BD, errores SQL, etc.)
    console.error("Error en POST /calcular_agb:", error); 
    // Puedes verificar códigos de error específicos si es necesario
    // ej. if (error.code === '22007') { // invalid_datetime_format }
    res.status(500).json({ 
        status: 'error', 
        mensaje: 'Error interno del servidor al intentar calcular el AGB.',
    });
}
});

// Endpoint para calcular el Porcentaje de Grasa (PG)
router.post('/calcular_pg', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    try {
        // 1. Obtener los parámetros necesarios del cuerpo de la solicitud
        const { pacienteId, fecha } = req.body; // Espera { "pacienteId": 123, "fecha": "YYYY-MM-DD" }
    
        // 2. Validación básica de entrada
        if (pacienteId === undefined || fecha === undefined) {
            return res.status(400).json({ 
                status: 'error', 
                mensaje: 'Faltan parámetros requeridos: "pacienteId" y "fecha".' 
            });
        }
    
        // 3. Construir la consulta SQL para llamar a la función
        const sql = 'SELECT public.calcular_pg($1, $2) AS pg_calculado';
        const params = [pacienteId, fecha];
    
        // 4. Ejecutar la consulta usando async/await
        const result = await pool.query(sql, params);
    
        // 5. Procesar el resultado
        if (result.rows && result.rows.length > 0) {
            const pg = result.rows[0].pg_calculado; 
    
            if (pg !== null) {
                res.json({
                    status: 'success',
                    mensaje: 'Porcentaje de grasa calculado correctamente.',
                    pacienteId: pacienteId,
                    fecha: fecha,
                    pg: pg 
                });
            } else {
                res.status(404).json({ 
                    status: 'not_found',
                    mensaje: 'No se encontraron datos de antropometría para el paciente y fecha especificados, o los datos existentes no permiten calcular el Porcentaje de grasa.'
                });
            }
        } else {
            // Caso inesperado: la consulta no devolvió filas (podría indicar un problema con la función en sí)
            console.error('La consulta a calcular_pg no devolvió filas. Resultado:', result);
            res.status(500).json({ 
                status: 'error', 
                mensaje: 'Error inesperado al procesar la respuesta de la base de datos.' 
            });
        }
    
} catch (error) {
    // 6. Manejo de errores (conexión a BD, errores SQL, etc.)
    console.error("Error en POST /calcular_pg:", error); 
    // Puedes verificar códigos de error específicos si es necesario
    // ej. if (error.code === '22007') { // invalid_datetime_format }
    res.status(500).json({ 
        status: 'error', 
        mensaje: 'Error interno del servidor al intentar calcular el Porcentaje de grasa.',
    });
}
});

// Endpoint para guardar los datos de los cálculos de antropometría en la tabla Calculo_Antropometria
router.post('/guardar_antropometria', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    try {
        // 1. Obtener los parámetros necesarios del cuerpo de la solicitud
        const { pacienteId, fecha } = req.body; 

        // 2. Validación básica de entrada
        if (pacienteId === undefined || fecha === undefined) {
            return res.status(400).json({
                status: 'error',
                mensaje: 'Faltan parámetros requeridos: "pacienteId" y "fecha".'
            });
        }
        
        // 3. Construir la consulta SQL para llamar a la función correcta
        const sql = 'SELECT public.guardar_antropometria($1, $2) AS id_calculo_insertado';
        const params = [pacienteId, fecha];

        // 4. Ejecutar la consulta usando async/await
        const result = await pool.query(sql, params);

        // 5. Procesar el resultado de la función guardar_antropometria
        //    (Asumiendo que devuelve el ID > 0 en éxito, o 0 si no encontró datos fuente)
        if (result.rows && result.rows.length > 0) {
            // Obtener el valor devuelto por la función
            const nuevoCalculoId = result.rows[0].id_calculo_insertado;

            if (nuevoCalculoId > 0) {
                // ¡Éxito! La función procesó e insertó los datos.
                res.status(201).json({ // 201 Created
                    status: 'success',
                    mensaje: 'Cálculos antropométricos procesados y guardados correctamente.',
                    pacienteId: pacienteId,
                    fecha: fecha,
                    idCalculo: nuevoCalculoId // Devolver el ID del nuevo registro
                });
            } else {
                // La función devolvió 0 (o potencialmente NULL si la lógica es diferente)
                // Asumimos que 0 significa que no se encontró el registro original en Antropometria
                res.status(404).json({
                    status: 'not_found',
                    mensaje: 'No se encontró registro de antropometría fuente para el paciente y fecha especificados. No se pudieron guardar los cálculos.'
                });
            }
        } else {
            // Caso inesperado: la consulta SELECT no devolvió filas.
            console.error('La llamada a la función guardar_antropometria no devolvió filas. Resultado:', result);
            res.status(500).json({
                status: 'error',
                mensaje: 'Error inesperado al procesar la respuesta de la base de datos.'
            });
        }

    } catch (error) {
        // 6. Manejo de errores generales
        console.error("Error en POST /guardar_antropometria:", error);
        res.status(500).json({
            status: 'error',
            mensaje: 'Error interno del servidor al intentar guardar los cálculos antropométricos.',
            // detalle: error.message // Opcional
        });
    }
});

// Endpoint para OBTENER LA CLASIFICACIÓN del Área Muscular Braquial (AMB)
router.get('/diagnosticar_amb', async (req, res) => { 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    try {
        const { pacienteId, fecha } = req.query;

        // Validación 
        if (!pacienteId || !fecha) {  
            return res.status(400).json({ status: 'error', mensaje: 'Faltan parámetros requeridos: "pacienteId" y "fecha".' });
        }
        const pacienteIdNum = parseInt(pacienteId, 10);

        // 1. Llamar directamente a la función de diagnóstico de AMB 
        //    que ahora espera solo pacienteId y fecha
        const clasificacionSql = 'SELECT public.diagnosticar_amb($1, $2) AS clasificacion'; 
        const clasificacionParams = [pacienteIdNum, fecha]; 
        const clasificacionResult = await pool.query(clasificacionSql, clasificacionParams);

        // 2. Procesar el resultado (Texto o NULL)
        if (!clasificacionResult.rows || clasificacionResult.rows.length === 0 ) {
             return res.status(500).json({ status: 'error', mensaje: 'Error al obtener respuesta de la función de diagnóstico AMB.' }); 
        }
        
        const clasificacionTexto = clasificacionResult.rows[0].clasificacion; 

        // Si la función devolvió NULL (por error interno no capturado o validación inicial fallida)
        if (clasificacionTexto === null) {
             return res.status(500).json({ // O 400 
                 status: 'error',
                 mensaje: 'No se pudo obtener un diagnóstico válido para AMB (Error interno o parámetros inválidos).' 
             });
         }
         
         // Verificar si la respuesta es uno de los mensajes de error/informativos de la función
         const erroresConocidos = [ 
            'Paciente no encontrado', 
            'Datos incompletos del paciente (sexo/fecha nac.)', 
            'Sexo inválido registrado',
            'AMB no calculado previamente para esta fecha', // Nuevo error posible
            'Clasificación no disponible', // Si edad/valor no aplica
            // Podría haber otros como 'Descripción no encontrada para ID X'
         ];
        if (erroresConocidos.includes(clasificacionTexto) || clasificacionTexto.startsWith('Descripción no encontrada')) {
             // 404 si el paciente o el AMB precalculado no existen, 400 para otros
             const statusCode = (clasificacionTexto === 'Paciente no encontrado' || clasificacionTexto.startsWith('AMB no calculado')) ? 404 : 400; 
             return res.status(statusCode).json({ status: 'error', mensaje: `No se pudo clasificar: ${clasificacionTexto}` });
         }

        // 3. Devolver la clasificación obtenida (Texto)
        res.status(200).json({
            status: 'success',
            pacienteId: pacienteIdNum,
            fecha: fecha,
            clasificacion: clasificacionTexto // El diagnóstico devuelto por la función
        });

    } catch (error) {
        console.error("Error en GET /diagnosticar_amb:", error); 
        const dbErrorMessage = error.message || 'Error desconocido.';
        res.status(500).json({
            status: 'error',
            mensaje: 'Error interno del servidor al intentar obtener el diagnóstico AMB.', 
            detalle_db: dbErrorMessage 
        });
    }
});

// Endpoint para OBTENER LA CLASIFICACIÓN del Área Grasa Braquial (AGB)
router.get('/diagnosticar_agb', async (req, res) => { 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    try {
        const { pacienteId, fecha } = req.query;

        // Validación 
        if (!pacienteId || !fecha) {  
            return res.status(400).json({ status: 'error', mensaje: 'Faltan parámetros requeridos: "pacienteId" y "fecha".' });
        }
        const pacienteIdNum = parseInt(pacienteId, 10);

        // 1. Llamar directamente a la función de diagnóstico de AGB 
        //    que ahora espera pacienteId y fecha
        const clasificacionSql = 'SELECT public.diagnosticar_agb($1, $2) AS clasificacion'; 
        const clasificacionParams = [pacienteIdNum, fecha]; // *** Pasar pacienteId y fecha ***
        const clasificacionResult = await pool.query(clasificacionSql, clasificacionParams);

        // 2. Procesar el resultado (Texto o NULL)
        if (!clasificacionResult.rows || clasificacionResult.rows.length === 0 ) {
             return res.status(500).json({ status: 'error', mensaje: 'Error al obtener respuesta de la función de diagnóstico AGB.' }); 
        }
        
        const clasificacionTexto = clasificacionResult.rows[0].clasificacion; 

        // Si la función devolvió NULL (por error interno o validación inicial fallida)
        if (clasificacionTexto === null) {
             return res.status(500).json({ // O 400 
                 status: 'error',
                 mensaje: 'No se pudo obtener un diagnóstico válido para AGB (Error interno o parámetros inválidos).' 
             });
         }
         
         // Verificar si la respuesta es uno de los mensajes de error/informativos de la función
         const erroresConocidos = [ 
            'Paciente no encontrado', 
            'Datos incompletos del paciente (sexo/fecha nac.)', 
            'Sexo inválido registrado',
            'AGB no calculado previamente para esta fecha',
            'Clasificación no disponible', // Mensaje si edad fuera de rango, etc.
            // Podría haber otros como 'Descripción no encontrada para ID X'
         ];
        if (erroresConocidos.includes(clasificacionTexto) || clasificacionTexto.startsWith('Descripción no encontrada')) {
             const statusCode = (clasificacionTexto === 'Paciente no encontrado' || clasificacionTexto.startsWith('AGB no calculado')) ? 404 : 400; 
             return res.status(statusCode).json({ status: 'error', mensaje: `No se pudo clasificar: ${clasificacionTexto}` });
         }

        // 3. Devolver la clasificación obtenida (Texto)
        res.status(200).json({
            status: 'success',
            pacienteId: pacienteIdNum,
            fecha: fecha,
            clasificacion: clasificacionTexto // El diagnóstico devuelto por la función
        });

    } catch (error) {
        console.error("Error en GET /diagnosticar_agb:", error); 
        const dbErrorMessage = error.message || 'Error desconocido.';
        res.status(500).json({
            status: 'error',
            mensaje: 'Error interno del servidor al intentar obtener el diagnóstico AGB.', 
            detalle_db: dbErrorMessage 
        });
    }
});


// Endpoint para OBTENER LA CLASIFICACIÓN/DIAGNÓSTICO del IMC (Devuelve Texto)
router.get('/diagnosticar_imc', async (req, res) => { 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    try {
        const { pacienteId, fecha } = req.query;

        // Validación 
        if (!pacienteId || !fecha) {  
            return res.status(400).json({ status: 'error', mensaje: 'Faltan parámetros requeridos: "pacienteId" y "fecha".' });
        }
        const pacienteIdNum = parseInt(pacienteId, 10);

        // 1. Llamar a la función de diagnóstico de IMC (pasando pacienteId y fecha)
        //    La función interna busca el IMC precalculado y la descripción.
        const clasificacionSql = 'SELECT public.diagnosticar_imc($1, $2) AS clasificacion'; // *** Llamar con 2 parámetros ***
        const clasificacionParams = [pacienteIdNum, fecha]; // *** Pasar pacienteId y fecha ***
        const clasificacionResult = await pool.query(clasificacionSql, clasificacionParams);

        // 2. Procesar el resultado (Texto o NULL)
        if (!clasificacionResult.rows || clasificacionResult.rows.length === 0 ) {
             return res.status(500).json({ status: 'error', mensaje: 'Error al obtener respuesta de la función de diagnóstico IMC.' }); 
        }
        
        const clasificacionTexto = clasificacionResult.rows[0].clasificacion; 

        // Si la función devolvió NULL (por error interno no capturado o validación inicial)
        if (clasificacionTexto === null) {
             return res.status(500).json({ // O 400 si prefieres
                 status: 'error',
                 mensaje: 'No se pudo obtener un diagnóstico válido para IMC (Error interno o parámetros inválidos).' 
             });
         }
         
         // Verificar si la respuesta es uno de los mensajes de error/informativos de la función
         const erroresConocidos = [ 
            'Paciente no encontrado', 
            'Fecha de nacimiento no registrada', 
            'IMC no calculado previamente para esta fecha',
            'Clasificación no disponible para esta edad/IMC',
            // Podría haber otros como 'Descripción no encontrada para ID X'
         ];
        if (erroresConocidos.includes(clasificacionTexto)) {
             const statusCode = (clasificacionTexto === 'Paciente no encontrado' || clasificacionTexto.startsWith('IMC no calculado')) ? 404 : 400; 
             return res.status(statusCode).json({ status: 'error', mensaje: `No se pudo clasificar: ${clasificacionTexto}` });
         }

        // 3. Devolver la clasificación obtenida (Texto)
        res.status(200).json({
            status: 'success',
            pacienteId: pacienteIdNum,
            fecha: fecha,
            // Ya no devolvemos imcCalculado
            clasificacion: clasificacionTexto // El diagnóstico devuelto por la función
        });

    } catch (error) {
        console.error("Error en GET /diagnosticar_imc:", error); 
        const dbErrorMessage = error.message || 'Error desconocido.';
        res.status(500).json({
            status: 'error',
            mensaje: 'Error interno del servidor al intentar obtener el diagnóstico IMC.', 
            detalle_db: dbErrorMessage 
        });
    }
});

// Endpoint para OBTENER EL DIAGNÓSTICO del Índice Cintura Talla (ICT)
router.get('/diagnosticar_ict', async (req, res) => { 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    try {
        const { pacienteId, fecha } = req.query;

        // Validación 
        if (!pacienteId || !fecha) {  
            return res.status(400).json({ status: 'error', mensaje: 'Faltan parámetros requeridos: "pacienteId" y "fecha".' });
        }
        const pacienteIdNum = parseInt(pacienteId, 10);

        // 1. Llamar directamente a la función de diagnóstico de ICT 
        //    espera pacienteId y fecha
        const clasificacionSql = 'SELECT public.diagnosticar_ict($1, $2) AS clasificacion'; 
        const clasificacionParams = [pacienteIdNum, fecha]; 
        const clasificacionResult = await pool.query(clasificacionSql, clasificacionParams);

        // 2. Procesar el resultado (Texto o NULL)
        if (!clasificacionResult.rows || clasificacionResult.rows.length === 0 ) {
             return res.status(500).json({ status: 'error', mensaje: 'Error al obtener respuesta de la función de diagnóstico ICT.' }); 
        }
        
        const clasificacionTexto = clasificacionResult.rows[0].clasificacion; 

        // Si la función devolvió NULL (por error interno)
        if (clasificacionTexto === null) {
             return res.status(500).json({ // Usamos 500 porque la función no debería devolver NULL si los datos existen
                 status: 'error',
                 mensaje: 'Error inesperado al obtener el diagnóstico ICT.' 
             });
         }
         
         // Verificar si la respuesta es uno de los mensajes de error/informativos de la función
         const erroresConocidos = [ 
            'ICT no calculado previamente para esta fecha', 
            'Valor ICT no clasificable',
         ];
        if (erroresConocidos.includes(clasificacionTexto)) {
             // Usamos 404 si el ICT no estaba calculado, 400 para otros
             const statusCode = (clasificacionTexto === 'ICT no calculado previamente para esta fecha') ? 404 : 400; 
             return res.status(statusCode).json({ status: 'error', mensaje: `No se pudo clasificar: ${clasificacionTexto}` });
         }

        // 3. Devolver la clasificación obtenida (Texto)
        res.status(200).json({
            status: 'success',
            pacienteId: pacienteIdNum,
            fecha: fecha,
            clasificacion: clasificacionTexto 
        });

    } catch (error) {
        console.error("Error en GET /diagnosticar_ict:", error); 
        const dbErrorMessage = error.message || 'Error desconocido.';
        res.status(500).json({
            status: 'error',
            mensaje: 'Error interno del servidor al intentar obtener la clasificación ICT.', 
            detalle_db: dbErrorMessage 
        });
    }
});


app.use(router);
module.exports = router