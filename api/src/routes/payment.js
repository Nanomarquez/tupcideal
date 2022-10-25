const { Router } = require("express");
const { merchant_orders } = require("mercadopago");
const mercadopago = require("mercadopago");
const { DatabaseError } = require("sequelize");
const router = Router();
const { Purchase, User, Product } = require("../db.js");
const  payProducts = require('../funciones/payProducts')

router.post("/notification", async (req, res) => {

    const {query} = req
   // console.log(query);
    const topic = query.topic || query.type;
   // console.log(topic);

var merchantOrders

  switch (topic){
    case "payment":
        const paymentId = query.id || query["data.id"]
       // console.log(topic, "getting Payment", paymentId);
        const payment = await mercadopago.payment.findById(paymentId);
         merchantOrders = await mercadopago.merchant_orders.findById(payment.body.order.id);
        break;
    case "merchant_order":
        const orderId = query.id;
         merchantOrders = await mercadopago.merchant_orders.findById(orderId);
         break;    

  }
  console.log(merchantOrders.body.payments)
})


router.post("/", payProducts)



module.exports = router;