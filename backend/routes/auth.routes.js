import { Router } from "express";

import {
  authKorisnik,
  createKorisnik,
} from "../db/database.js";

const router = Router();

const loginUser = async (req, res, next) => {
  try {
    let { email, geslo } = req.body;

    email = email?.trim();
    geslo = geslo?.trim();

    if (!email || !geslo) {
      return res.status(400).json({
        success: false,
        message: "Email in geslo sta obvezna.",
      });
    }

    const queryResult = await authKorisnik(email);

    if (queryResult.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Uporabnik ne obstaja.",
      });
    }

    const user = queryResult[0];

    if (user.geslo !== geslo) {
      return res.status(401).json({
        success: false,
        message: "Napačno geslo.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Prijava uspešna.",
      user: {
        id: user.id,
        ime: user.ime,
        email: user.email,
        vloga: user.vloga,
      },
    });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    let {
      ime,
      telefon,
      email,
      naslov,
      vloga,
      geslo,
    } = req.body;

    ime = ime?.trim();
    telefon = telefon?.trim();
    email = email?.trim();
    naslov = naslov?.trim();
    vloga = vloga?.trim();
    geslo = geslo?.trim();

    if (
      !ime ||
      !telefon ||
      !email ||
      !naslov ||
      !vloga ||
      !geslo
    ) {
      return res.status(400).json({
        success: false,
        message: "Vsa polja so obvezna.",
      });
    }

    const existingUser = await authKorisnik(email);

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email je že registriran.",
      });
    }

    const queryResult = await createKorisnik(
      ime,
      telefon,
      email,
      naslov,
      vloga,
      geslo
    );

    if (queryResult.affectedRows === 1) {
      return res.status(201).json({
        success: true,
        message: "Registracija uspešna.",
        user: {
          ime,
          email,
          vloga,
        },
      });
    }

    res.status(500).json({
      success: false,
      message: "Napaka pri registraciji.",
    });
  } catch (error) {
    next(error);
  }
};

router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;