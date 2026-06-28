import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

export default function Dashboard() {

  const [stats, setStats] = useState({
    perad: 0,
    hrana: 0,
    proizvodnja: 0,
    prodaja: 0,
    pregled: 0,
    sertifikat: 0,
    korisnik: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const [
        perad,
        hrana,
        proizvodnja,
        prodaja,
        pregled,
        sertifikat,
        korisnik
      ] = await Promise.all([
        fetch(`${API_URL}/perad`).then(r => r.json()),
        fetch(`${API_URL}/hrana`).then(r => r.json()),
        fetch(`${API_URL}/proizvodnja`).then(r => r.json()),
        fetch(`${API_URL}/prodaja`).then(r => r.json()),
        fetch(`${API_URL}/pregled`).then(r => r.json()),
        fetch(`${API_URL}/sertifikat`).then(r => r.json()),
        fetch(`${API_URL}/korisnik`).then(r => r.json())
      ]);

      setStats({
        perad: perad.data.length,
        hrana: hrana.data.length,
        proizvodnja: proizvodnja.data.length,
        prodaja: prodaja.data.length,
        pregled: pregled.data.length,
        sertifikat: sertifikat.data.length,
        korisnik: korisnik.data.length
      });

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className="container mt-4">

      <div className="row g-4">

        <div className="col-md-3">
          <div className="card text-bg-primary shadow">
            <div className="card-body text-center">
              <h5>Perad</h5>
              <h1>{stats.perad}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-bg-success shadow">
            <div className="card-body text-center">
              <h5>Hrana</h5>
              <h1>{stats.hrana}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-bg-warning shadow">
            <div className="card-body text-center">
              <h5>Proizvodnja</h5>
              <h1>{stats.proizvodnja}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-bg-danger shadow">
            <div className="card-body text-center">
              <h5>Prodaja</h5>
              <h1>{stats.prodaja}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-bg-info shadow">
            <div className="card-body text-center">
              <h5>Pregledi</h5>
              <h1>{stats.pregled}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-bg-secondary shadow">
            <div className="card-body text-center">
              <h5>Sertifikati</h5>
              <h1>{stats.sertifikat}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-bg-dark shadow">
            <div className="card-body text-center">
              <h5>Uporabniki</h5>
              <h1>{stats.korisnik}</h1>
            </div>
          </div>
        </div>

      </div>

    </main>
  );
}