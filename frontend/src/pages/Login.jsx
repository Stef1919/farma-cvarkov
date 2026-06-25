import { useState } from "react";
import { API_URL } from "../config/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [geslo, setGeslo] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    setMessage("");

    try {
      const res = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
        },
          body: JSON.stringify({
            email,
            geslo,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));

        setMessage("Prijava uspešna.");
        setEmail("");
        setGeslo("");

        window.location.href = "/";
      } else {
        setMessage(data.message || "Prijava ni uspela.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Napaka pri prijavi.");
    }
  }

  return (
    <main>
      <section>
        <h1>Prijava</h1>

        <form onSubmit={handleLogin}>
          <div>
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}/>
          </div>

          <div>
            <label>Geslo</label>

            <input
              type="password"
              value={geslo}
              onChange={(event) => setGeslo(event.target.value)}/>
          </div>

          <button type="submit">
            Prijava
          </button>
        </form>

        {message && <p>{message}</p>}
      </section>
    </main>
  );
}