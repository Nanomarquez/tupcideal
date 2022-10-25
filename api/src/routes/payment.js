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
  const topic = query.topic;
   // console.log(topic);

  var merchantOrder

  switch (topic){
    case "payment":
      const paymentId = query.id;
      //console.log(topic, "getting Payment", paymentId);
      const payment = await mercadopago.payment.findById(paymentId);
      merchantOrder = await mercadopago.merchant_orders.findById(payment.body.order.id);
      //console.log("merchantOrderId", merchantOrder.body.id, "paymentId", paymentId)
      const purchase = await Purchase.findOne({
        where: {
          mp_merchantOrder_id: [merchantOrder.body.id]
        }
      })

      if(merchantOrder.body.status === 'closed') {
        if(merchantOrder.body.order_status === 'paid') {
          purchase ? purchase.status = 'Paid' : console.log("se borró");
          purchase ? purchase.mp_payment_id = paymentId : console.log("se borró");
          purchase ? await purchase.save() : console.log("se borró");
        } else if (merchantOrder.body.canceled) {
          purchase ? purchase.status = 'Canceled' : console.log("se borró");
          purchase ? await purchase.save() : console.log("se borró");
        }
      }
      console.log(merchantOrder)
      //await purchase.save()
      break;
    case "merchant_order":
      const orderId = query.id;
      merchantOrder = await mercadopago.merchant_orders.findById(orderId);
      await Purchase.findOrCreate({
        where: {
          mp_merchantOrder_id: [merchantOrder.body.id],
          totalprice: [merchantOrder.body.total_amount],
        }
      });
      //console.log(merchantOrder)
      break;
    }
  })


router.post("/", payProducts)



module.exports = router;