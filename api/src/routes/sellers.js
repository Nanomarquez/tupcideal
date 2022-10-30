const { Router } = require("express");
const router = Router();
const { Seller } = require("../db.js");

//Create User
//------- PEDIR TODOS LOS SELLERS A LA BD--------
router.get("/", async (req, res) => {
  try {
    let respuestabd;
    respuestabd = await Seller.findAll();
    if (respuestabd === null) {
      return res
        .status(404)
        .send(`Don´t found matches with the email: ${email}`);
    } else {
      res.status(200).json(respuestabd);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//------- PEDIR POR EMAIL UN SELLER A LA BD--------
router.get("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    let respuestabd;
    respuestabd = await Seller.findOne({ where: { email: email } });
    if (respuestabd === null) {
      return res
        .status(404)
        .send(`Don´t found matches with the email: ${email}`);
    } else {
      res.status(200).json(respuestabd);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//--------------------POST UN SELLER--------------------
router.post("/", async (req, res) => {
  const { store_name, adress, email, phone_number, password } = req.body;
  try {
    const [seller, created] = await Seller.findOrCreate({
      where: {
        store_name: store_name,
        adress: adress,
        email: email,
        phone_number: phone_number,
        password: password
      },

    });
    if (created) {
      console.log("Vendedor creado");
      res.status(200).json(seller);
    } else {
      res.status(200).json("The seller exist previusly");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//--------------------PUT  UN SELLER--------------------
router.put("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { store_name, adress, phone_number,ban } = req.body;
    const editdUser = await Seller.update(
      {
        store_name: store_name,
        address: adress,
        phone_number: phone_number,
        isBanned: ban,
      },
      { where: { email: email } }
    );
    res.json(editdUser);
  } catch (err) {
    res.status(500).send({
      message: "Seller not found",
    });
  }
});

//--------------------DELETE UN SELLER--------------------

router.delete("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const deleteuser = await Seller.findOne({ where: { email: email } });
    await deleteuser.destroy();
    res.status(200).send({ message: "The seller was deleted successfully" });
  } catch (err) {
    res.status(500).send({
      message: "The seller can´t be deleted",
    });
  }
});

module.exports = router;
