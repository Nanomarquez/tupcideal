const { Router } = require("express");
const router = Router();
const { CPU } = require("../db.js");

//Create User
//------- PEDIR TODOS LOS CPU A LA BD--------
router.get("/", async (req, res) => {
  try {
    let cpu;
    cpu = await CPU.findAll();
    res.status(200).json(cpu);
  } catch (err) {
    res.status(500).json(err);
  }
});

//------- PEDIR TODOS LOS CPU A LA BD POR ID--------
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

//--------------------PUT UN CPU--------------------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      rating,
      rating_count,
      price_usd,
      core_count,
      core_clock,
      boost_clock,
      tdp,
      integrated_graphics,
      smt,
      socket,
      image,
    } = req.body;

    const editdCPU = await CPU.update(
      {
        name: name,
        rating: rating,
        rating_count: rating_count,
        price_usd: price_usd,
        core_count: core_count,
        core_clock: core_clock,
        boost_clock: boost_clock,
        tdp: tdp,
        integrated_graphics: integrated_graphics,
        smt: smt,
        socket: socket,
        image: image,
      },
      { where: { id: id } }
    );
    res.json(editdCPU);
  } catch (err) {
    res.status(500).send({
      message: "CPU not found",
    });
  }
});

//--------------------DELETE UN CPU--------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCPU = await CPU.findOne({ where: { id: id } });
    await deleteCPU.destroy();
    res.status(200).send({ message: "The CPU was deleted successfully" });
  } catch (err) {
    res.status(500).send({
      message: "The CPU can´t be deleted",
    });
  }
});

module.exports = router;
