import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import peradRoutes from "./routes/perad.routes.js";
import hranaRoutes from "./routes/hrana.routes.js";
import korisnikRoutes from "./routes/korisnik.routes.js";
import hranaPeradRoutes from "./routes/hranaPerad.routes.js";
import proizvodnjaRoutes from "./routes/proizvodnja.routes.js";
import pregledRoutes from "./routes/pregled.routes.js";
import sertifikatRoutes from "./routes/sertifikat.routes.js";
import prodajaRoutes from "./routes/prodaja.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use("/perad", peradRoutes);
app.use("/hrana", hranaRoutes);
app.use("/korisnik", korisnikRoutes);
app.use("/hrana-perad", hranaPeradRoutes);
app.use("/proizvodnja", proizvodnjaRoutes);
app.use("/pregled", pregledRoutes);
app.use("/sertifikat", sertifikatRoutes);
app.use("/prodaja",prodajaRoutes);
app.use("/auth",authRoutes);

app.use(express.static(path.join(__dirname, "dist")));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 30069;

app.listen(PORT, () => {
  console.log(`Server teče na portu ${PORT}`);
});