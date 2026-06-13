import { Router } from "express";
import {
  allKorisnik,
  oneKorisnik,
  createKorisnik,
  updateKorisnik,
  deleteKorisnik,
} from "../db/database.js";

const router = Router();

const getAllKorisnik = async (req, res, next) => {
  try {
    const queryResult = await allKorisnik ();

    res.status(200).json({
      success: true,
      data: queryResult,
    });
  } catch (error) {
    next(error);
  }
};

const getOneKorisnik  = async (req, res, next) => {
  try {
    const id = req.params.id;

    const queryResult = await oneKorisnik (id);

    if (queryResult.length === 0) {
      res.status(404).json({
        success: false,
        message: "Korisnik  ne obstaja.",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: queryResult[0],
    });
  } catch (error) {
    next(error);
  }
};

const createOneKorisnik = async (req, res, next) => {
  try {
    let {
        ime,
        telefon,
        email,
        naslov,
        vloga
    } = req.body;

    if (
      !ime||
      !telefon ||
      !email ||
      !naslov ||
      !vloga
    ) {
      res.status(400).json({
        success: false,
        message: "Vsa polja so obvezna.",
      });

      return;
    }

    const queryResult = await createKorisnik (
        ime,
        telefon,
        email,
        naslov,
        vloga
    );

    if (queryResult.affectedRows === 1) {
      res.status(201).json({
        success: true,
        message: "Korisnik dodana.",
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "Napaka pri dodajanju.",
    });
  } catch (error) {
    next(error);
  }
};

const updateOneKorisnik = async (req, res, next) => {
  try {
    const id = req.params.id;

    const {
        ime,
        telefon,
        email,
        naslov,
        vloga,
    } = req.body;

    const queryResult = await updateKorisnik(
        id,
        ime,
        telefon,
        email,
        naslov,
        vloga
    );

    if (queryResult.affectedRows === 1) {
      res.status(200).json({
        success: true,
        message: "Korisnik posodobljen.",
      });

      return;
    }

    res.status(404).json({
      success: false,
      message: "Korisnik ne obstaja.",
    });
  } catch (error) {
    next(error);
  }
};

const deleteOneKorisnik = async (req, res, next) => {
  try {
    const id = req.params.id;

    const queryResult = await deleteKorisnik(id);

    if (queryResult.affectedRows === 1) {
      res.status(200).json({
        success: true,
        message: "Korisnik izbrisan.",
      });

      return;
    }

    res.status(404).json({
      success: false,
      message: "Korisnik ne obstaja.",
    });
  } catch (error) {
    next(error);
  }
};

router.get("/", getAllKorisnik);
router.get("/:id", getOneKorisnik);

router.post("/", createOneKorisnik);

router.put("/:id", updateOneKorisnik);

router.delete("/:id", deleteOneKorisnik);

export default router;
