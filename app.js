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

app.post("/datos", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `INSERT INTO datos(name, lastname, email, country, occupation, description) VALUE(?, ?, ?, ?, ?, ?)`,
      [req.body.name, req.body.lastname, req.body.email, req.body.country, req.body.occupation, req.body.description]
    );

    res.json({ id: parseInt(response.insertId), ...req.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});