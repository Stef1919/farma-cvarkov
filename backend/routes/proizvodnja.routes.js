import { Router } from "express";

import {
  allProizvodnja,
  oneProizvodnja,
  createProizvodnja,
  updateProizvodnja,
  deleteProizvodnja
} from "../db/database.js";

const router = Router();

const getAllProizvodnja = async (req, res, next) => {
    try{
        const queryResult = await allProizvodnja();
        res.status(200).json({
            success: true,
            data: queryResult,
        });
    } catch (error){
        next(error);
    }
};

const getOneProizvodnja = async (req, res, next) => {
  try{
    const id = req.params.id;
    const queryResult = await oneProizvodnja(id);
    if (queryResult.length === 0) {
        res.status(404).json({
            success: false,
            message: "Proizvodnja ne obstaja. ",
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

const createOneProizvodnja = async (req, res, next) => {
  
    try {

        const {
            datum,
            tip,
            kolicina,
            opombe,
            perad_id,
            korisnik_id
        } = req.body;

        if (!datum || !tip || !kolicina || !opombe || !perad_id || !korisnik_id){
            res.status(400).json({
                success: false,
                message: "Vsa polja so obvezna.",
            })

            return;
        }

        const queryResult = await createProizvodnja(
            datum,
            tip,
            kolicina,
            opombe,
            perad_id,
            korisnik_id
        )

        if (queryResult.affectedRows === 1){
            res.status(201).json({
                success: true,
                message: "Proizvodnja dodana.",
            });
            
            return;
        }

        res.status(500).json({
            success: false,
            message: "Napaka pri dodajanju.",
        });

    } catch (error){
        next(error);
    }

};

const updateOneProizvodnja = async (req, res, next) => {
    try{
        const id = req.params.id;

        const {

            datum,
            tip,
            kolicina,
            opombe,
            perad_id,
            korisnik_id

        } = req.body;

        const queryResult = await updateProizvodnja(
            id,
             datum,
            tip,
            kolicina,
            opombe,
            perad_id,
            korisnik_id
        )

        if (queryResult.affectedRows === 1){
            res.status(200).json({
                success: true,
                message: "Proizvodnja posodobljena.",
            });

            return;
        }

        req.status(404).json({
            success: false,
            message: "Proizvodnja ne obstaja.",
        });

    } catch (error) {
        next(error);
    }
};

const deleteOneProizvodnja = async (req, res, next) => {
    try{

        const id = req.params.id;
        const queryResult = await deleteProizvodnja(id);

        if (queryResult.affectedRows === 1){
            res.status(200).json({
                success: true,
                message: "Proizvodnja izbrisana",
            });

            return;
        }

        res.status(404).json({
            success: false,
            message: "Proizvodnja ne obstaja.",
        });


    } catch (error) {
        next(error);
    }
};

router.get("/", getAllProizvodnja);
router.get("/:id", getOneProizvodnja);

router.post("/", createOneProizvodnja);

router.put("/:id", updateOneProizvodnja);

router.delete("/:id", deleteOneProizvodnja);

export default router;