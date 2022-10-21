const { Router } = require("express");
const router = Router();
const { Case, Product } = require("../db.js");

//Create User
//------- PEDIR TODOS LOS CASE A LA BD--------
router.get("/", async (req, res) => {
  try {
    let cases;
    cases = await Case.findAll();
    res.status(200).json(cases);
  } catch (err) {
    res.status(500).json(err);
  }
});

//------- PEDIR TODOS LOS CASE A LA BD POR ID--------
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let caseId;
    caseId = await Case.findByPk(id);
    res.status(200).json(caseId);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
