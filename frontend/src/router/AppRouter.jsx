import { BrowserRouter, Routes, Route } from "react-router";

import Perad from "../pages/Perad";
import Hrana from "../pages/Hrana";
import Korisnik from "../pages/Korisnik";
import HranaPerad from "../pages/HranaPerad";
import Proizvodnja from "../pages/Proizvodnja";
import Pregled from "../pages/Pregled";
import Sertifikat from "../pages/Sertifikat";
import Prodaja from "../pages/Prodaja";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Menu from "../components/Menu";
import Dashboard from "../pages/Dashboard";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/perad" element={<Perad />} />
        <Route path="/hrana" element={<Hrana />} />
        <Route path="/korisnik" element={<Korisnik />} />
        <Route path="/hrana-perad" element={<HranaPerad />} />
        <Route path="/proizvodnja" element={<Proizvodnja />} />
        <Route path="/pregled" element={<Pregled />} />
        <Route path="/sertifikat" element={<Sertifikat />} />
        <Route path="/prodaja" element={<Prodaja />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}