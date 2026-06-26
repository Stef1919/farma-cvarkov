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
  <main className="container mt-4">
    <h1 className="mb-4">Perad</h1>

    <div className="card mb-4">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">
                Vrsta
              </label>

              <input
                className="form-control"
                type="text"
                value={vrsta}
                onChange={(event) => setVrsta(event.target.value)}/>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Starost
              </label>

              <input
                className="form-control"
                type="number"
                value={starost}
                onChange={(event) => setStarost(event.target.value)}/>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Spol
              </label>

              <select
                className="form-select"
                value={spol}
                onChange={(event) => setSpol(event.target.value)}>
                <option value="">Izberi</option>
                <option value="moski">
                  Moški
                </option>
                <option value="zenski">
                  Ženski
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
                onChange={(event) => setKolicina(event.target.value)}/>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary">
            {editId ? "Posodobi perad" : "Dodaj perad"}
          </button>
        </form>
      </div>
    </div>

    {message && (
      <div className="alert alert-info"> {message} </div>)}

    <div className="table-responsive">
      <table className="table table-striped table-bordered table-hover align-middle">
        <thead className="table-dark">
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