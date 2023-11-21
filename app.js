const express = require("express");
const mariadb = require("mariadb");
const bodyParser = require("body-parser");
const { guardarDatos } = require("./controllers"); // Asegúrate de que la ruta del controlador sea correcta
const cors = require("cors");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "formulario",
  connectionLimit: 5,
});

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/', guardarDatos);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});