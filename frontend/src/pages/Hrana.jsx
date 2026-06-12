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
  setRokUporabe(item.rok_uporabe?.split("T")[0]);
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

        setHrana(
        hrana.filter(
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

    <main>
      <h1>Hrana</h1>

            <form onSubmit={handleSubmit}>
             <div>
                <label>Naziv</label>
                <input
                    type="text"
                    value={naziv}
                    onChange={(e) => setNaziv(e.target.value)}
                />
                </div>

                <div>
                <label>Tip</label>
                <select
                    value={tip}
                    onChange={(e) => setTip(e.target.value)}
                >
                    <option value="">Izberi</option>
                    <option value="psenica">Pšenica</option>
                    <option value="koruza">Koruza</option>
                    <option value="vitamin">Vitamin</option>
                </select>
                </div>

                <div>
                <label>Količina</label>
                <input
                    type="number"
                    value={kolicina}
                    onChange={(e) => setKolicina(e.target.value)}
                />
                </div>

                <div>
                <label>Cena</label>
                <input
                    type="number"
                    step="0.01"
                    value={cena}
                    onChange={(e) => setCena(e.target.value)}
                />
            </div>

                <div>
                <label>Rok uporabe</label>
                <input
                    type="date"
                    value={rokUporabe}
                    onChange={(e) => setRokUporabe(e.target.value)}
                />
                </div>

                <div>
                <label>Korisnik ID</label>
                <input
                    type="number"
                    value={korisnikId}
                    onChange={(e) => setKorisnikId(e.target.value)}
                />
                </div>
                <button type="submit">
                {editId ? "Posodobi hrano" : "Dodaj hrano"}
                </button>
           </form>


      {message && <p>{message}</p>}

      <table border="1">
        <thead>
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
        {hrana.map((item) => (
            <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.naziv}</td>
            <td>{item.tip}</td>
            <td>{item.kolicina}</td>
            <td>{item.cena}</td>
            <td>{item.rok_uporabe}</td>
            <td>{item.korisnik_id}</td>

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
  );

}