const { Router } = require("express");
const router = Router();
const { Case } = require("../db.js");

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

//--------------------POST UN CASE--------------------
router.post("/", async (req, res) => {
  const {
    name,
    rating,
    rating_count,
    price_usd,
    type,
    color,
    power_supply,
    side_panel_window,
    image,
  } = req.body;
  try {
    const [cases, created] = await Case.findOrCreate({
      where: {
        name: name,
        rating: rating,
        rating_count: rating_count,
        price_usd: price_usd,
        type: type,
        color: color,
        power_supply: power_supply,
        side_panel_window: side_panel_window,
        image: image,
      },
    });
    if (created) {
      res.status(200).json(cases);
    } else {
      res.status(200).json("The cases exist");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//--------------------PUT UN CASE--------------------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      rating,
      rating_count,
      price_usd,
      type,
      color,
      power_supply,
      side_panel_window,
      image,
    } = req.body;
    const editdCase = await Case.update(
      {
        name: name,
        rating: rating,
        rating_count: rating_count,
        price_usd: price_usd,
        type: type,
        color: color,
        power_supply: power_supply,
        side_panel_window: side_panel_window,
        image: image,
      },
      { where: { id: id } }
    );
    res.json(editdCase);
  } catch (err) {
    res.status(500).send({
      message: "Case not found",
    });
  }
});

//--------------------DELETE UN CASE--------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCase = await Case.findOne({ where: { id: id } });
    await deleteCase.destroy();
    res.status(200).send({ message: "The Case was deleted successfully" });
  } catch (err) {
    res.status(500).send({
      message: "The Case can´t be deleted",
    });
  }
});

module.exports = router;
