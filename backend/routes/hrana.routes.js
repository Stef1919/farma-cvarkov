import { Router } from "express";
import {
  allHrana,
  oneHrana,
  createHrana,
  updateHrana,
  deleteHrana,
} from "../db/database.js";

const router = Router();

const getAllHrana = async (req, res, next) => {
  try {
    const queryResult = await allHrana();

    res.status(200).json({
      success: true,
      data: queryResult,
    });
  } catch (error) {
    next(error);
  }
};

const getOneHrana = async (req, res, next) => {
  try {
    const id = req.params.id;

    const queryResult = await oneHrana(id);

    if (queryResult.length === 0) {
      res.status(404).json({
        success: false,
        message: "Hrana ne obstaja.",
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

const createOneHrana = async (req, res, next) => {
  try {
    const {
      naziv,
      tip,
      kolicina,
      cena,
      rok_uporabe,
      korisnik_id,
    } = req.body;

    if (
      !naziv ||
      !tip ||
      !kolicina ||
      !cena ||
      !rok_uporabe ||
      !korisnik_id
    ) {
      res.status(400).json({
        success: false,
        message: "Vsa polja so obvezna.",
      });

      return;
    }

    const queryResult = await createHrana(
      naziv,
      tip,
      kolicina,
      cena,
      rok_uporabe,
      korisnik_id
    );

    if (queryResult.affectedRows === 1) {
      res.status(201).json({
        success: true,
        message: "Hrana dodana.",
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

const updateOneHrana = async (req, res, next) => {
  try {
    const id = req.params.id;

    const {
      naziv,
      tip,
      kolicina,
      cena,
      rok_uporabe,
      korisnik_id,
    } = req.body;

    const queryResult = await updateHrana(
      id,
      naziv,
      tip,
      kolicina,
      cena,
      rok_uporabe,
      korisnik_id
    );

    if (queryResult.affectedRows === 1) {
      res.status(200).json({
        success: true,
        message: "Hrana posodobljena.",
      });

      return;
    }

    res.status(404).json({
      success: false,
      message: "Hrana ne obstaja.",
    });
  } catch (error) {
    next(error);
  }
};

const deleteOneHrana = async (req, res, next) => {
  try {
    const id = req.params.id;

    const queryResult = await deleteHrana(id);

    if (queryResult.affectedRows === 1) {
      res.status(200).json({
        success: true,
        message: "Hrana izbrisana.",
      });

      return;
    }

    res.status(404).json({
      success: false,
      message: "Hrana ne obstaja.",
    });
  } catch (error) {
    next(error);
  }
};

router.get("/", getAllHrana);
router.get("/:id", getOneHrana);

router.post("/", createOneHrana);

router.put("/:id", updateOneHrana);

router.delete("/:id", deleteOneHrana);

export default router;