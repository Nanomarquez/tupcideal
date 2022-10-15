const { Router } = require('express');
const router = Router();
const { Op } = require("sequelize");
/* const { PRODUCTS } = require('../db.js'); */
const bulkProducts = require('../data/products.json')

router.get('/', (req, res) => {
    /* const {categories} = req.query; */

    res.send(bulkProducts)

});
module.exports = router;