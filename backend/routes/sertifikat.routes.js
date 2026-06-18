import { Router } from "express";

import {
  allSertifikat,
  oneSertifikat,
  createSertifikat,
  updateSertifikat,
  deleteSertifikat,
} from "../db/database.js";

const router = Router();

const getAllSertifikat = async (req, res, next) => {
  try {
    const queryResult =
      await allSertifikat();

    res.status(200).json({
      success: true,
      data: queryResult,
    });
  } catch (error) {
    next(error);
  }
};

const getOneSertifikat = async (req, res, next) => {
  try {
    const id = req.params.id;

    const queryResult =
      await oneSertifikat(id);

    if (queryResult.length === 0) {
      res.status(404).json({
        success: false,
        message:
          "Sertifikat ne obstaja.",
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

const createOneSertifikat = async (req, res, next) => {
  try {
    const {
      naziv,
      datum_izdaje,
      datum_poteka,
      status,
      proizvodnja_id,
    } = req.body;

    if (
      !naziv ||
      !datum_izdaje ||
      !datum_poteka ||
      !status ||
      !proizvodnja_id
    ) {
      res.status(400).json({
        success: false,
        message:
          "Vsa polja so obvezna.",
      });

      return;
    }

    const queryResult =
      await createSertifikat(
        naziv,
        datum_izdaje,
        datum_poteka,
        status,
        proizvodnja_id
      );

    if (queryResult.affectedRows === 1) {
      res.status(201).json({
        success: true,
        message:
          "Sertifikat dodan.",
      });

      return;
    }

    res.status(500).json({
      success: false,
      message:
        "Napaka pri dodajanju.",
    });
  } catch (error) {
    next(error);
  }
};

const updateOneSertifikat = async (req, res, next) => {
  try {
    const id = req.params.id;

    const {
      naziv,
      datum_izdaje,
      datum_poteka,
      status,
      proizvodnja_id,
    } = req.body;

    const queryResult =
      await updateSertifikat(
        id,
        naziv,
        datum_izdaje,
        datum_poteka,
        status,
        proizvodnja_id
      );

    if (queryResult.affectedRows === 1) {
      res.status(200).json({
        success: true,
        message:
          "Sertifikat posodobljen.",
      });

      return;
    }

    res.status(404).json({
      success: false,
      message:
        "Sertifikat ne obstaja.",
    });
  } catch (error) {
    next(error);
  }
};

const deleteOneSertifikat = async (req, res, next) => {
  try {
    const id = req.params.id;

    const queryResult =
      await deleteSertifikat(id);

    if (queryResult.affectedRows === 1) {
      res.status(200).json({
        success: true,
        message:
          "Sertifikat izbrisan.",
      });

      return;
    }

    res.status(404).json({
      success: false,
      message:
        "Sertifikat ne obstaja.",
    });
  } catch (error) {
    next(error);
  }
};

router.get("/", getAllSertifikat);
router.get("/:id", getOneSertifikat);

router.post("/", createOneSertifikat);

router.put("/:id", updateOneSertifikat);

router.delete("/:id", deleteOneSertifikat);

export default router;