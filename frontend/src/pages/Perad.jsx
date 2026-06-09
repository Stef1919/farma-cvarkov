import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

export default function Perad() {
  const [perad, setPerad] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
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

    loadPerad();
  }, []);

  return (
    <main>
      <h1>Perad</h1>

      {message ? <p>{message}</p> : undefined}

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vrsta</th>
            <th>Starost</th>
            <th>Spol</th>
            <th>Količina</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}