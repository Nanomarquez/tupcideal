const { Router } = require('express');
const router = Router();
const { Op } = require("sequelize");
/* const { PRODUCTS } = require('../db.js'); */
const bulkProducts = require('../data/products.json')

router.get('/', (req, res) => {
    const {category, brand} = req.query;
    let response = bulkProducts;

    if (category)  response = response.filter( p => p.categories.includes(category))
    if (brand) response = response.filter( p => p.brand === brand)
    res.send(response);

});

router.get('/:search', (req, res) => {
    const {search} = req.params;
    let filteredByName = [];

    if(search) {
    filteredByName =  bulkProducts.filter( p => p.name.toUpperCase().includes(search.toUpperCase()))
    };
    res.send(filteredByName)
});

module.exports = router;