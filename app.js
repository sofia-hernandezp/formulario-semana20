const express = require("express");
const mariadb = require("mariadb");

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

app.post('/', async (req, res, next) => {
  console.log(req)
  const {name, lastname, email, country, occupation, description} = req.body
  console.log(name, lastname, email, country, occupation, description)
    if (!name || !lastname || !email || !country || !occupation || !description) {
    console.log(req.body)
    return res.status(400).json({ message: "Todos los campos son obligatorios."});
  }
  
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `INSERT INTO datos (name, lastname, email, country, occupation, description) VALUES(?, ?, ?, ?, ?, ?)`,
      [name, lastname, email, country, occupation, description]
    );

      console.log("Datos agregados")
    res.json({ id: parseInt(response.insertId), ...req.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});