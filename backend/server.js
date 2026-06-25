import "dotenv/config";
import express from "express";
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

app.use(cors());
app.use(express.json());
app.use("/api/perad", peradRoutes);
app.use("/api/hrana", hranaRoutes);
app.use("/api/korisnik", korisnikRoutes);
app.use("/api/hrana-perad", hranaPeradRoutes);
app.use("/api/proizvodnja", proizvodnjaRoutes);
app.use("/api/pregled", pregledRoutes);
app.use("/api/sertifikat", sertifikatRoutes);
app.use("/api/prodaja",prodajaRoutes);
app.use("/api/auth",authRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    database: "connected",
  });
});

const PORT = process.env.PORT || 1312;

app.listen(PORT, () => {
  console.log(`Server teče na portu ${PORT}`);
});