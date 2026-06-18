import { Router } from "express";

import {
  allPregled,
  onePregled,
  createPregled,
  updatePregled,
  deletePregled,
} from "../db/database.js";

const router = Router();

const getAllPregled = async (req, res, next) => {
  try {
    const queryResult = await allPregled();

    res.status(200).json({
      success: true,
      data: queryResult,
    });
  } catch (error) {
    next(error);
  }
};

const getOnePregled = async (req, res, next) => {
  try {
    const id = req.params.id;

    const queryResult = await onePregled(id);

    if (queryResult.length === 0) {
      res.status(404).json({
        success: false,
        message: "Pregled ne obstaja.",
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

const createOnePregled = async (
  req,
  res,
  next
) => {
  try {
    const {
      datum,
      diagnoza,
      stanje,
      opombe,
      perad_id,
      korisnik_id,
    } = req.body;

    if (
      !datum ||
      !diagnoza ||
      !stanje ||
      !opombe ||
      !perad_id ||
      !korisnik_id
    ) {
      res.status(400).json({
        success: false,
        message: "Vsa polja so obvezna.",
      });

      return;
    }

    const queryResult =
      await createPregled(
        datum,
        diagnoza,
        stanje,
        opombe,
        perad_id,
        korisnik_id
      );

    if (queryResult.affectedRows === 1) {
      res.status(201).json({
        success: true,
        message: "Pregled dodan.",
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

const updateOnePregled = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id;

    const {
      datum,
      diagnoza,
      stanje,
      opombe,
      perad_id,
      korisnik_id,
    } = req.body;

    const queryResult =
      await updatePregled(
        id,
        datum,
        diagnoza,
        stanje,
        opombe,
        perad_id,
        korisnik_id
      );

    if (queryResult.affectedRows === 1) {
      res.status(200).json({
        success: true,
        message: "Pregled posodobljen.",
      });

      return;
    }

    res.status(404).json({
      success: false,
      message: "Pregled ne obstaja.",
    });
  } catch (error) {
    next(error);
  }
};

const deleteOnePregled = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id;

    const queryResult =
      await deletePregled(id);

    if (queryResult.affectedRows === 1) {
      res.status(200).json({
        success: true,
        message: "Pregled izbrisan.",
      });

      return;
    }

    res.status(404).json({
      success: false,
      message: "Pregled ne obstaja.",
    });
  } catch (error) {
    next(error);
  }
};

router.get("/", getAllPregled);
router.get("/:id", getOnePregled);

router.post("/", createOnePregled);

router.put("/:id", updateOnePregled);

router.delete("/:id", deleteOnePregled);

export default router;