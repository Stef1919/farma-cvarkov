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

//PERAD

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

//HRANA

export const allHrana = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM hrana"
  );

  return rows;
};

export const oneHrana = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM hrana WHERE id = ?",
    [id]
  );

  return rows;
};

export const createHrana = async (
  naziv,
  tip,
  kolicina,
  cena,
  rok_uporabe,
  korisnik_id
) => {
  const [result] = await pool.query(
    `INSERT INTO hrana
    (naziv, tip, kolicina, cena, rok_uporabe, korisnik_id)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      naziv,
      tip,
      kolicina,
      cena,
      rok_uporabe,
      korisnik_id,
    ]
  );

  return result;
};

export const updateHrana = async (
  id,
  naziv,
  tip,
  kolicina,
  cena,
  rok_uporabe,
  korisnik_id
) => {
  const [result] = await pool.query(
    `UPDATE hrana
     SET naziv = ?,
         tip = ?,
         kolicina = ?,
         cena = ?,
         rok_uporabe = ?,
         korisnik_id = ?
     WHERE id = ?`,
    [
      naziv,
      tip,
      kolicina,
      cena,
      rok_uporabe,
      korisnik_id,
      id,
    ]
  );

  return result;
};

export const deleteHrana = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM hrana WHERE id = ?",
    [id]
  );

  return result;
};

//Korisnik

export const allKorisnik = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM korisnik"
  );

  return rows;
};

export const oneKorisnik = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM korisnik WHERE id = ?",
    [id]
  );

  return rows;
};

export const createKorisnik = async (
  ime,
  telefon,
  email,
  naslov,
  vloga
) => {
  const [result] = await pool.query(
    `INSERT INTO korisnik
    (ime,
  telefon,
  email,
  naslov,
  vloga)
    VALUES (?, ?, ?, ?, ?)`,
    [ime,
  telefon,
  email,
  naslov,
  vloga]
  );

  return result;
};

export const updateKorisnik = async (
  id,
  ime,
  telefon,
  email,
  naslov,
  vloga
) => {
  const [result] = await pool.query(
    `UPDATE korisnik
     SET ime = ?,
         telefon = ?,
         email = ?,
         naslov = ?,
         vloga = ?
     WHERE id = ?`,
    [ime,
  telefon,
  email,
  naslov,
  vloga,
  id]
  );

  return result;
};

export const deleteKorisnik = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM korisnik WHERE id = ?",
    [id]
  );

  return result;
};