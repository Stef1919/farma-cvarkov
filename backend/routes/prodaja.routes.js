import { Router } from "express";

import {
  allProdaja,
  oneProdaja,
  createProdaja,
  updateProdaja,
  deleteProdaja,
} from "../db/database.js";

const router = Router();

const getAllProdaja = async (req, res, next) => {
  try {
    const queryResult = await allProdaja();

    res.status(200).json({
      success: true,
      data: queryResult,
    });
  } catch (error) {
    next(error);
  }
};

const getOneProdaja = async (req, res, next) => {
  try {
    const id = req.params.id;

    const queryResult = await oneProdaja(id);

    if (queryResult.length === 0) {
      res.status(404).json({
        success: false,
        message: "Prodaja ne obstaja.",
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

const createOneProdaja = async (
  req,
  res,
  next
) => {
  try {
    const {
      datum,
      kolicina,
      skupna_cena,
      nacin_placila,
      status,
      proizvodnja_id,
      korisnik_id,
    } = req.body;

    if (
      !datum ||
      !kolicina ||
      !skupna_cena ||
      !nacin_placila ||
      !status ||
      !proizvodnja_id ||
      !korisnik_id
    ) {
      res.status(400).json({
        success: false,
        message: "Vsa polja so obvezna.",
      });

      return;
    }

    const queryResult =
      await createProdaja(
        datum,
        kolicina,
        skupna_cena,
        nacin_placila,
        status,
        proizvodnja_id,
        korisnik_id
      );

    if (queryResult.affectedRows === 1) {
      res.status(201).json({
        success: true,
        message: "Prodaja dodana.",
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

const updateOneProdaja = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id;

    const {
      datum,
      kolicina,
      skupna_cena,
      nacin_placila,
      status,
      proizvodnja_id,
      korisnik_id,
    } = req.body;

    const queryResult =
      await updateProdaja(
        id,
        datum,
        kolicina,
        skupna_cena,
        nacin_placila,
        status,
        proizvodnja_id,
        korisnik_id
      );

    if (queryResult.affectedRows === 1) {
      res.status(200).json({
        success: true,
        message: "Prodaja posodobljena.",
      });

      return;
    }

    res.status(404).json({
      success: false,
      message: "Prodaja ne obstaja.",
    });
  } catch (error) {
    next(error);
  }
};

const deleteOneProdaja = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id;

    const queryResult =
      await deleteProdaja(id);

    if (queryResult.affectedRows === 1) {
      res.status(200).json({
        success: true,
        message: "Prodaja izbrisana.",
      });

      return;
    }

    res.status(404).json({
      success: false,
      message: "Prodaja ne obstaja.",
    });
  } catch (error) {
    next(error);
  }
};

router.get("/", getAllProdaja);
router.get("/:id", getOneProdaja);

router.post("/", createOneProdaja);

router.put("/:id", updateOneProdaja);

router.delete("/:id", deleteOneProdaja);

export default router;