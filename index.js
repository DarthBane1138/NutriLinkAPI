const express = require('express');
const app = express();
const port = 3000;
const cors = require("cors")

app.use(express.json());
app.use(cors())

// Ruta para obtener grupo alimenticio
app.use("/api_nutrilink/mantenedor_alimentos", require("./routes/mantenedor_alimento.js"));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});