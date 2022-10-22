const { Router } = require("express");
const router = Router();
const { Memory } = require("../db.js");

//------- PEDIR TODOS LOS MEMORY A LA BD--------
router.get("/", async (req, res) => {
  try {
    let memory;
    memory = await Memory.findAll();
    res.status(200).json(memory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//------- PEDIR TODOS LOS MEMORY A LA BD POR ID--------
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let memoryId;
    memoryId = await Memory.findByPk(id);
    res.status(200).json(memoryId);
  } catch (err) {
    res.status(500).json(err);
  }
});

//--------------------POST UNA MEMORY--------------------
router.post("/", async (req, res) => {
  const {
    name,
    rating,
    rating_count,
    price_usd,
    speed,
    modules,
    color,
    first_word_latency,
    cas_latency,
    image,
  } = req.body;
  try {
    const [memory, created] = await Memory.findOrCreate({
      where: {
        name: name,
        rating: rating,
        rating_count: rating_count,
        price_usd: price_usd,
        speed: speed,
        modules: modules,
        color: color,
        first_word_latency: first_word_latency,
        cas_latency: cas_latency,
        image: image,
      },
    });
    if (created) {
      res.status(200).json(memory);
    } else {
      res.status(200).json("The Memory exist previusly");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//--------------------PUT UN MEMORY--------------------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      rating,
      rating_count,
      price_usd,
      speed,
      modules,
      color,
      first_word_latency,
      cas_latency,
      image,
    } = req.body;

    const editdMemory = await Memory.update(
      {
        name: name,
        rating: rating,
        rating_count: rating_count,
        price_usd: price_usd,
        speed: speed,
        modules: modules,
        color: color,
        first_word_latency: first_word_latency,
        cas_latency: cas_latency,
        image: image,
      },
      { where: { id: id } }
    );
    res.json(editdMemory);
  } catch (err) {
    res.status(500).send({
      message: "Memory not found",
    });
  }
});

//--------------------DELETE UN MEMORY--------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMemory = await Memory.findOne({ where: { id: id } });
    await deleteMemory.destroy();
    res.status(200).send({ message: "The Memory was deleted successfully" });
  } catch (err) {
    res.status(500).send({
      message: "The Memory can´t be deleted",
    });
  }
});

module.exports = router;
