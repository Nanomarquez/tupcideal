const { Router } = require("express");
const router = Router();
const { User } = require("../db.js");


//------- Pedir todos los usuario(individual) a la BD--------
router.get("/:email", async (req, res) => {
  const { email } = req.params;
  console.log("este es el email" + email);
  try {
    let respuestabd;
    respuestabd = await User.findOne({ where: { email: email } });
    console.log("lo que traigo es:" + respuestabd);
    if (respuestabd === null) {
      return res
        .status(404)
        .send(`No se encontraron coincidencias con el usuario: ${email}`);
    } else {
      res.status(200).json(respuestabd);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});



//------- Pedir todos los usuario(general) a la BD--------

router.get("/", async (req, res) => {

  try {
    let respuestabd;
    respuestabd = await User.findAll();
    
    if (respuestabd === null) {
      return res
        .status(404)
        .send(`No se encontraron coincidencias con el usuario: ${email}`);
    } else {
      res.status(200).json(respuestabd);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});







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