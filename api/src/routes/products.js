const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");
const { Product } = require("../db.js");
const { Case } = require("../db.js");
const { CPU } = require("../db.js");
const bulkProducts = require("../data/products.json");

router.get("/", async (req, res) => {
  try {
    let product;
    product = await Product.findAll({
      include: [
        {
          model: Case,
          as: "case",
          attributes: ["name", "image"],
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
// =======
// router.get('/', (req, res) => {
//     const {category, brand} = req.query;
//     let response = bulkProducts;
//     if (category)  response = response.filter( p => p.categories.includes(category))
//     if (brand) response = response.filter( p => p.brand === brand)
//     res.send(response);

// });

// router.get('/:search', (req, res) => {
//     const {search} = req.params;

//     let filteredByName = [];

//     if(search) {
//     filteredByName =  bulkProducts.find( p => p.id == search)
//     };
//     res.send(filteredByName)
// });

// module.exports = router;
// >>>>>>> Developer
