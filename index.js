const { PORT } = require('./config.js');
const express = require('express');
const app = express();
const cors = require("cors")

app.use(express.json());
app.use(cors())

// Ruta para obtener grupo alimenticio
app.use("/api_nutrilink/mantenedor_alimentos", require("./routes/mantenedor_alimento.js"));
// Ruta para gestionar Nutricionistas
app.use("/api_nutrilink/mantenedor_nutricionistas", require("./routes/mantenedor_nutricionistas.js"))
// Ruta para obtener cálculos de antropometría
app.use("/api_nutrilink/antropometria", require("./routes/antropometria.js"));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
  //console.log(`http://localhost:3000`);
});