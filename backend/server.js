import "dotenv/config";
import express from "express";
import peradRoutes from "./routes/perad.routes.js";
import hranaRoutes from "./routes/hrana.routes.js";
import korisnikRoutes from "./routes/korisnik.routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/perad", peradRoutes);
app.use("/api/hrana", hranaRoutes);
app.use("/api/korisnik", korisnikRoutes);

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