const { Router } = require("express");
const router = Router();
const { PowerSupply } = require("../db.js");

//------- PEDIR TODOS LOS POWER SUPPLY A LA BD--------
router.get("/", async (req, res) => {
  try {
    let power;
    power = await PowerSupply.findAll();
    res.status(200).json(power);
  } catch (err) {
    res.status(500).json(err);
  }
});

//------- PEDIR TODOS LOS POWER SUPPLY A LA BD POR ID--------
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let powerId;
    powerId = await PowerSupply.findByPk(id);
    res.status(200).json(powerId);
  } catch (err) {
    res.status(500).json(err);
  }
});

//--------------------POST UNA POWER SUPPLY--------------------
router.post("/", async (req, res) => {
  const {
    name,
    rating,
    rating_count,
    price_usd,
    form_factor,
    efficiency_rating,
    wattage,
    modular,
    color,
    image,
  } = req.body;
  try {
    const [power, created] = await PowerSupply.findOrCreate({
      where: {
        name: name,
        rating: rating,
        rating_count: rating_count,
        price_usd: price_usd,
        form_factor: form_factor,
        efficiency_rating: efficiency_rating,
        wattage: wattage,
        modular: modular,
        color: color,
        image: image,
      },
    });
    if (created) {
      res.status(200).json(power);
    } else {
      res.status(200).json("The Power Supply exist previusly");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//--------------------PUT UN POWER SUPPLY--------------------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      rating,
      rating_count,
      price_usd,
      form_factor,
      efficiency_rating,
      wattage,
      modular,
      color,
      image,
    } = req.body;

    const editdPower = await PowerSupply.update(
      {
        name: name,
        rating: rating,
        rating_count: rating_count,
        price_usd: price_usd,
        form_factor: form_factor,
        efficiency_rating: efficiency_rating,
        wattage: wattage,
        modular: modular,
        color: color,
        image: image,
      },
      { where: { id: id } }
    );
    res.json(editdPower);
  } catch (err) {
    res.status(500).send({
      message: "Power Supply not found",
    });
  }
});

//--------------------DELETE UN POWER SUPPLY--------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePower = await PowerSupply.findOne({ where: { id: id } });
    await deletePower.destroy();
    res
      .status(200)
      .send({ message: "The Power Supply was deleted successfully" });
  } catch (err) {
    res.status(500).send({
      message: "The Power Supply can´t be deleted",
    });
  }
});

module.exports = router;
