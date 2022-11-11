const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");
const { Product, WareHouse } = require("../db.js");

//--------------------GET GENERAL --------------------

router.get("/", async (req, res) => {
  const { category } = req.query;
  console.log(category);
  try {
    let product = await Product.findAll({ where: { categories: category } });
    // category ? res.send(product.filter(p => p.categories == category)) : res.status(200).json(product);
    // console.log(product);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

//--------------------GET POR ID  --------------------

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let productId = await Product.findByPk(id);
    res.status(200).json(productId);
  } catch (err) {
    res.status(500).json(err);
  }
});

//--------------------POST DE  UN PRODUCTO --------------------
router.post("/", async (req, res) => {
  console.log(req.body);

  try {
    const { categories, name, image } =
      req.body;

    const [product, created] = await Product.findOrCreate({
      where: {
        categories: categories,
        name: name,
        image: image,
      },
    });
    if (created) {
      res
        .status(200)
        .send({ resp: 1, message: "The Product was created successfully " });
    } else {
      res.status(200).send({ resp: 0, message: "The Product can´t created " });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

//--------------------PUT  UN PRODUCTO --------------------
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { categories, name, price_usd, rating, rating_count, image } =
      req.body;

    const editedProduct = await Product.update(
      {
        categories: categories,
        name: name,
        price_usd: price_usd,
        rating: rating,
        rating_count: rating_count,
        image: image,
      },
      { where: { id: id } }
    );
    res.json(editedProduct);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

//--------------------DELETE UN PRODUCT--------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await Product.findOne({
      where: { id: [id] },
      include: [{ model: WareHouse, attributes: ["precio", "cantidad"] }],
    });
    // console.log(deleteProduct.WareHouses.length);
    if (deleteProduct.WareHouses.length === 0) {
      await deleteProduct.destroy();
      res
        .status(200)
        .send({ resp: 1, message: "El Componente fue elimidado exitosamente" });
    } else {
      res.send({
        resp: 0,
        message:
          "Este componente ya tiene vendedores y Stock disponible, no se puede eliminar ",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "El componente no puede ser eliminado",
    });
  }
});

module.exports = router;
