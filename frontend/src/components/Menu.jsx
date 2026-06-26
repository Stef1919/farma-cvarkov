import { Link } from "react-router";

export default function Menu() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container">

    <div className="navbar-nav mx-auto align-items-center">

      <Link className="nav-link" to="/perad">Perad</Link>
      <Link className="nav-link" to="/hrana">Hrana</Link>
      <Link className="nav-link" to="/korisnik">Korisnik</Link>
      <Link className="nav-link" to="/hrana-perad">HranaPerad</Link>
      <Link className="nav-link" to="/proizvodnja">Proizvodnja</Link>
      <Link className="nav-link" to="/pregled">Pregled</Link>
      <Link className="nav-link" to="/sertifikat">Sertifikat</Link>
      <Link className="nav-link" to="/prodaja">Prodaja</Link>

      {!user ? (
        <>
          <Link className="nav-link" to="/login">Login</Link>
          <Link className="nav-link" to="/register">Register</Link>
        </>
      ) : (
        <>
          <span className="nav-link text-white">
            Pozdravljen {user.ime}
          </span>

          <button
            className="btn btn-outline-light btn-sm ms-2"
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </>
      )}

    </div>

  </div>
</nav>
  );
}