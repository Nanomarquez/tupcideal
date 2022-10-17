const { Router } = require("express");
const router = Router();
const { Admin } = require("../db.js");

//------- PEDIR TODOS LOS ADMINS A LA BD--------
router.get("/", async (req, res) => {
  try {
    let respuestabd;
    respuestabd = await Admin.findAll();

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

//------- PEDIR POR EMAIL UN ADMIN A LA BD--------
router.get("/:email", async (req, res) => {
  const { email } = req.params;
  //   console.log("este es el email" + email);
  try {
    let respuestabd;
    respuestabd = await Admin.findOne({ where: { email: email } });
    // console.log("lo que traigo es:" + respuestabd);
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

//--------------------POST UN ADMIN--------------------
router.post("/", async (req, res) => {
  const {
    name,
    last_name,
    initial_date,
    password,
    email,
    phone_number,
    admin,
  } = req.body;
  try {
    const [admin, created] = await Admin.findOrCreate({
      where: {
        name: name,
        last_name: last_name,
        initial_date: initial_date,
        password: password,
        email: email,
        phone_number: phone_number,
      },
    });
    if (created) {
      console.log("Admin Created");
      res.status(200).json(admin);
    } else {
      res.status(200).json("The admin exist");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//--------------------PUT UN ADMIN--------------------
router.put("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { name, last_name, initial_date, password, phone_number, admin } =
      req.body;
    // console.log("/n"+email);
    // console.log(store_name);
    // console.log(adress);
    // console.log(phone_number);
    const editdAdmin = await Admin.update(
      {
        name: name,
        last_name: last_name,
        initial_date: initial_date,
        password: password,
        phone_number: phone_number,
        admin: admin,
      },
      { where: { email: email } }
    );
    res.json(editdAdmin);
  } catch (err) {
    res.status(500).send({
      message: "Admin not found",
    });
  }
});

//--------------------DELETE UN ADMIN--------------------

router.delete("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    // console.log("este es el correo" + email);
    const deleteAdmin = await Admin.findOne({ where: { email: email } });
    // console.log(deleteuser);
    await deleteAdmin.destroy();
    res.status(200).send({ message: "The admin was deleted successfully" });
  } catch (err) {
    res.status(500).send({
      message: "The admin can´t be deleted",
    });
  }
});

module.exports = router;
