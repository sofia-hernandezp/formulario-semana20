const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "formulario",
  connectionLimit: 5,
});

async function guardarDatos(req, res) {
console.log(req.body)
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `INSERT INTO datos (name, lastname, email, country, occupation, description) VALUES(?, ?, ?, ?, ?, ?)`,
      [req.body.name, req.body.lastname, req.body.email, req.body.country, req.body.occupation, req.body.description]
    );

    console.log("Datos agregados");
    res.json({ id: parseInt(response.insertId), ...req.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release(); //release to pool
  }
}

module.exports = { guardarDatos };