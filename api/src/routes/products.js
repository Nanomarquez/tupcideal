const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");
const { Product } = require("../db.js");

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

module.exports = router;
