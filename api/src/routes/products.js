const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");
const { Product } = require("../db.js");




//--------------------GET GENERAL --------------------

router.get("/", async (req, res) => {
  const { brand, category } = req.query;
  try {
    let product;
    if (brand) {
      product = await Product.findAll({
        where: {
          name: {[Op.iLike] : `${brand}%`}
        }
      });
    } else {
      product = await Product.findAll();
    }
    category ? res.send(product.filter(p => p.categories == category)) : res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
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
router.post("/:id", async (req, res) => {

  const {id} = req.params ;

  try {
    const {categories,name,price_usd,rating,rating_count,image} = req.body;


    const [product, created]  = await Product.findOrCreate({
      categories: categories,
      name: name,
      price_usd: price_usd,
      rating: rating,
      rating_count: rating_count,
      image: image,
    });
    if (created) {
      console.log("Producto CREADO");
      res.status(200).json(product);
    } else {
      res.status(200).json("El Producto ya existe.");
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});






//--------------------PUT  UN PRODUCTO --------------------
router.put("/:id", async (req, res) => {

  const {id} = req.params ;

  try {
    const {categories,name,price_usd,rating,rating_count,image} = req.body;


    const editedProduct = await Product.update({
      categories: categories,
      name: name,
      price_usd: price_usd,
      rating: rating,
      rating_count: rating_count,
      image: image,
    },
    {where: {id:id}}
    
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
    const deleteProduct = await Product.findOne({ where: { id: id } });
    await deleteProduct.destroy();
    res
      .status(200)
      .send({ message: "The Product was deleted successfully" });
  } catch (err) {
    res.status(500).send({
      message: "The Product can´t be deleted",
    });
  }
});










module.exports = router;
