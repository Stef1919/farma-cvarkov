import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

export default function HranaPerad(){

    const [hranaPerad, setHranaPerad] = useState([]);
    const [hrana, setHrana] = useState([]);
    const [hranaId, setHranaId] = useState("");
    const [perad, setPerad] = useState([]);
    const [peradId, setPeradId] = useState("");
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState("");

    const loadHranaPerad = async () => {
    try {
        const res = await fetch(
        `${API_URL}/hrana-perad`
        );

        const data = await res.json();

        if (res.ok) {
        setHranaPerad(data.data);
        }
    } catch (err) {
        console.error(err);
    }
    };

    const loadHrana = async () => {
    try {
        const res = await fetch(
        `${API_URL}/hrana`
        );

        const data = await res.json();

        if (res.ok) {
        setHrana(data.data);
        }
    } catch (err) {
        console.error(err);
    }
    };

    const loadPerad = async () => {
    try {
        const res = await fetch(
        `${API_URL}/perad`
        );

        const data = await res.json();

        if (res.ok) {
        setPerad(data.data);
        }
    } catch (err) {
        console.error(err);
    }
    };

    useEffect(() => {
    loadHranaPerad();
    loadHrana();
    loadPerad();
    }, []);
    const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");

    try {
        const method = editId
        ? "PUT"
        : "POST";

        const url = editId
        ? `${API_URL}/hrana-perad/${editId}`
        : `${API_URL}/hrana-perad`;

        const res = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            hrana_id: hranaId,
            perad_id: peradId,
        }),
        });

        const data = await res.json();

        if (res.ok) {
        setMessage(
            editId
            ? "Povezava posodobljena."
            : "Povezava dodana."
        );

        setHranaId("");
        setPeradId("");
        setEditId(null);

        await loadHranaPerad();
        } else {
        setMessage(data.message);
        }
    } catch (err) {
        console.error(err);
        setMessage(
        "Napaka pri povezavi s strežnikom."
        );
    }
    };

    const handleEdit = (item) => {
    setHranaId(item.hrana_id);
    setPeradId(item.perad_id);
    setEditId(item.id);
    };

    const handleDelete = async (id) => {
    try {
        const res = await fetch(
        `${API_URL}/hrana-perad/${id}`,
        {
            method: "DELETE",
        }
        );

        const data = await res.json();

        if (res.ok) {
        setMessage("Povezava izbrisana.");

        setHranaPerad(
            hranaPerad.filter(
            (item) => item.id !== id
            )
        );
        } else {
        setMessage(data.message);
        }
    } catch (err) {
        console.error(err);
        setMessage(
        "Napaka pri povezavi s strežnikom."
        );
    }
    };

    const getHranaNaziv = (id) => {
    const found = hrana.find(
        (item) => item.id === id
    );

    return found ? found.naziv : id;
    };

    const getPeradVrsta = (id) => {
    const found = perad.find(
        (item) => item.id === id
    );

    return found ? found.vrsta : id;
    };

return (
  <main className="container mt-4">
    <h1 className="mb-4">HranaPerad</h1>

    <div className="card mb-4">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">
                Hrana
              </label>

              <select
                className="form-select"
                value={hranaId}
                onChange={(event) => setHranaId(event.target.value)}>
                <option value="">
                  Izberi hrano
                </option>

                {hrana.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}>
                    {item.naziv}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Perad
              </label>

              <select
                className="form-select"
                value={peradId}
                onChange={(event) => setPeradId(event.target.value)}>
                <option value="">
                  Izberi perad
                </option>

                {perad.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}>
                    {item.vrsta}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary">
            {editId ? "Posodobi povezavo" : "Dodaj povezavo"}
          </button>
        </form>
      </div>
    </div>

    {message && (<div className="alert alert-info"> {message} </div>)}

    <table className="table table-striped table-bordered">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Hrana</th>
          <th>Perad</th>
          <th>Akcije</th>
        </tr>
      </thead>

      <tbody>
        {hranaPerad.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>

            <td>
              {getHranaNaziv(item.hrana_id)}
            </td>

            <td>
              {getPeradVrsta(item.perad_id)}
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
  </main>
);
        

}