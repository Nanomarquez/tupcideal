const { Router } = require("express");
const router = Router();
const { Seller } = require("../db.js");

//Create User
router.post("/", async (req, res) => {
  const { store_name, adress, email, phone_number } = req.body;
  try {
    const [seller, created] = await Seller.findOrCreate({
      where: {
        store_name: store_name,
        adress: adress,
        email: email,
        phone_number: phone_number,
      },
    });
    if (created) {
      console.log("Vendedor creado");
      res.status(200).json(seller);
    } else {
      res.status(200).json("El vendedor ya existe.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
