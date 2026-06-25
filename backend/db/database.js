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
    "SELECT * FROM perad WHERE id = ?", [id]
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
    "DELETE FROM perad WHERE id = ?", [id]
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
    "SELECT * FROM hrana WHERE id = ?", [id]
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
    "SELECT * FROM korisnik WHERE id = ?", [id]
  );

  return rows;
};

export const createKorisnik = async (
  ime,
  telefon,
  email,
  naslov,
  vloga,
  geslo
) => {
  const [result] = await pool.query(
    `INSERT INTO korisnik
    (
      ime,
      telefon,
      email,
      naslov,
      vloga,
      geslo
    )
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      ime,
      telefon,
      email,
      naslov,
      vloga,
      geslo,
    ]
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
    "DELETE FROM korisnik WHERE id = ?", [id]
  );

  return result;
};

//HRANA-PERAD

export const allHranaPerad = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM hrana_perad"
  );

  return rows;
};

export const oneHranaPerad = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM hrana_perad WHERE id = ?", [id]
  );

  return rows;
};

export const createHranaPerad = async (
  hrana_id,
  perad_id
) => {
  const [result] = await pool.query(
    `INSERT INTO hrana_perad
    (hrana_id, perad_id)
    VALUES (?, ?)`,
    [hrana_id, perad_id]
  );

  return result;
};

export const updateHranaPerad = async (
  id,
  hrana_id,
  perad_id
) => {
  const [result] = await pool.query(
    `UPDATE hrana_perad
     SET hrana_id = ?,
         perad_id = ?
     WHERE id = ?`,
    [hrana_id, perad_id, id]
  );

  return result;
};

export const deleteHranaPerad = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM hrana_perad WHERE id = ?", [id]
  );

  return result;
};

//PROIZVODNJA

export const allProizvodnja = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM proizvodnja"
  );

  return rows;
};

export const oneProizvodnja = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM proizvodnja WHERE id = ?", [id]
  );

  return rows;
};

export const createProizvodnja = async (
  datum,
  tip,
  kolicina,
  opombe,
  perad_id,
  korisnik_id
) => {
  const [result] = await pool.query(
    `INSERT INTO proizvodnja
    (datum, tip, kolicina, opombe, perad_id, korisnik_id)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      datum,
      tip,
      kolicina,
      opombe,
      perad_id,
      korisnik_id,
    ]
  );

  return result;
};

export const updateProizvodnja = async (
  id,
  datum,
  tip,
  kolicina,
  opombe,
  perad_id,
  korisnik_id
) => {
  const [result] = await pool.query(
    `UPDATE proizvodnja
     SET datum = ?,
         tip = ?,
         kolicina = ?,
         opombe = ?,
         perad_id = ?,
         korisnik_id = ?
     WHERE id = ?`,
    [
      datum,
      tip,
      kolicina,
      opombe,
      perad_id,
      korisnik_id,
      id,
    ]
  );

  return result;
};

export const deleteProizvodnja = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM proizvodnja WHERE id = ?", [id]
  );

  return result;
};

//PREGLED

export const allPregled = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM pregled"
  );

  return rows;
};

export const onePregled = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM pregled WHERE id = ?", [id]
  );

  return rows;
};

export const createPregled = async (
  datum,
  diagnoza,
  stanje,
  opombe,
  perad_id,
  korisnik_id
) => {
  const [result] = await pool.query(
    `INSERT INTO pregled
    (
      datum,
      diagnoza,
      stanje,
      opombe,
      perad_id,
      korisnik_id
    )
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      datum,
      diagnoza,
      stanje,
      opombe,
      perad_id,
      korisnik_id,
    ]
  );

  return result;
};

export const updatePregled = async (
  id,
  datum,
  diagnoza,
  stanje,
  opombe,
  perad_id,
  korisnik_id
) => {
  const [result] = await pool.query(
    `UPDATE pregled
     SET datum = ?,
         diagnoza = ?,
         stanje = ?,
         opombe = ?,
         perad_id = ?,
         korisnik_id = ?
     WHERE id = ?`,
    [
      datum,
      diagnoza,
      stanje,
      opombe,
      perad_id,
      korisnik_id,
      id,
    ]
  );

  return result;
};

export const deletePregled = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM pregled WHERE id = ?", [id]
  );

  return result;
};

//SERTIFIKAT

export const allSertifikat = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM sertifikat"
  );

  return rows;
};

export const oneSertifikat = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM sertifikat WHERE id = ?", [id]
  );

  return rows;
};

export const createSertifikat = async (
  naziv,
  datum_izdaje,
  datum_poteka,
  status,
  proizvodnja_id
) => {
  const [result] = await pool.query(
    `INSERT INTO sertifikat
    (
      naziv,
      datum_izdaje,
      datum_poteka,
      status,
      proizvodnja_id
    )
    VALUES (?, ?, ?, ?, ?)`,
    [
      naziv,
      datum_izdaje,
      datum_poteka,
      status,
      proizvodnja_id,
    ]
  );

  return result;
};

export const updateSertifikat = async (
  id,
  naziv,
  datum_izdaje,
  datum_poteka,
  status,
  proizvodnja_id
) => {
  const [result] = await pool.query(
    `UPDATE sertifikat
     SET naziv = ?,
         datum_izdaje = ?,
         datum_poteka = ?,
         status = ?,
         proizvodnja_id = ?
     WHERE id = ?`,
    [
      naziv,
      datum_izdaje,
      datum_poteka,
      status,
      proizvodnja_id,
      id,
    ]
  );

  return result;
};

export const deleteSertifikat = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM sertifikat WHERE id = ?", [id]
  );

  return result;
};

//PRODAJA

export const allProdaja = async () => {
  const [rows] = await pool.query("SELECT * FROM prodaja");

  return rows;
};

export const oneProdaja = async (id) => {
  const [rows] = await pool.query("SELECT * FROM prodaja WHERE id = ?",[id]);

  return rows;
};

export const createProdaja = async (
  datum,
  kolicina,
  skupna_cena,
  nacin_placila,
  status,
  proizvodnja_id,
  korisnik_id
) => {
  const [result] = await pool.query(
    `INSERT INTO prodaja
    (
      datum,
      kolicina,
      skupna_cena,
      nacin_placila,
      status,
      proizvodnja_id,
      korisnik_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      datum,
      kolicina,
      skupna_cena,
      nacin_placila,
      status,
      proizvodnja_id,
      korisnik_id,
    ]
  );

  return result;
};

export const updateProdaja = async (
  id,
  datum,
  kolicina,
  skupna_cena,
  nacin_placila,
  status,
  proizvodnja_id,
  korisnik_id
) => {
  const [result] = await pool.query(
    `UPDATE prodaja
     SET datum = ?,
         kolicina = ?,
         skupna_cena = ?,
         nacin_placila = ?,
         status = ?,
         proizvodnja_id = ?,
         korisnik_id = ?
     WHERE id = ?`,
    [
      datum,
      kolicina,
      skupna_cena,
      nacin_placila,
      status,
      proizvodnja_id,
      korisnik_id,
      id,
    ]
  );

  return result;
};

export const deleteProdaja = async (id) => {
  const [result] = await pool.query("DELETE FROM prodaja WHERE id = ?", [id]);

  return result;
};

//LOGIN

export const authKorisnik = async (email) => {
  const [rows] = await pool.query(
    `SELECT * FROM korisnik WHERE email = ?`, [email]
  );

  return rows;
};