import { useState } from "react";
import { API_URL } from "../config/api";

export default function Register() {
  const [ime, setIme] = useState("");
  const [telefon, setTelefon] = useState("");
  const [email, setEmail] = useState("");
  const [naslov, setNaslov] = useState("");
  const [vloga, setVloga] = useState("");
  const [geslo, setGeslo] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister(event) {
    event.preventDefault();

    setMessage("");

    try {
      const res = await fetch(
        `${API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ime,
            telefon,
            email,
            naslov,
            vloga,
            geslo,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("Registracija uspešna.");
        setIme("");
        setTelefon("");
        setEmail("");
        setNaslov("");
        setVloga("");
        setGeslo("");
      } else {
        setMessage(
          data.message || "Registracija ni uspela."
        );
      }
    } catch (err) {
      console.error(err);
      setMessage("Napaka pri registraciji.");
    }
  }

  return (
    <main>
      <section>
        <h1>Registracija</h1>

        <form onSubmit={handleRegister}>
          <div>
            <label>Ime</label>
            <input
              type="text"
              value={ime}
              onChange={(event) => setIme(event.target.value)}
            />
          </div>

          <div>
            <label>Telefon</label>
            <input
              type="text"
              value={telefon}
              onChange={(event) => setTelefon(event.target.value)}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div>
            <label>Naslov</label>
            <input
              type="text"
              value={naslov}
              onChange={(event) => setNaslov(event.target.value)}/>
          </div>

          <div>
            <label>Vloga</label>

            <select
              value={vloga}
              onChange={(event) => setVloga(event.target.value)}>
              <option value="">
                Izberi
              </option>

              <option value="admin">
                Admin
              </option>

              <option value="delavec">
                Delavec
              </option>

              <option value="kupec">
                Kupec
              </option>

              <option value="dostavljalec">
                Dostavljalec
              </option>
            </select>
          </div>

          <div>
            <label>Geslo</label>
            <input
              type="password"
              value={geslo}
              onChange={(event) => setGeslo(event.target.value)}/>
          </div>

          <button type="submit">
            Registracija
          </button>
        </form>

        {message && <p>{message}</p>}
      </section>
    </main>
  );
}