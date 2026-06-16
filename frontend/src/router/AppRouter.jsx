import { BrowserRouter, Routes, Route } from "react-router";

import Perad from "../pages/Perad";
import Hrana from "../pages/Hrana";
import Korisnik from "../pages/Korisnik";
import HranaPerad from "../pages/HranaPerad";
import Proizvodnja from "../pages/Proizvodnja";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Perad />} />
        <Route path="/perad" element={<Perad />} />
        <Route path="/hrana" element={<Hrana />} />
        <Route path="/korisnik" element={<Korisnik />} />
        <Route path="/hrana-perad" element={<HranaPerad />} />
        <Route path="/proizvodnja" element={<Proizvodnja />} />
      </Routes>
    </BrowserRouter>
  );
}