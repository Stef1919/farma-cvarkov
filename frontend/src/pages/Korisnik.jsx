import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

export default function Korisnik(){
    const [korisnik, setKorisnik] = useState([]);
    const [message, setMessage] = useState("");

    const [ime, setIme] = useState("");
    const [telefon, setTelefon] = useState("");
    const [email, setEmail] = useState("");
    const [naslov, setNaslov] = useState("");
    const [vloga, setVloga] = useState("");

    const [editId, setEditId] = useState(null);

    const loadKorisnik = async () => {
        try {
            const res = await fetch(`${API_URL}/korisnik`);

            const data = await res.json();

            if (res.ok) {
            setKorisnik(data.data);
            } else {
            setMessage("Napaka pri nalaganju podatkov.");
            }
        } catch (err) {
            console.error(err);
            setMessage("Napaka pri povezavi s strežnikom.");
        }
        };

        useEffect(() => {
        loadKorisnik();
        }, []);

    const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");

    try {

      const method = editId ? "PUT" : "POST";

      const url = editId ? `${API_URL}/korisnik/${editId}` : `${API_URL}/korisnik`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        ime,
        telefon,
        email,
        naslov,
        vloga,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage( editId ? "Korisnik uspešno posodobljen." : "Korisnik uspešno dodan."
        );

        setIme("");
        setTelefon("");
        setEmail("");
        setNaslov("");
        setVloga("");

        await loadKorisnik();
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("Napaka pri povezavi s strežnikom.");
    }
  };

    const handleEdit = (item) => {
    setIme(item.ime);
    setTelefon(item.telefon);
    setEmail(item.email);
    setNaslov(item.naslov);
    setVloga(item.vloga);
    setEditId(item.id);
    };  

    const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${API_URL}/korisnik/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("Korisnik izbrisan.");

        setKorisnik(
        korisnik.filter(
            (item) => item.id !== id
        )
        );
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("Napaka pri povezavi s strežnikom.");
    }
  };

   return (

    <main className="container mt-4">
  <h1 className="mb-4">Korisnik</h1>

  <div className="card mb-4">
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Ime</label>
            <input
              className="form-control"
              type="text"
              value={ime}
              onChange={(e) => setIme(e.target.value)}/>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Telefon</label>
            <input
              className="form-control"
              type="text"
              value={telefon}
              onChange={(e) => setTelefon(e.target.value)}/>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Naslov</label>
            <input
              className="form-control"
              type="text"
              value={naslov}
              onChange={(e) => setNaslov(e.target.value)}/>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Vloga</label>
            <select
              className="form-select"
              value={vloga}
              onChange={(e) => setVloga(e.target.value)}>
              <option value="">Izberi</option>
              <option value="delavec">Delavec</option>
              <option value="dostavljalec">Dostavljalec</option>
              <option value="kupec">Kupec</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary">
          {editId ? "Posodobi korisnika" : "Dodaj korisnika"}
        </button>
      </form>
    </div>
  </div>

  {message && (
    <div className="alert alert-info">
      {message}
    </div>
  )}

  <div className="table-responsive">
    <table className="table table-striped table-bordered table-hover align-middle">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Ime</th>
          <th>Telefon</th>
          <th>Email</th>
          <th>Naslov</th>
          <th>Vloga</th>
          <th>Akcije</th>
        </tr>
      </thead>

      <tbody>
        {korisnik.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.ime}</td>
            <td>{item.telefon}</td>
            <td>{item.email}</td>
            <td>{item.naslov}</td>
            <td>{item.vloga}</td>

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
  );

}