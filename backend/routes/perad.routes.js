import { Router } from "express";
import { allPerad } from "../db/database.js";

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

router.get("/", getAllPerad);

export default router;
