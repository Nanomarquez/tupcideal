const { Router } = require("express");
const router = Router();
const { Favorite, User } = require("../db.js");

//------- PEDIR POR EMAIL UN ADMIN A LA BD--------
router.get("/", async (req, res) => {
  const { userId } = req.params;
  console.log("este es el ID:     " + userId);
  try {
    let respuestabd;
    respuestabd = await Favorite.findAll();
    if (respuestabd === null) {
      return res.status(404).send(`The table doesn't have Favorites yet`);
    } else {
      res.status(200).json(respuestabd);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//------- PEDIR FAVORITOS POR ID A LA BD--------
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    let respuestabd;
    respuestabd = await Favorite.findAll({
      where: { UserId: [userId] },
    });
    if (respuestabd === null) {
      return res.status(404).send(`The User doesn't have Favorites yet`);
    } else {
      res.status(200).json(respuestabd);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//--------------------POST UN FAVORITO--------------------
router.post("/", async (req, res) => {
  const { name_Seller, name_Product, image, UserId } = req.body;
  try {
    const [favorite, created] = await Favorite.findOrCreate({
      where: {
        name_Seller:name_Seller,
        name_Product:name_Product,
        image:image,
        UserId:UserId,
      },
    });
    if (created) {
      res.status(200).json(favorite);
    } else {
      res.status(200).json("The favorite exist");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


//--------------------DELETE UN FAVORITE--------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteFav = await Favorite.findOne({ where: { id: id } });
    await deleteFav.destroy();
    res.status(200).send({ message: "The Favorite was deleted successfully" });
  } catch (err) {
    res.status(500).send({
      message: "The Favorite can´t be deleted",
    });
  }
});

module.exports = router;
