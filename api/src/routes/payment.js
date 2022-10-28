const { Router } = require("express");
const { merchant_orders } = require("mercadopago");
const mercadopago = require("mercadopago");
const { DatabaseError, UUID } = require("sequelize");
const router = Router();
const { Purchase, WareHouse, User } = require("../db.js");
const  payProducts = require('../funciones/payProducts')

router.post("/notification", async (req, res) => {

  const {query} = req
   // console.log(query);
  const topic = query.topic;
   // console.log(topic);

  var merchantOrder;
  var purchase;

  switch (topic){

    case "payment":
      const paymentId = query.id;
      const payment = await mercadopago.payment.findById(paymentId);

      merchantOrder = await mercadopago.merchant_orders.findById(payment.body.order.id);

      purchase = await Purchase.findOne({
        where: {
          mp_merchantOrder_id: [merchantOrder.body.id]
        }
      });

      if(purchase.status === 'Pending') {
        if(merchantOrder.body.payments[0].status === 'approved') {
          
          purchase.status = 'Paid';
          purchase.mp_payment_id = paymentId;
          await purchase.save();
          
          const itemsId = merchantOrder.body.items.map(i => i.id);          

          itemsId.map(async id => {
            const product = await WareHouse.findByPk(id);
            product.cantidad = product.cantidad - itemsId.filter(i => i === id).length;
            await product.save();
          });

          res.status(200).send(merchantOrder);

        } else if (merchantOrder.body.payments[0].status === 'cancelled') {
          purchase.status = 'Canceled';
          purchase.mp_payment_id = paymentId;
          await purchase.save();
          res.status(200).send(merchantOrder);
        }
      }

      break;
      
    case "merchant_order":
      const orderId = query.id;
      merchantOrder = await mercadopago.merchant_orders.findById(orderId);

      purchase = await Purchase.findOrCreate({
        where: {
          mp_merchantOrder_id: [merchantOrder.body.id],
          totalprice: [merchantOrder.body.total_amount]
        }
      });

      purchase = await Purchase.findOne({
        where: {
          mp_merchantOrder_id: [merchantOrder.body.id]
        }
      })

      await purchase.setUser(merchantOrder.body.additional_info);

      res.status(200).send(merchantOrder);
      break;
    }
  })


router.post("/", payProducts)



module.exports = router;