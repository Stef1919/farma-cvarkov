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
  <main className="container d-flex justify-content-center align-items-center vh-100">
    <div className="card shadow" style={{ width: "500px" }}>
      <div className="card-body">
        <h2 className="card-title text-center mb-4">
          Registracija
        </h2>

        <form onSubmit={handleRegister}>
          <div className="row">

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Ime
              </label>

              <input
                className="form-control"
                type="text"
                value={ime}
                onChange={(event) => setIme(event.target.value)}/>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Telefon
              </label>

              <input
                className="form-control"
                type="text"
                value={telefon}
                onChange={(event) => setTelefon(event.target.value)}/>
            </div>

            <div className="col-12 mb-3">
              <label className="form-label">
                Email
              </label>

              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}/>
            </div>

            <div className="col-12 mb-3">
              <label className="form-label">
                Naslov
              </label>

              <input
                className="form-control"
                type="text"
                value={naslov}
                onChange={(event) => setNaslov(event.target.value)}/>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Vloga
              </label>

              <select
                className="form-select"
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

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Geslo
              </label>

              <input
                className="form-control"
                type="password"
                value={geslo}
                onChange={(event) => setGeslo(event.target.value)}/>
            </div>

          </div>

          <button
            type="submit"
            className="btn btn-success w-100">
            Registracija
          </button>
        </form>

        {message && (
          <div className="alert alert-info mt-3 mb-0">
            {message}
          </div>
        )}
      </div>
    </div>
  </main>
  );
}