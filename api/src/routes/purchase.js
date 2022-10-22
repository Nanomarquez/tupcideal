const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");
const { Purchase, User, Product } = require("../db.js");

// Una ruta que traiga toda la info de una compra
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const purchase = await Purchase.findByPk(id,{
            include: [User, Product]
        });
        res.send(purchase);
    } catch(err) {
        res.status(500).send({error: err.message});
    };
    
});

module.exports = router;