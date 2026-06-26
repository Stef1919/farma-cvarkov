import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

export default function Proizvodnja(){

    const [proizvodnja, setProizvodnja] = useState([]);

    const [datum, setDatum] = useState("");
    const [tip, setTip] = useState("");
    const [kolicina, setKolicina] = useState("");
    const [opombe, setOpombe] = useState("");
    const [peradId, setPeradId] = useState("");
    const [korisnikId, setKorisnikId] = useState("");
    const [perad, setPerad] = useState([]);
    const [korisnik, setKorisnik] = useState([]);
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState("");

    const loadProizvodnja = async () => {

    const res = await fetch(`${API_URL}/proizvodnja`);
    const data = await res.json();

    if (res.ok) {
        setProizvodnja(data.data);
    }
    };

    const loadPerad = async () => {

    const res = await fetch(`${API_URL}/perad`);
    const data = await res.json();

    if (res.ok) {
        setPerad(data.data);
    }

    };

    const loadKorisnik = async () => {

    const res = await fetch(`${API_URL}/korisnik`);
    const data = await res.json();

    if (res.ok) {
        setKorisnik(data.data);
    }

    };

    useEffect(() => {

    loadProizvodnja();
    loadPerad();
    loadKorisnik();

    }, []);

    const getPeradVrsta = (id) => {

    const found = perad.find(
        (item) => item.id === id
    );

    return found ? found.vrsta : id;

    };

    const getKorisnikIme = (id) => {

    const found = korisnik.find(
        (item) => item.id === id
    );

    return found ? found.ime : id;

    };

    const handleSubmit = async (event) => {

    event.preventDefault();

    setMessage("");

    try {
        const method = editId ? "PUT" : "POST";

        const url = editId ? `${API_URL}/proizvodnja/${editId}` : `${API_URL}/proizvodnja`;

        const res = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            datum,
            tip,
            kolicina,
            opombe,
            perad_id: peradId,
            korisnik_id: korisnikId,
        }),
        });

        const data = await res.json();

        if (res.ok) {
        setMessage(
            editId ? "Proizvodnja uspešno posodobljena." : "Proizvodnja uspešno dodana."
        );

        setDatum("");
        setTip("");
        setKolicina("");
        setOpombe("");
        setPeradId("");
        setKorisnikId("");

        setEditId(null);

        await loadProizvodnja();
        } else {
        setMessage(data.message);
        }
    } catch (err) {
        console.error(err);
        setMessage("Napaka pri povezavi s strežnikom.");
    }
    };

    const handleEdit = (item) => {
    setDatum(item.datum?.split("T")[0]);

    setTip(item.tip);
    setKolicina(item.kolicina);
    setOpombe(item.opombe);

    setPeradId(item.perad_id);
    setKorisnikId(item.korisnik_id);

    setEditId(item.id);
    };

    const handleDelete = async (id) => {
    try {
        const res = await fetch(
        `${API_URL}/proizvodnja/${id}`,
        {
            method: "DELETE",
        }
        );

        const data = await res.json();

        if (res.ok) {
        setMessage("Proizvodnja izbrisana.");

        setProizvodnja(
            proizvodnja.filter(
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

    return(
    <main className="container mt-4">
    <h1 className="mb-4">Proizvodnja</h1>

    <div className="card mb-4">
        <div className="card-body">
        <form onSubmit={handleSubmit}>
            <div className="row">

            <div className="col-md-6 mb-3">
                <label className="form-label">Datum</label>
                <input
                className="form-control"
                type="date"
                value={datum}
                onChange={(e) => setDatum(e.target.value)}
                />
            </div>

            <div className="col-md-6 mb-3">
                <label className="form-label">Tip</label>
                <select
                className="form-select"
                value={tip}
                onChange={(e) => setTip(e.target.value)}>
                <option value="">Izberi</option>
                <option value="perad">Perad</option>
                <option value="jajca">Jajca</option>
                </select>
            </div>

            <div className="col-md-6 mb-3">
                <label className="form-label">Količina</label>
                <input
                className="form-control"
                type="number"
                value={kolicina}
                onChange={(e) => setKolicina(e.target.value)}/>
            </div>

            <div className="col-md-6 mb-3">
                <label className="form-label">Perad</label>
                <select
                className="form-select"
                value={peradId}
                onChange={(e) => setPeradId(e.target.value)}>
                <option value="">Izberi perad</option>

                {perad.map((item) => (
                    <option key={item.id} value={item.id}>
                    {item.vrsta}
                    </option>
                ))}
                </select>
            </div>

            <div className="col-md-6 mb-3">
                <label className="form-label">Korisnik</label>
                <select
                className="form-select"
                value={korisnikId}
                onChange={(e) => setKorisnikId(e.target.value)}>
                <option value="">Izberi korisnika</option>

                {korisnik.map((item) => (
                    <option key={item.id} value={item.id}>
                    {item.ime}
                    </option>
                ))}
                </select>
            </div>

            <div className="col-12 mb-3">
                <label className="form-label">Opombe</label>
                <textarea
                className="form-control"
                rows="3"
                value={opombe}
                onChange={(e) => setOpombe(e.target.value)}/>
            </div>

            </div>

            <button
            type="submit"
            className="btn btn-primary">
            {editId ? "Posodobi proizvodnjo" : "Dodaj proizvodnjo"}
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
            <th>Datum</th>
            <th>Tip</th>
            <th>Količina</th>
            <th>Opombe</th>
            <th>Perad</th>
            <th>Korisnik</th>
            <th>Akcije</th>
            </tr>
        </thead>

        <tbody>
            {proizvodnja.map((item) => (
            <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                {item.datum?.split("T")[0]}
                </td>

                <td>{item.tip}</td>

                <td>{item.kolicina}</td>

                <td>{item.opombe}</td>

                <td>
                {getPeradVrsta(item.perad_id)}
                </td>

                <td>
                {getKorisnikIme(item.korisnik_id)}
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
    );
}