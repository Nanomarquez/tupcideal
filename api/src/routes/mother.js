const { Router } = require("express");
const router = Router();
const { Motherboard } = require("../db.js");

//------- PEDIR TODOS LOS MOTHER BOARD A LA BD--------
router.get("/", async (req, res) => {
  try {
    let mother;
    mother = await Motherboard.findAll();
    res.status(200).json(mother);
  } catch (err) {
    res.status(500).json(err);
  }
});

//------- PEDIR TODOS LOS MOTHER BOARD A LA BD POR ID--------
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let motherId;
    motherId = await Motherboard.findByPk(id);
    res.status(200).json(motherId);
  } catch (err) {
    res.status(500).json(err);
  }
});

//--------------------POST UNA MOTHER BOARD--------------------
router.post("/", async (req, res) => {
  const {
    name,
    rating,
    rating_count,
    price_usd,
    form_factor,
    memory_max,
    memory_slots,
    color,
    image,
  } = req.body;
  try {
    const [mother, created] = await Motherboard.findOrCreate({
      where: {
        name: name,
        rating: rating,
        rating_count: rating_count,
        price_usd: price_usd,
        form_factor: form_factor,
        memory_max: memory_max,
        memory_slots: memory_slots,
        color: color,
        image: image,
      },
    });
    if (created) {
      res.status(200).json(mother);
    } else {
      res.status(200).json("The Mother Board exist previusly");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//--------------------PUT UN MOTHER BOARD--------------------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      rating,
      rating_count,
      price_usd,
      form_factor,
      memory_max,
      memory_slots,
      color,
      image,
    } = req.body;

    const editdMother = await Motherboard.update(
      {
        name: name,
        rating: rating,
        rating_count: rating_count,
        price_usd: price_usd,
        form_factor: form_factor,
        memory_max: memory_max,
        memory_slots: memory_slots,
        color: color,
        image: image,
      },
      { where: { id: id } }
    );
    res.json(editdMother);
  } catch (err) {
    res.status(500).send({
      message: "Mother Board not found",
    });
  }
});

//--------------------DELETE UN MOTHER BOARD--------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMother = await Motherboard.findOne({ where: { id: id } });
    await deleteMother.destroy();
    res.status(200).send({ message: "The Mother Board was deleted successfully" });
  } catch (err) {
    res.status(500).send({
      message: "The Mother Board can´t be deleted",
    });
  }
});

module.exports = router;
