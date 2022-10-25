const { Router } = require("express");
const router = Router();
const { VideoCard } = require("../db.js");

//------- PEDIR TODOS LOS VIDEO CARD A LA BD--------
router.get("/", async (req, res) => {
  try {
    let video;
    video = await VideoCard.findAll();
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json(err);
  }
});

//------- PEDIR TODOS LOS VIDEO CARD A LA BD POR ID--------
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let videoId;
    videoId = await VideoCard.findByPk(id);
    res.status(200).json(videoId);
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
    chipset,
    memory,
    core_clock,
    boost_clock,
    color,
    length,
    image,
  } = req.body;
  try {
    const [power, created] = await VideoCard.findOrCreate({
      where: {
        name: name,
        rating: rating,
        rating_count: rating_count,
        price_usd: price_usd,
        chipset,
        memory: memory,
        core_clock: core_clock,
        boost_clock: boost_clock,
        color: color,
        length: length,
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

//--------------------PUT UN VIDEO CARD--------------------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      rating,
      rating_count,
      price_usd,
      chipset,
      memory,
      core_clock,
      boost_clock,
      color,
      length,
      image,
    } = req.body;

    const editdVideoCard = await VideoCard.update(
      {
        name: name,
        rating: rating,
        rating_count: rating_count,
        price_usd: price_usd,
        chipset,
        memory: memory,
        core_clock: core_clock,
        boost_clock: boost_clock,
        color: color,
        length: length,
        image: image,
      },
      { where: { id: id } }
    );
    res.json(editdVideoCard);
  } catch (err) {
    res.status(500).send({
      message: "Video Card not found",
    });
  }
});

//--------------------DELETE UN VIDEO CARD--------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteVideoCard = await VideoCard.findOne({ where: { id: id } });
    await deleteVideoCard.destroy();
    res
      .status(200)
      .send({ message: "The Video Card was deleted successfully" });
  } catch (err) {
    res.status(500).send({
      message: "The Video Card can´t be deleted",
    });
  }
});

module.exports = router;
