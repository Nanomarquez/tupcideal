const { Router } = require("express");
const router = Router();
const { User } = require("../db.js");

//Create User
router.post("/", async (req, res) => {
  const { name, last_name, adress, email, phone_number } = req.body;
  try {
    const [usuario, created] = await User.findOrCreate({
      where: {
        name: name,
        last_name: last_name,
        adress: adress,
        email: email,
        phone_number: phone_number,
      },
    });
    if (created) {
      console.log("Usuario CREADO");
      res.status(200).json(usuario);
    } else {
      res.status(200).json("El Usuario ya existe.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;