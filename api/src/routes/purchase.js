const { Router } = require("express");
const router = Router();
const { Purchase, User, Product } = require("../db.js");

// Una ruta que traiga toda la info de una compra
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const purchase = await Purchase.findByPk(id,{
            include: [User, WareHouse]
        });
        res.send(purchase);
    } catch(err) {
        res.status(500).send({error: err.message});
    };
    
});

// Una ruta para agregar una nueva compra a la tabla
router.post('/', async (req, res) => {
    const { totalprice, status, UserId } = req.query;
    const { products } = req.body;
    
    try {
        const newPurchase = Purchase.Create({
            totalprice: totalprice,
            status: status,
            UserId: UserId
        });
        res.send(newPurchase);
    } catch (err) {
        res.status(500).send({error: err})
    };
});

module.exports = router;