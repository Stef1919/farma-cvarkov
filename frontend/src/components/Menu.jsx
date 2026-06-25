import { Link } from "react-router";

export default function Menu() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="nav-link" to="/perad">Perad</Link>
      <Link className="navbar-brand" to="/hrana">Hrana</Link>
      <Link to="/korisnik">Korisnik</Link>
      <Link to="/hrana-perad">HranaPerad</Link>
      <Link to="/proizvodnja">Proizvodnja</Link>
      <Link to="/pregled">Pregled</Link>
      <Link to="/sertifikat">Sertifikat</Link>
      <Link to="/prodaja">Prodaja</Link>

      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {user && (
        <>
          <span>
            Pozdravljen {user.ime}
          </span>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
}