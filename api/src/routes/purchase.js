const { Router } = require("express");
const router = Router();
const { Purchase, User, WareHouse } = require("../db.js");

// Una ruta que traiga toda la info de una compra
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const purchase = await Purchase.findByPk(id,{
            include: [
                { model: User, attributes: {exclude: ["createdAt", "updatedAt"]} },
                { model: WareHouse, attributes: ["id"]}
            ],
        });
        res.send(purchase);
    } catch(err) {
        res.status(500).send({error: err.message});
    };
    
});

// Una ruta para agregar una nueva compra a la tabla
router.post('/', async (req, res) => {
    const { totalprice, status, UserId } = req.query;
    const { products } = req.body; // Array de id de warehouse
    try {
        const newPurchase = await Purchase.Create({
            totalprice: totalprice,
            status: status,
            UserId: UserId
        });
        products && products.forEach(p => newPurchase.addWareHouses(p));
        res.send(newPurchase);
    } catch (err) {
        res.status(500).send({error: err.message})
    };
});

module.exports = router;