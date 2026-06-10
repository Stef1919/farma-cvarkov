import { Router } from "express";
import {
  allPerad,
  onePerad,
  createPerad,
  updatePerad,
  deletePerad,
} from "../db/database.js";

const router = Router();

const getAllPerad = async (req, res, next) => {
  try {
    const queryResult = await allPerad();

    res.status(200).json({
      success: true,
      data: queryResult,
    });
  } catch (error) {
    next(error);
  }
};

const getOnePerad = async (req, res, next) => {
  try {
    const id = req.params.id;

    const queryResult = await onePerad(id);

    if (queryResult.length === 0) {
      res.status(404).json({
        success: false,
        message: "Perad ne obstaja.",
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

const createOnePerad = async (req, res, next) => {
  try {
    let {
      vrsta,
      starost,
      spol,
      kolicina,
    } = req.body;

    if (
      !vrsta ||
      !starost ||
      !spol ||
      !kolicina
    ) {
      res.status(400).json({
        success: false,
        message: "Vsa polja so obvezna.",
      });

      return;
    }

    const queryResult = await createPerad(
      vrsta,
      starost,
      spol,
      kolicina
    );

    if (queryResult.affectedRows === 1) {
      res.status(201).json({
        success: true,
        message: "Perad dodana.",
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

const updateOnePerad = async (req, res, next) => {
  try {
    const id = req.params.id;

    const {
      vrsta,
      starost,
      spol,
      kolicina,
    } = req.body;

    const queryResult = await updatePerad(
      id,
      vrsta,
      starost,
      spol,
      kolicina
    );

    if (queryResult.affectedRows === 1) {
      res.status(200).json({
        success: true,
        message: "Perad posodobljena.",
      });

      return;
    }

    res.status(404).json({
      success: false,
      message: "Perad ne obstaja.",
    });
  } catch (error) {
    next(error);
  }
};

const deleteOnePerad = async (req, res, next) => {
  try {
    const id = req.params.id;

    const queryResult = await deletePerad(id);

    if (queryResult.affectedRows === 1) {
      res.status(200).json({
        success: true,
        message: "Perad izbrisana.",
      });

      return;
    }

    res.status(404).json({
      success: false,
      message: "Perad ne obstaja.",
    });
  } catch (error) {
    next(error);
  }
};

router.get("/", getAllPerad);
router.get("/:id", getOnePerad);

router.post("/", createOnePerad);

router.put("/:id", updateOnePerad);

router.delete("/:id", deleteOnePerad);

export default router;
