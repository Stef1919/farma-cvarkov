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

    <main>
      <h1>Korisnik</h1>

            <form onSubmit={handleSubmit}>
             <div>
                <label>Ime</label>
                <input
                    type="text"
                    value={ime}
                    onChange={(e) => setIme(e.target.value)}
                />
                </div>

                <div>
                <label>Telefon</label>
                <input
                    type="text"
                    value={telefon}
                    onChange={(e) => setTelefon(e.target.value)}
                />
                </div>

                <div>
                <label>Email</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>

                <div>
                <label>Naslov</label>
                <input
                    type="text"
                    value={naslov}
                    onChange={(e) => setNaslov(e.target.value)}
                />
                </div>

                <div>
                <label>Vloga</label>
                <select
                value={vloga}
                onChange={(e) => setVloga(e.target.value)}
                >
                <option value="">Izberi</option>
                <option value="delavec">Delavec</option>
                <option value="dostavljalec">Dostavljalec</option>
                <option value="kupec">Kupec</option>
                <option value="admin">Admin</option>
                </select>
                </div>               





                <button type="submit">
                {editId ? "Posodobi korisnika" : "Dodaj korisnika"}
                </button>
           </form>


      {message && <p>{message}</p>}

      <table border="1">
        <thead>
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