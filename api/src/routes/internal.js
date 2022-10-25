const { Router } = require("express");
const router = Router();
const { InternalHardDrive } = require("../db.js");

//------- PEDIR TODOS LOS INTERNALHD A LA BD--------
router.get("/", async (req, res) => {
  try {
    let internal;
    internal = await InternalHardDrive.findAll();
    res.status(200).json(internal);
  } catch (err) {
    res.status(500).json(err);
  }
});

//------- PEDIR TODOS LOS INTERNALHD A LA BD POR ID--------
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let internalId;
    internalId = await InternalHardDrive.findByPk(id);
    res.status(200).json(internalId);
  } catch (err) {
    res.status(500).json(err);
  }
});

//--------------------POST UN UNTERNAL HD--------------------
router.post("/", async (req, res) => {
  const {
    name,
    rating,
    rating_count,
    price_usd,
    capacity,
    type,
    cache,
    form_factor,
    interface,
    image,
  } = req.body;
  try {
    const [internal, created] = await InternalHardDrive.findOrCreate({
      where: {
        name: name,
        rating: rating,
        rating_count: rating_count,
        price_usd: price_usd,
        capacity: capacity,
        type: type,
        cache: cache,
        form_factor: form_factor,
        interface: interface,
        image: image,
      },
    });
    if (created) {
      res.status(200).json(internal);
    } else {
      res.status(200).json("The Internal Hard Drive exist previusly");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//--------------------PUT UN INTERNALHD--------------------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      rating,
      rating_count,
      price_usd,
      capacity,
      type,
      cache,
      form_factor,
      interface,
      image,
    } = req.body;

    const editdInternal = await InternalHardDrive.update(
      {
        name: name,
        rating: rating,
        rating_count: rating_count,
        price_usd: price_usd,
        capacity: capacity,
        type: type,
        cache: cache,
        form_factor: form_factor,
        interface: interface,
        image: image,
      },
      { where: { id: id } }
    );
    res.json(editdInternal);
  } catch (err) {
    res.status(500).send({
      message: "Internal HD not found",
    });
  }
});

//--------------------DELETE UN INTERNALHD--------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteInternal = await InternalHardDrive.findOne({
      where: { id: id },
    });
    await deleteInternal.destroy();
    res
      .status(200)
      .send({ message: "The Internal HD was deleted successfully" });
  } catch (err) {
    res.status(500).send({
      message: "The Internal HD can´t be deleted",
    });
  }
});

module.exports = router;
