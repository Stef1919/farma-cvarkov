import { Router } from "express";

import {
  allHranaPerad,
  oneHranaPerad,
  createHranaPerad,
  updateHranaPerad,
  deleteHranaPerad,
} from "../db/database.js";

const router = Router();

const getAllHranaPerad = async (req, res, next) => {
  try {
    const queryResult = await allHranaPerad();

    res.status(200).json({
      success: true,
      data: queryResult,
    });
  } catch (error) {
    next(error);
  }
};

const getOneHranaPerad = async (req, res, next) => {
  try {
    const id = req.params.id;

    const queryResult =
      await oneHranaPerad(id);

    if (queryResult.length === 0) {
      res.status(404).json({
        success: false,
        message: "Povezava ne obstaja.",
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

const createOneHranaPerad = async (
  req,
  res,
  next
) => {
  try {
    const {
      hrana_id,
      perad_id,
    } = req.body;

    if (
      !hrana_id ||
      !perad_id
    ) {
      res.status(400).json({
        success: false,
        message: "Vsa polja so obvezna.",
      });

      return;
    }

    const queryResult =
      await createHranaPerad(
        hrana_id,
        perad_id
      );

    if (queryResult.affectedRows === 1) {
      res.status(201).json({
        success: true,
        message: "Povezava dodana.",
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

const updateOneHranaPerad = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id;

    const {
      hrana_id,
      perad_id,
    } = req.body;

    const queryResult =
      await updateHranaPerad(
        id,
        hrana_id,
        perad_id
      );

    if (queryResult.affectedRows === 1) {
      res.status(200).json({
        success: true,
        message: "Povezava posodobljena.",
      });

      return;
    }

    res.status(404).json({
      success: false,
      message: "Povezava ne obstaja.",
    });
  } catch (error) {
    next(error);
  }
};

const deleteOneHranaPerad = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id;

    const queryResult =
      await deleteHranaPerad(id);

    if (queryResult.affectedRows === 1) {
      res.status(200).json({
        success: true,
        message: "Povezava izbrisana.",
      });

      return;
    }

    res.status(404).json({
      success: false,
      message: "Povezava ne obstaja.",
    });
  } catch (error) {
    next(error);
  }
};

router.get("/", getAllHranaPerad);
router.get("/:id", getOneHranaPerad);

router.post("/", createOneHranaPerad);

router.put("/:id", updateOneHranaPerad);

router.delete("/:id", deleteOneHranaPerad);

export default router;