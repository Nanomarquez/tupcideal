const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");
const { Product } = require("../db.js");
const { Case } = require("../db.js");
const { CPU } = require("../db.js");
const bulkProducts = require("../data/products.json");

// router.get("/", (req, res) => {
//   /* const {categories} = req.query; */

//   res.send(bulkProducts);
// });

router.get("/", async (req, res) => {
  try {
    let product;
    product = await Product.findAll({
      include: [{
        model: Case,
        as: "case",
        attributes: ["name","image"],
      },
    ],
    });
    console.log(product);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
