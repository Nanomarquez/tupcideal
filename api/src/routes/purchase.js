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
    const { totalprice, UserId } = req.query;
    const { cart } = req.body.data; 
    try {
        const newPurchase = await Purchase.Create({
            totalprice: totalprice,
            UserId: UserId
        });
        cart && cart.forEach(async p => await newPurchase.addWareHouses(p.id));
        res.send(newPurchase);
    } catch (err) {
        res.status(500).send({error: err.message})
    };
});

// Una ruta para modificar la compra (modificar el estado "pending" --> "pagado / cancelado")
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {status} = req.query
    try {
        const purchase = await Purchase.findByPk(id);
        purchase.status = status;
        await purchase.save();
        res.send(purchase);
    } catch (err) {
        res.status(500).send({error: err.message})
    }
});

module.exports = router;