import { Link } from "react-router";

export default function Menu() {
  const userString = localStorage.getItem("user");

  const user =
    userString && userString !== "undefined"
      ? JSON.parse(userString)
      : null;

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        <div className="navbar-nav mx-auto align-items-center">

          <Link className="nav-link" to="/dashboard">
            Domov
          </Link>

          <Link className="nav-link" to="/perad">
            Perad
          </Link>

          <Link className="nav-link" to="/hrana">
            Hrana
          </Link>

          <Link className="nav-link" to="/korisnik">
            Korisnik
          </Link>

          <Link className="nav-link" to="/hrana-perad">
            Hrana-Perad
          </Link>

          <Link className="nav-link" to="/proizvodnja">
            Proizvodnja
          </Link>

          <Link className="nav-link" to="/pregled">
            Pregled
          </Link>

          <Link className="nav-link" to="/sertifikat">
            Sertifikat
          </Link>

          <Link className="nav-link" to="/prodaja">
            Prodaja
          </Link>

          <span className="text-white ms-4 me-2">
            Pozdravljen, <strong>{user.ime}</strong>
          </span>

          <button
            className="btn btn-outline-light btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}