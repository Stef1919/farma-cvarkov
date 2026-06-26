import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

export default function Sertifikat(){

const [sertifikat, setSertifikat] = useState([]);
const [naziv, setNaziv] = useState("");
const [datumIzdaje, setDatumIzdaje] = useState("");
const [datumPoteka, setDatumPoteka] = useState("");
const [status, setStatus] = useState("");
const [proizvodnjaId, setProizvodnjaId] = useState("");
const [proizvodnja, setProizvodnja] = useState([]);
const [editId, setEditId] = useState(null);
const [message, setMessage] = useState("");

const loadSertifikat = async () => {

  try {
    const res = await fetch(
      `${API_URL}/sertifikat`
    );

    const data = await res.json();

    if (res.ok) {
      setSertifikat(data.data);
    }
  } catch (err) {
    console.error(err);
  }
};

const loadProizvodnja = async () => {
  try {
    const res = await fetch(
      `${API_URL}/proizvodnja`
    );

    const data = await res.json();

    if (res.ok) {
      setProizvodnja(data.data);
    }
  } catch (err) {
    console.error(err);
  }
  
};

useEffect(() => {
  loadSertifikat();
  loadProizvodnja();
}, []);

const handleSubmit = async (event) => {
  event.preventDefault();

  setMessage("");

  try {
    const method = editId
      ? "PUT"
      : "POST";

    const url = editId
      ? `${API_URL}/sertifikat/${editId}`
      : `${API_URL}/sertifikat`;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        naziv,
        datum_izdaje: datumIzdaje,
        datum_poteka: datumPoteka,
        status,
        proizvodnja_id: proizvodnjaId,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(editId ? "Sertifikat posodobljen." : "Sertifikat dodan.");
      setNaziv("");
      setDatumIzdaje("");
      setDatumPoteka("");
      setStatus("");
      setProizvodnjaId("");
      setEditId(null);

      await loadSertifikat();
    } else {
      setMessage(data.message);
    }
  } catch (err) {
    console.error(err);
    setMessage("Napaka pri povezavi s strežnikom.");
  }
};

const handleEdit = (item) => {
  setNaziv(item.naziv);
  setDatumIzdaje(item.datum_izdaje ? item.datum_izdaje.substring(0, 10) : "");
  setDatumPoteka(item.datum_poteka ? item.datum_poteka.substring(0,10) : "");
  setStatus(item.status);
  setProizvodnjaId(item.proizvodnja_id);
  setEditId(item.id);
};

const handleDelete = async (id) => {
  try {
    const res = await fetch(
      `${API_URL}/sertifikat/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (res.ok) {
      setMessage("Sertifikat izbrisan.");
      setSertifikat(sertifikat.filter((item) => item.id !== id));
    } else {
      setMessage(data.message);
    }
  } catch (err) {
    console.error(err);
    setMessage("Napaka pri povezavi s strežnikom.");
  }
};

const getProizvodnja = (id) => {
  const found = proizvodnja.find((item) => item.id === id);

  if (!found) return id;

  return `${found.tip} (${found.kolicina})`;
};

return(
  <main className="container mt-4">
    <h1 className="mb-4">Sertifikat</h1>

    <div className="card mb-4">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Naziv
              </label>

              <input
                className="form-control"
                type="text"
                value={naziv}
                onChange={(e) => setNaziv(e.target.value)}/>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Status
              </label>

              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}>
                <option value="">
                  Izberi status
                </option>

                <option value="aktiven">
                  Aktiven
                </option>

                <option value="potekel">
                  Potekel
                </option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Datum izdaje
              </label>

              <input
                className="form-control"
                type="date"
                value={datumIzdaje}
                onChange={(e) => setDatumIzdaje(e.target.value)}/>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Datum poteka
              </label>

              <input
                className="form-control"
                type="date"
                value={datumPoteka}
                onChange={(e) => setDatumPoteka(e.target.value)}/>
            </div>

            <div className="col-12 mb-3">
              <label className="form-label">
                Proizvodnja
              </label>

              <select
                className="form-select"
                value={proizvodnjaId}
                onChange={(e) => setProizvodnjaId(e.target.value)}>
                <option value="">
                  Izberi proizvodnjo
                </option>

                {proizvodnja.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.tip} ({item.kolicina})
                  </option>
                ))}
              </select>
            </div>

          </div>

          <button
            type="submit"
            className="btn btn-primary">
            {editId ? "Posodobi sertifikat" : "Dodaj sertifikat"}
          </button>
        </form>
      </div>
    </div>

    {message && ( <div className="alert alert-info"> {message} </div> )}

    <div className="table-responsive">
      <table className="table table-striped table-bordered table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Naziv</th>
            <th>Datum izdaje</th>
            <th>Datum poteka</th>
            <th>Status</th>
            <th>Proizvodnja</th>
            <th>Akcije</th>
          </tr>
        </thead>

        <tbody>
          {sertifikat.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>

              <td>{item.naziv}</td>

              <td>
                {item.datum_izdaje ? item.datum_izdaje.substring(0, 10) : ""}
              </td>

              <td>
                {item.datum_poteka ? item.datum_poteka.substring(0, 10) : ""}
              </td>

              <td>{item.status}</td>

              <td>
                {getProizvodnja(item.proizvodnja_id)}
              </td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(item)}>
                  Uredi
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.id)}>
                  Izbriši
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
</main>
)

}