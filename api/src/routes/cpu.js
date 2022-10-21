const { Router } = require("express");
const router = Router();
const { CPU } = require("../db.js");

//Create User
//------- PEDIR TODOS LOS CASE A LA BD--------
router.get("/", async (req, res) => {
  try {
    let cpu;
    cpu = await CPU.findAll();
    res.status(200).json(cpu);
  } catch (err) {
    res.status(500).json(err);
  }
});

//------- PEDIR TODOS LOS CASE A LA BD POR ID--------
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let cpuId;
    cpuId = await CPU.findByPk(id);
    res.status(200).json(cpuId);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
