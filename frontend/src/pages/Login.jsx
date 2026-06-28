import { useState } from "react";
import { Link } from "react-router";
import { API_URL } from "../config/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [geslo, setGeslo] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    setMessage("");

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          geslo,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        setMessage("Prijava uspešna.");

        setEmail("");
        setGeslo("");

        window.location.href = "/dashboard";
      } else {
        setMessage(data.message || "Prijava ni uspela.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Napaka pri prijavi.");
    }
  }

  return (
    <main className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow" style={{ width: "420px" }}>
        <div className="card-body">

          <h2 className="text-center mb-4">
            Prijava
          </h2>

          <form onSubmit={handleLogin}>

            <div className="mb-3">
              <label className="form-label">
                Email
              </label>

              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Geslo
              </label>

              <input
                className="form-control"
                type="password"
                value={geslo}
                onChange={(event) =>
                  setGeslo(event.target.value)
                }
                required
              />
            </div>

            <button
              className="btn btn-primary w-100"
              type="submit"
            >
              Prijava
            </button>

          </form>

          {message && (
            <div className="alert alert-info mt-3">
              {message}
            </div>
          )}

          <hr />

          <p className="text-center mb-0">
            Še nimaš računa?{" "}
            <Link to="/register">
              Registriraj se
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}