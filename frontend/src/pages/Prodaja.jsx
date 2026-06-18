import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

export default function Prodaja(){

const [prodaja, setProdaja] = useState([]);
const [datum, setDatum] = useState("");
const [kolicina, setKolicina] = useState("");
const [skupnaCena, setSkupnaCena] = useState("");
const [nacinPlacila, setNacinPlacila] = useState("");
const [status, setStatus] = useState("");
const [proizvodnjaId, setProizvodnjaId] = useState("");
const [korisnikId, setKorisnikId] = useState("");
const [proizvodnja, setProizvodnja] = useState([]);
const [korisnik, setKorisnik] = useState([]);
const [editId, setEditId] = useState(null);
const [message, setMessage] = useState("");

const loadProdaja = async () => {
  try {
    const res = await fetch(
      `${API_URL}/prodaja`
    );

    const data = await res.json();

    if (res.ok) {
      setProdaja(data.data);
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

const loadKorisnik = async () => {
  try {
    const res = await fetch(
      `${API_URL}/korisnik`
    );

    const data = await res.json();

    if (res.ok) {
      setKorisnik(data.data);
    }
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  loadProdaja();
  loadProizvodnja();
  loadKorisnik();
}, []);

const handleSubmit = async (event) => {
  event.preventDefault();

  setMessage("");

  try {
    const method = editId
      ? "PUT"
      : "POST";

    const url = editId
      ? `${API_URL}/prodaja/${editId}`
      : `${API_URL}/prodaja`;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        datum,
        kolicina,
        skupna_cena: skupnaCena,
        nacin_placila: nacinPlacila,
        status,
        proizvodnja_id: proizvodnjaId,
        korisnik_id: korisnikId,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(
        editId
          ? "Prodaja posodobljena."
          : "Prodaja dodana."
      );

      setDatum("");
      setKolicina("");
      setSkupnaCena("");
      setNacinPlacila("");
      setStatus("");
      setProizvodnjaId("");
      setKorisnikId("");

      setEditId(null);

      await loadProdaja();
    } else {
      setMessage(data.message);
    }
  } catch (err) {
    console.error(err);
    setMessage("Napaka pri povezavi s strežnikom.");
  }
};

const handleEdit = (item) => {
  setDatum(item.datum ? item.datum.substring(0, 10) : "");
  setKolicina(item.kolicina);
  setSkupnaCena(item.skupna_cena);
  setNacinPlacila(item.nacin_placila);
  setStatus(item.status);
  setProizvodnjaId(item.proizvodnja_id);
  setKorisnikId(item.korisnik_id);
  setEditId(item.id);
};

const handleDelete = async (id) => {
  try {
    const res = await fetch(
      `${API_URL}/prodaja/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (res.ok) {
      setMessage("Prodaja izbrisana.");

      setProdaja(prodaja.filter((item) => item.id !== id));
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

  return found ? `${found.tip} (${found.kolicina})` : id;
};

const getKorisnik = (id) => {
  const found = korisnik.find((item) => item.id === id);

  return found ? found.ime : id;
};

return(
<main>

    <form onSubmit={handleSubmit}>
    <div>
        <label>Datum</label>

        <input type="date" value={datum} onChange={(e) => setDatum(e.target.value)}/>
    </div>

    <div>
        <label>Količina</label>

        <input type="number" value={kolicina} onChange={(e) => setKolicina(e.target.value)}/>
    </div>

    <div>
        <label>Skupna cena</label>

        <input type="number" step="0.01" value={skupnaCena} onChange={(e) => setSkupnaCena(e.target.value)}/>
    </div>

    <div>
        <label>Način plačila</label>

        <input type="text" value={nacinPlacila} onChange={(e) => setNacinPlacila(e.target.value)}/>
    </div>

    <div>
        <label>Status</label>

        <input type="text" value={status} onChange={(e) => setStatus(e.target.value)}/>
    </div>

    <div>
        <label>Proizvodnja</label>

        <select value={proizvodnjaId} onChange={(e) => setProizvodnjaId(e.target.value)}>
        <option value="">
            Izberi proizvodnjo
        </option>

        {proizvodnja.map(
            (item) => (
            <option key={item.id} value={item.id} >
                {item.tip} ({item.kolicina})
            </option>
            )
        )}
        </select>
    </div>

    <div>
        <label>Korisnik</label>

        <select value={korisnikId} onChange={(e) => setKorisnikId(e.target.value)}>
        <option value="">
            Izberi korisnika
        </option>

        {korisnik.map(
            (item) => (
            <option key={item.id} value={item.id}>
                {item.ime}
            </option>
            )
        )}
        </select>
    </div>

    <button type="submit">
        {editId ? "Posodobi prodajo" : "Dodaj prodajo"}
    </button>
    </form>

    {message && <p>{message}</p>}

    <table border="1">
    <thead>
        <tr>
        <th>ID</th>
        <th>Datum</th>
        <th>Količina</th>
        <th>Skupna cena</th>
        <th>Način plačila</th>
        <th>Status</th>
        <th>Proizvodnja</th>
        <th>Korisnik</th>
        <th>Akcije</th>
        </tr>
    </thead>

    <tbody>
        {prodaja.map((item) => (
        <tr key={item.id}>
            <td>{item.id}</td>

            <td>
            {item.datum ? item.datum.substring(0,10) : ""}
            </td>

            <td>{item.kolicina}</td>

            <td>
            {item.skupna_cena}
            </td>

            <td>
            {item.nacin_placila}
            </td>

            <td>{item.status}</td>

            <td>
            {getProizvodnja(item.proizvodnja_id)}
            </td>

            <td>
            {getKorisnik(item.korisnik_id)}
            </td>

            <td>
            <button onClick={() => handleEdit(item)}>
                Uredi
            </button>

            <button onClick={() => handleDelete(item.id)}>
                Izbriši
            </button>
            </td>
        </tr>
        ))}
    </tbody>
    </table>

</main>
)

}