import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

export default function Hrana() {

    const [hrana, setHrana] = useState([]);
    const [naziv, setNaziv] = useState("");
    const [tip, setTip] = useState("");
    const [kolicina, setKolicina] = useState("");
    const [cena, setCena] = useState("");
    const [rokUporabe, setRokUporabe] = useState("");
    const [korisnikId, setKorisnikId] = useState("");
    const [message, setMessage] = useState("");
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");

    const loadHrana = async () => {
    try {
        const res = await fetch(`${API_URL}/hrana`);

        const data = await res.json();

        if (res.ok) {
        setHrana(data.data);
        } else {
        setMessage("Napaka pri nalaganju podatkov.");
        }
    } catch (err) {
        console.error(err);
        setMessage("Napaka pri povezavi s strežnikom.");
    }
    };

    useEffect(() => {
    loadHrana();
    }, []);

    const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");

    try {

      const method = editId ? "PUT" : "POST";

      const url = editId ? `${API_URL}/hrana/${editId}` : `${API_URL}/hrana`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        naziv,
        tip,
        kolicina,
        cena,
        rok_uporabe: rokUporabe,
        korisnik_id: korisnikId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage( editId ? "Hrana uspešno posodobljena." : "Hrana uspešno dodana."
        );

        setNaziv("");
        setTip("");
        setKolicina("");
        setCena("");
        setRokUporabe("");
        setKorisnikId("");
        setEditId(null);

        await loadHrana();
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
  setTip(item.tip);
  setKolicina(item.kolicina);
  setCena(item.cena);
  setRokUporabe(item.rok_uporabe ? item.rok_uporabe.substring(0, 10) : "");
  setKorisnikId(item.korisnik_id);
  setEditId(item.id);
    };  


    const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${API_URL}/hrana/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("Hrana izbrisana.");
        setHrana(hrana.filter((item) => item.id !== id));
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("Napaka pri povezavi s strežnikom.");}
  };

  return (
  <main className="container mt-4">
    <h1 className="mb-4">Hrana</h1>

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
                Tip
              </label>

              <select
                className="form-select"
                value={tip}
                onChange={(e) => setTip(e.target.value)}>
                <option value="">
                  Izberi
                </option>

                <option value="psenica">
                  Pšenica
                </option>

                <option value="koruza">
                  Koruza
                </option>

                <option value="vitamin">
                  Vitamin
                </option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Količina
              </label>

              <input
                className="form-control"
                type="number"
                value={kolicina}
                onChange={(e) => setKolicina(e.target.value)}/>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Cena
              </label>

              <input
                className="form-control"
                type="number"
                step="0.01"
                value={cena}
                onChange={(e) => setCena(e.target.value)}/>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Rok uporabe
              </label>

              <input
                className="form-control"
                type="date"
                value={rokUporabe}
                onChange={(e) => setRokUporabe(e.target.value)}/>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Korisnik ID
              </label>

              <input
                className="form-control"
                type="number"
                value={korisnikId} 
                onChange={(e) => setKorisnikId(e.target.value)}/>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            {editId ? "Posodobi hrano" : "Dodaj hrano"}
          </button>
        </form>
      </div>
    </div>

    {message && (
      <div className="alert alert-info">
        {message}
      </div>
    )}
   <div className="row mb-3">

  <div className="col-md-4">
    <input
      type="text"
      className="form-control"
      placeholder="Išči po tipu..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  <div className="col-md-4">
    <select
      className="form-select"
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
    >
      <option value="">Brez sortiranja</option>
      <option value="nazivAsc">Naziv A-Z</option>
      <option value="nazivDesc">Naziv Z-A</option>
      <option value="cenaAsc">Cena ↑</option>
      <option value="cenaDesc">Cena ↓</option>
    </select>
  </div>

</div>
    <table className="table table-striped table-bordered">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Naziv</th>
          <th>Tip</th>
          <th>Količina</th>
          <th>Cena</th>
          <th>Rok uporabe</th>
          <th>Korisnik ID</th>
          <th>Akcije</th>
        </tr>
      </thead>

      <tbody>
        {hrana.filter((item) =>
        item.tip.toLowerCase().includes(search.toLowerCase())
        ).sort((a, b) => {
          switch (sortBy) {
            case "nazivAsc":
              return a.naziv.localeCompare(b.naziv);

            case "nazivDesc":
              return b.naziv.localeCompare(a.naziv);

            case "cenaAsc":
              return Number(a.cena) - Number(b.cena);

            case "cenaDesc":
              return Number(b.cena) - Number(a.cena);

            default:
              return 0;
          }
        }).map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.naziv}</td>
            <td>{item.tip}</td>
            <td>{item.kolicina}</td>
            <td>{item.cena}</td>
            <td>
              {item.rok_uporabe ? item.rok_uporabe.substring(0,10) : ""}
            </td>
            <td>{item.korisnik_id}</td>

            <td>
              <button className="btn btn-warning btn-sm me-2"onClick={() => handleEdit(item)}>
                Uredi
              </button>

              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>
                Izbriši
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </main>
);

}