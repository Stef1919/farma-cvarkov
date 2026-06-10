import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const allPerad = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM perad"
  );

  return rows;
};

export const onePerad = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM perad WHERE id = ?",
    [id]
  );

  return rows;
};

export const createPerad = async (
  vrsta,
  starost,
  spol,
  kolicina
) => {
  const [result] = await pool.query(
    `INSERT INTO perad
    (vrsta, starost, spol, kolicina)
    VALUES (?, ?, ?, ?)`,
    [vrsta, starost, spol, kolicina]
  );

  return result;
};

export const updatePerad = async (
  id,
  vrsta,
  starost,
  spol,
  kolicina
) => {
  const [result] = await pool.query(
    `UPDATE perad
     SET vrsta = ?,
         starost = ?,
         spol = ?,
         kolicina = ?
     WHERE id = ?`,
    [vrsta, starost, spol, kolicina, id]
  );

  return result;
};

export const deletePerad = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM perad WHERE id = ?",
    [id]
  );

  return result;
};
