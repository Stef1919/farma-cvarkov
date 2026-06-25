import { Router } from "express";

import {
  authKorisnik,
  createKorisnik
} from "../db/database.js";

const router = Router();

const loginUser = async (req, res, next) => {
  try {
    let {email, geslo} = req.body;

    email = email?.trim();
    geslo = geslo?.trim();

    if (!email || !geslo) {
      res.status(400).json({
        success: false,
        message:
          "Email in geslo sta obvezna.",
      });

      return;
    }

    const queryResult = await authKorisnik(email);

    if (queryResult.length === 0) {
      res.status(401).json({
        success: false,
        message: "Uporabnik ne obstaja.",
      });

      return;
    }

    const user = queryResult[0];

    if (geslo !== user.geslo) {
      res.status(401).json({
        success: false,
        message: "Napačno geslo.",
      });

      return;
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
    const {
      ime,
      telefon,
      email,
      naslov,
      vloga,
      geslo,
    } = req.body;

    if (
      !ime ||
      !telefon ||
      !email ||
      !naslov ||
      !vloga ||
      !geslo
    ) {
      res.status(400).json({
        success: false,
        message: "Vsa polja so obvezna.",
      });

      return;
    }

    const queryResult =
      await createKorisnik(
        ime,
        telefon,
        email,
        naslov,
        vloga,
        geslo
      );

    if (queryResult.affectedRows === 1) {
      res.status(201).json({
        success: true,
        message: "Uporabnik registriran.",
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "Napaka pri registraciji.",
    });
  } catch (error) {
    next(error);
  }
};

router.post("/login",loginUser);

router.post("/register",registerUser);

export default router;