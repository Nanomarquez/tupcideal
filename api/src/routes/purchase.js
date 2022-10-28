const { Router, response } = require("express");
const { Model } = require("sequelize");
const router = Router();
const { Purchase, User, WareHouse } = require("../db.js");
const mercadopago = require("mercadopago");

// Una ruta que traiga toda la info de una compra
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    
    try {
        const purchase = await Purchase.findByPk(id,{
            include: [
                { model: User, attributes: {exclude: ["createdAt", "updatedAt"]} }
            ],
        });

        const {body: mpData} = await mercadopago.merchant_orders.findById(purchase.mp_merchantOrder_id);

        res.send({
            purchase,
            mpData
        });

    } catch(err) {
        res.status(500).send({error: err.message});
    };
    
});

// Una ruta para ver todas las compras de un usuario
router.get('/user/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const userPurchases = Purchase.finAll({
            where: {
                UserId: [id]
            }
        });
        res.send(userPurchases);
    } catch (err) {
        res.send({error: err.message})
    };
});

module.exports = router;