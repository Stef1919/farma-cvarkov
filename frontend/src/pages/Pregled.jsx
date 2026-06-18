import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

export default function Pregled() {

    const [pregled, setPregled] = useState([]);

    const [datum, setDatum] = useState("");
    const [diagnoza, setDiagnoza] = useState("");
    const [stanje, setStanje] = useState("");
    const [opombe, setOpombe] = useState("");

    const [peradId, setPeradId] = useState("");
    const [korisnikId, setKorisnikId] = useState("");

    const [perad, setPerad] = useState([]);
    const [korisnik, setKorisnik] = useState([]);

    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState("");

    const loadPregled = async () => {
    try {
        const res = await fetch(
        `${API_URL}/pregled`
        );

        const data = await res.json();

        if (res.ok) {
        setPregled(data.data);
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
    loadPregled();
    loadPerad();
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
        ? `${API_URL}/pregled/${editId}`
        : `${API_URL}/pregled`;

        const res = await fetch(url, {
        method,
        headers: {
            "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
            datum,
            diagnoza,
            stanje,
            opombe,
            perad_id: peradId,
            korisnik_id: korisnikId,
        }),
        });

        const data = await res.json();

        if (res.ok) {
        setMessage(editId ? "Pregled posodobljen." : "Pregled dodan.");
        setDatum("");
        setDiagnoza("");
        setStanje("");
        setOpombe("");
        setPeradId("");
        setKorisnikId("");
        setEditId(null);

        await loadPregled();
        } else {
        setMessage(data.message);
        }
    } catch (err) {
        console.error(err);
        setMessage("Napaka pri povezavi s strežnikom.");
    }
    };

    const handleEdit = (item) => {
    setDatum(item.datum ? item.datum.substring(0, 10) : "" );
    setDiagnoza(item.diagnoza);
    setStanje(item.stanje);
    setOpombe(item.opombe);
    setPeradId(item.perad_id);
    setKorisnikId(item.korisnik_id);
    setEditId(item.id);
    };

    const handleDelete = async (id) => {
    try {
        const res = await fetch(
        `${API_URL}/pregled/${id}`,
        {
            method: "DELETE",
        }
        );

        const data = await res.json();

        if (res.ok) {
        setMessage("Pregled izbrisan.");

        setPregled(
            pregled.filter(
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

    return(
        <main>
            <form onSubmit={handleSubmit}>
            <div>
                <label>Datum</label>
                <input type="date" value={datum} onChange={(e) => setDatum(e.target.value)}/>
            </div>

            <div>
                <label>Diagnoza</label>
                <input type="text" value={diagnoza} onChange={(e) => setDiagnoza(e.target.value)}/>
            </div>

            <div>
                <label>Stanje</label>
                <input type="text" value={stanje} onChange={(e) => setStanje(e.target.value)}/>
            </div>

            <div>
                <label>Opombe</label>
                <textarea value={opombe} onChange={(e) => setOpombe(e.target.value)}/>
            </div>

            <div>
                <label>Perad</label>

                <select value={peradId} onChange={(e) => setPeradId(e.target.value)}>
                <option value="">
                    Izberi perad
                </option>

                {perad.map((item) => (
                    <option key={item.id} value={item.id}>
                    {item.vrsta}
                    </option>
                ))}
                </select>
            </div>

            <div>
                <label>Korisnik</label>

                <select value={korisnikId} onChange={(e) =>setKorisnikId(e.target.value)}>
                <option value="">
                    Izberi korisnika
                </option>

                {korisnik.map((item) => (
                    <option key={item.id} value={item.id}>
                    {item.ime}
                    </option>
                ))}
                </select>
            </div>

            <button type="submit">
                {editId ? "Posodobi pregled" : "Dodaj pregled"}
            </button>
            </form>

            {message && <p>{message}</p>}

            <table border="1">
            <thead>
                <tr>
                <th>ID</th>
                <th>Datum</th>
                <th>Diagnoza</th>
                <th>Stanje</th>
                <th>Opombe</th>
                <th>Perad</th>
                <th>Korisnik</th>
                <th>Akcije</th>
                </tr>
            </thead>

            <tbody>
                {pregled.map((item) => (
                <tr key={item.id}>
                    <td>{item.id}</td>

                    <td>
                    {item.datum ? item.datum.substring(0,10) : ""}
                    </td>

                    <td>{item.diagnoza}</td>

                    <td>{item.stanje}</td>

                    <td>{item.opombe}</td>

                    <td>
                    {getPeradVrsta(item.perad_id)}
                    </td>

                    <td>
                    {getKorisnikIme(item.korisnik_id)}
                    </td>

                    <td>
                    <button onClick={() =>handleEdit(item)}>
                        Uredi
                    </button>

                    <button onClick={() =>handleDelete(item.id)}>
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