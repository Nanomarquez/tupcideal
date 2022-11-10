const { Router} = require("express");
const { Model } = require("sequelize");
const router = Router();
const { Purchase, User, Seller, WareHouse } = require("../db.js");
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
        const userPurchases = await Purchase.findAll({
            where: {
                UserId: [id],
            },
            include: {
                model: WareHouse,
                attributes: ['id']
        }
        });
        res.send(userPurchases);
    } catch (err) {
        res.send({error: err.message})
    };
});

router.get('/seller/:sellerId', async (req,res) => {
    const sellerId = req.params.sellerId;
    const purchases = await Purchase.findAll({
        include: [{
            model: Seller, 
            where: {id: [sellerId]},
            attributes: []
           },
           {
            model: WareHouse,
            where: {SellerId: [sellerId]},
            attributes: ['id']
           }
        ],
        attributes: {exclude: ['totalprice', 'UserId', 'mp_payment_id']}
    });
    
    const response = []
    purchases.forEach( async purchase => {
        let sum = 0;
        const merchantOrder = await mercadopago.merchant_orders.findById(purchase.mp_merchantOrder_id);
        const items = purchase.WareHouses.map(w => merchantOrder.body.items.find(i => i.id == w.id));
        items.forEach((i) => sum = sum+(i.unit_price*i.quantity));
        response.push({
            purchase: {
                id: purchase.id,
                status: purchase.status,
                createdAt: purchase.createdAt,
                updatedAt: purchase.updatedAt,
                amount: sum
            },
            items: items
        });
    });
    
    setTimeout(()=>{
        res.send(response)
    }, 3000)
})


module.exports = router;