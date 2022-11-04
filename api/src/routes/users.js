const { Router } = require("express");
const router = Router();
const { User, Favorite } = require("../db.js");
const sendRegisterMail= require ('../Funciones/sendRegisterMail')

//------- Pedir usuario(individual) a la BD--------
router.get("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    let respuestabd;
    respuestabd = await User.findOne({
      // include: { 
      //   model: WareHouse,
      //   attributes: ["id"] },
      where: { email: email },
    });
    if (respuestabd === null) {
      return res.send("Usuario no encontrado");
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



//------- Create User -------
router.post("/", async (req, res) => {
  const { name, last_name, adress, email, phone_number } = req.body;
  console.log(req.body);
  try {
    const [usuario, created] = await User.findOrCreate({
      where: {
        name: name,
        last_name: last_name,
        adress: adress,
        phone_number: phone_number,
        email: email,
      },
    });
    if (created) {
      console.log("Usuario CREADO");
      sendRegisterMail(usuario);
      res.status(200).json(usuario);
    } else {
      res.status(200).json("El Usuario ya existe.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//--------------------PUT UN USER--------------------
router.put("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { name, last_name, adress, phone_number, ban ,admin} = req.body;
    const editdUser = await User.update(
      {
        name: name,
        last_name: last_name,
        adress: adress,
        phone_number: phone_number,
        isBanned: ban,
        isAdmin:admin,
      },
      { where: { email: email } }
    );
    res.json(editdUser);
  } catch (err) {
    res.status(500).send({
      message: "User not found",
    });
  }
});

//--------------------DELETE UN SELLER--------------------

router.delete("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const deleteuser = await User.findOne({ where: { email: email } });
    await deleteuser.destroy();
    res.status(200).send({ message: "The user was deleted successfully" });
  } catch (err) {
    res.status(500).send({
      message: "The user can´t be deleted",
    });
  }
});

module.exports = router;
