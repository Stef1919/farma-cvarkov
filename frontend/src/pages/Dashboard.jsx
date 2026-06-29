import { API_URL } from "../config/api";
import { useState, useEffect } from "react";

export default function Dashboard(){

    const user = JSON.parse(
        localStorage.getItem("user")
    );

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

    async function getCount(endpoint) {
    const res = await fetch(`${API_URL}/${endpoint}`);
    const data = await res.json();
    return data.data.length;
    }

    async function loadStats() {
    try {
        setStats({
        perad: await getCount("perad"),
        hrana: await getCount("hrana"),
        proizvodnja: await getCount("proizvodnja"),
        prodaja: await getCount("prodaja"),
        pregled: await getCount("pregled"),
        sertifikat: await getCount("sertifikat"),
        korisnik: await getCount("korisnik"),
        });
    } catch (err) {
        console.error(err);
    }
    }

    return(

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