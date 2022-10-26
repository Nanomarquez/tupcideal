const { Router } = require("express");
const { merchant_orders } = require("mercadopago");
const mercadopago = require("mercadopago");
const { DatabaseError } = require("sequelize");
const router = Router();
const { Purchase, WareHouse } = require("../db.js");
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

      if(merchantOrder.body.status === 'closed' && purchase.status === 'Pending') {
        if(merchantOrder.body.order_status === 'paid') {
          
          purchase ? purchase.status = 'Paid' : console.log("se borró");
          purchase ? purchase.mp_payment_id = paymentId : console.log("se borró");
          purchase ? await purchase.save() : console.log("se borró");
          
          const itemsId = merchantOrder.body.items.map(i => i.id);          

          itemsId.map(async id => {
            const product = await WareHouse.findByPk(id);
            product.cantidad = product.cantidad - itemsId.filter(i => i === id).length;
            await product.save();
          });

          res.status(200)

        } else if (merchantOrder.body.canceled) {
          purchase ? purchase.status = 'Canceled' : console.log("se borró");
          purchase ? await purchase.save() : console.log("se borró");
          res.status(200)
        }
      }

      break;
      
    case "merchant_order":
      const orderId = query.id;
      merchantOrder = await mercadopago.merchant_orders.findById(orderId);
      //console.log(merchantOrder.body.items)
      await Purchase.findOrCreate({
        where: {
          mp_merchantOrder_id: [merchantOrder.body.id],
          totalprice: [merchantOrder.body.total_amount],
        }
      });
      //console.log(merchantOrder)
      res.status(200);
      break;
    }
  })


router.post("/", payProducts)



module.exports = router;