import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

export default function Perad() {
  const [perad, setPerad] = useState([]);
  const [message, setMessage] = useState("");
  const [vrsta, setVrsta] = useState("");
  const [starost, setStarost] = useState("");
  const [spol, setSpol] = useState("");
  const [kolicina, setKolicina] = useState("");
  const [editId, setEditId] = useState(null);

  const loadPerad = async () => {
      try {
        const res = await fetch(`${API_URL}/perad`);

        const data = await res.json();

        if (res.ok) {
          setPerad(data.data);
        } else {
          setMessage("Napaka pri nalaganju podatkov.");
        }
      } catch (err) {
        console.error(err);
        setMessage("Napaka pri povezavi s strežnikom.");
      }
    };

  useEffect(() => {
    loadPerad();
    }, []);

    const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");

    try {

      const method = editId ? "PUT" : "POST";

      const url = editId ? `${API_URL}/perad/${editId}` : `${API_URL}/perad`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vrsta,
          starost,
          spol,
          kolicina,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage( editId ? "Perad uspešno posodobljena." : "Perad uspešno dodana."
        );

        setVrsta("");
        setStarost("");
        setSpol("");
        setKolicina("");
        setEditId(null);

        await loadPerad();
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("Napaka pri povezavi s strežnikom.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${API_URL}/perad/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("Perad izbrisana.");

        setPerad(
          perad.filter(
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

    const handleEdit = (item) => {
    setVrsta(item.vrsta);
    setStarost(item.starost);
    setSpol(item.spol);
    setKolicina(item.kolicina);
    setEditId(item.id);
  };

  return (

    <main>
      <h1>Perad</h1>

            <form onSubmit={handleSubmit}>
              <div>
                <label>Vrsta</label>
                <input
                  type="text"
                  value={vrsta}
                  onChange={(event) =>
                    setVrsta(event.target.value)
                  }
                />
              </div>

              <div>
                <label>Starost</label>
                <input
                  type="number"
                  value={starost}
                  onChange={(event) =>
                    setStarost(event.target.value)
                  }
                />
              </div>

              <div>
                <label>Spol</label>

                <select
                  value={spol}
                  onChange={(event) =>
                    setSpol(event.target.value)
                  }
                >
                  <option value="">Izberi</option>
                  <option value="moski">Moški</option>
                  <option value="zenski">Ženski</option>
                </select>
              </div>

              <div>
                <label>Količina</label>
                <input
                  type="number"
                  value={kolicina}
                  onChange={(event) =>
                    setKolicina(event.target.value)
                  }
                />
              </div>

              <button type="submit">
                {editId ? "Posodobi perad" : "Dodaj perad"}
              </button>
           </form>


      {message && <p>{message}</p>}

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vrsta</th>
            <th>Starost</th>
            <th>Spol</th>
            <th>Količina</th>
            <th>Akcije</th>
          </tr>
        </thead>

        <tbody>
          {perad.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.vrsta}</td>
              <td>{item.starost}</td>
              <td>{item.spol}</td>
              <td>{item.kolicina}</td>
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